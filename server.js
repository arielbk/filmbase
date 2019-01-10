const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
require('dotenv').config({ path: '.env.local' });

const authRoutes = require('./routes/auth');
const starRoutes = require('./routes/stars');

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

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Connect body parser to app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// HTTP request logger
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stars', starRoutes);

app.get('/', (req, res) => {
	res.send('Express server is working!');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});

module.exports = { app };
