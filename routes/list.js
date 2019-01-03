const express = require('express');
const passport = require('passport');
const validateAddFilm = require('../utils/validators').addFilm;

// User model
const User = require('../models/User');

const router = express.Router();

/**
 * @route   GET api/list/
 * @desc    Gets the favourites list
 * @access  Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user._id)
		.then(user => res.json(user.favFilms))
		.catch(err => res.status(400).json(err));
});

/**
 * @route   PATCH api/list/:id
 * @desc    Adds to the favourites list
 * @access  Private
 */
router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateAddFilm(req.params.id);
	// validate request params
	if (!isValid) return res.status(400).json(errors);

	User.findByIdAndUpdate(
		req.user._id,
		// Add film to top of favourite list array
		{ $push: { favFilms: { $each: [req.params.id], $position: 0 } } },
		{ new: true }
	)
		.then(user => res.json(user))
		.catch(err => res.status(400).json(err));
});

/**
 * @route   DELETE api/list/:id
 * @desc    Creates habit
 * @access  Private
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	// TODO: Filter the users favourite movies list to remove the specified id
	// I know this could be done with just mongo aggregation methods... :/ something like?
	// User.findByIdAndUpdate(
	// 	req.user._id,
	// 	{
	// 		$set: {
	// 			favFilms: {
	// 				$filter: { input: '$favFilms', as: 'film', cond: { $not: req.params.id } },
	// 			},
	// 		},
	// 	},
	// 	{ new: true }
	// )
	User.findById(req.user._id)
		.then(user => {
			if (!user.favFilms.includes(req.params.id))
				return res.status(404).json({ message: 'That film id was not found in the list ' });
			user.favFilms = user.favFilms.filter(film => film !== req.params.id);
			return user.save().then(updated => res.json(updated));
		})
		.catch(err => res.status(400).json(err));
});

// export router for use by server
module.exports = router;
