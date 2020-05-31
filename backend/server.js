const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
require('dotenv').config({ path: '.env.local' });
const path = require('path');

const authRoutes = require('./routes/auth');
const heartRoutes = require('./routes/hearts');

// Use native promises
mongoose.Promise = global.Promise;

// Connect Mongoose
const DB_URI = process.env.MONGO_URI;
mongoose
	.connect(DB_URI, { useNewUrlParser: true })
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
app.use('/api/hearts', heartRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});

process.on('uncaughtException', () => server.close());

module.exports = { app };
