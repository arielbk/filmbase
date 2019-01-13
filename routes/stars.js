const express = require('express');
const passport = require('passport');
const validateAddFilm = require('../utils/validators').addFilm;

// User model
const User = require('../models/User');

const router = express.Router();

/**
 * @route   GET api/stars
 * @desc    Gets the user's starred films
 * @access  Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user._id)
		.then(user => res.json(user.starred))
		.catch(err => res.status(400).json(err));
});

/**
 * @route   PATCH api/stars/add/:id
 * @desc    Adds to the user's starred list
 * @access  Private
 */
router.patch('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
	// TODO: add an appropriate validator
	// const { errors, isValid } = validateAddFilm(req.body);
	// validate request params
	// if (!isValid) return res.status(400).json(errors);

	User.updateOne(
		// Add film to top of starred array, only if it is unique
		{ $and: [{ _id: req.user._id }, { starred: { $ne: req.body } }] },
		{ $push: { starred: { $each: [req.body], $position: 0 } } }
	)
		.then(() => res.json(req.body))
		.catch(err => res.status(400).json(err));
});

/**
 * @route   DELETE api/stars/:id
 * @desc    Creates habit
 * @access  Private
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user._id)
		.then(user => {
			const id = parseInt(req.params.id, 10);
			let filmFound = false;
			user.starred.forEach(film => {
				if (film.id === id) filmFound = true;
			});
			if (filmFound !== true)
				return res.status(404).json({ message: 'That film id was not found in the list' });
			// eslint-disable-next-line no-param-reassign
			user.starred = user.starred.filter(film => film.id !== id);
			return user.save().then(() => res.json(id));
		})
		.catch(err => res.status(400).json(err));
});

// export router for use by server
module.exports = router;
