const express = require("express");

//my ideas schema
const Idea = require('../models/idea');
const checkAuth = require("../middleware/check-auth");


const router = express.Router();

//posting a new idea
router.post('', checkAuth, (req, res, next) => {
		const idea = new Idea({
			description: req.body.description,
			location: req.body.location,
			website: req.body.website,
			author: req.body.author,
			tags: req.body.tags
		})
		idea.save();
		res.status(201).json({message: 'Add successful'});
}); 

//replacing an edited idea
router.put('/:id', checkAuth, (req, res, next) => {
	const idea = new Idea({
		_id: req.body.id,
		description: req.body.description,
		location: req.body.location,
		website: req.body.website
	})
	Idea.updateOne({ _id: req.params.id }, idea)
  	.then(result => {
    res.status(200).json({ message: "Update Successful" });
  });
}); 

//retrieving one idea
router.get("/:id", (req, res, next) => {
  Idea.findById(req.params.id).then(resp => {
    if (resp) {
      res.status(200).json(resp);
    } else {
      res.status(404).json({ message: "Idea not found!" });
    }
  });
});

//retrieving all ideas
router.get('', (req, res, next) => {
	const userId = req.query.findUser;
	Idea.find({ author: userId }).then(documents => {
		res.status(200).json({
			message: 'GET successful',
			ideas: documents
		});	
	});
}); 

router.delete('/:id', checkAuth, (req, res, next) => {
  Idea.deleteOne({ _id: req.params.id })
  	.then(result => {
    res.status(200).json({ message: "Idea deleted!" });
  });
});

module.exports = router;

