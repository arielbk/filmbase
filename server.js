const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env.local' });

// Use native promises
mongoose.Promise = global.Promise;

// Connect Mongoose
const DB_URI = process.env.MONGO_URI;
mongoose
	.connect(
		DB_URI,
		{ useNewUrlParser: true }
	)
	.then(() => console.info('Connected to MongoDB'))
	.catch(err => console.error('Connection to MongoDB failed: ', err));

// Create Express app
const app = express();

// Connect body parser to app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes will go here

app.get('/', (req, res) => {
	res.send('Express server is working!');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});

module.exports = { app };
