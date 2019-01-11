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
router.patch('/add/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateAddFilm(req.params.id);
	// validate request params
	if (!isValid) return res.status(400).json(errors);

	return User.updateOne(
		// Add film to top of starred array, only if it is unique
		{ $and: [{ _id: req.user._id }, { starred: { $ne: req.params.id } }] },
		{ $push: { starred: { $each: [req.params.id], $position: 0 } } }
	)
		.then(() => res.json(req.params.id))
		.catch(err => res.status(400).json(err));
});

/**
 * @route   DELETE api/stars/:id
 * @desc    Creates habit
 * @access  Private
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	// Surely this could have been done with just an aggregation pipeline -- something like...
	// User.findByIdAndUpdate(
	// 	req.user._id,
	// 	{
	// 		$set: {
	// 			starred: {
	// 				$filter: { input: '$starred', as: 'film', cond: { $not: req.params.id } },
	// 			},
	// 		},
	// 	},
	// 	{ new: true }
	// )
	User.findById(req.user._id)
		.then(user => {
			if (!user.starred.includes(req.params.id))
				return res.status(404).json({ message: 'That film id was not found in the list' });
			// eslint-disable-next-line no-param-reassign
			user.starred = user.starred.filter(film => film !== req.params.id);
			return user.save().then(() => res.json(req.params.id));
		})
		.catch(err => res.status(400).json(err));
});

// export router for use by server
module.exports = router;
