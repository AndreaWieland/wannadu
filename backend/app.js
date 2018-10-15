const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ideasRoutes = require("./routes/ideas");
const tagsRoutes = require("./routes/tags");
const userRoutes = require("./routes/user");

//establishing our express app
const app = express();

//establish a connection with the mongo cloud atlas cluster. wannadu is my db name
mongoose.connect('mongodb+srv://andrea:mark1987@cluster0-lonu7.mongodb.net/wannadu').then(() => {
	console.log('Connected bayBEE!');
}).catch(() => {
	console.log('Connection failed');
});

//idk, sets up the body parser, no clue what this is
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//middleware establishing CORS for http requests
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	next();
});

app.use("/api/ideas", ideasRoutes);
app.use("/api/tags", tagsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;


















