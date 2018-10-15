const mongoose = require('mongoose');

const ideaSchema = mongoose.Schema({
	description: { type: String, required: true },
	location: { type: String, required: false },
	website: { type: String, required: false },
	author: { type: String, required: true },
	tags: { type: [String], require: false}
});

module.exports = mongoose.model('Idea', ideaSchema);