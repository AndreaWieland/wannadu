const express = require("express");

//my tags schema
const Tag = require('../models/tag');
const checkAuth = require("../middleware/check-auth");


const router = express.Router();

//posting a new tag
router.post('', checkAuth, (req, res, next) => {
		const tag = new Tag({
			tagname: req.body.tagname,
			count: req.body.count,
			author: req.body.author
		})
		tag.save();
		res.status(201).json({message: 'Add tag successful'});
}); 

//replacing an edited tag
router.put('/:id', checkAuth, (req, res, next) => {
	const tag = new Tag({
		_id: req.body.id,
		tagname: req.body.tagname,
		count: req.body.count,
		author: req.body.author
	})
	Tag.updateOne({ _id: req.params.id }, tag)
  	.then(result => {
    res.status(200).json({ message: "Update tag successful" });
  });
}); 

//retrieving one tag
router.get("/:id", (req, res, next) => {
  Tag.findById(req.params.id).then(resp => {
    if (resp) {
      res.status(200).json(resp);
    } else {
      res.status(404).json({ message: "Tag not found!" });
    }
  });
});

//retrieving all tags
router.get('', (req, res, next) => {
	const userId = req.query.findUser;
	Tag.find({ author: userId }).then(documents => {
		res.status(200).json({
			message: 'GET tags successful',
			tags: documents
		});	
	});
}); 

router.delete('/:id', checkAuth, (req, res, next) => {
  Tag.deleteOne({ _id: req.params.id })
  	.then(result => {
    res.status(200).json({ message: "Tag deleted!" });
  });
});

module.exports = router;




