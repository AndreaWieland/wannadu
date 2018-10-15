const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
	tagname: { type: String, required: true },
	count: { type: Number, default: 0 },
	author: { type: String, required: true }
});

module.exports = mongoose.model('Tag', tagSchema);