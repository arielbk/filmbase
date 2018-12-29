const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const validateRegisterInput = require('../utils/validators').register;

const router = express.Router();

/**
 * @route   POST api/auth/register
 * @desc    Registers user
 * @access  Public
 */
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) return res.status(400).json(errors);

	const { name, email, password } = req.body;
	return User.findOne({
		email,
	})
		.then(user => {
			if (user) {
				// Email already exists
				errors.email = 'An account with that email already exists';
				return res.status(400).json(errors);
			}
			// Otherwise build the user object
			const avatar = gravatar.url(email, {
				s: '200', // size
				r: 'pg', // rating
				d: 'retro', // default
			});
			const newUser = new User({
				name,
				email,
				password,
				avatar,
			});

			// Generate a salt and hash for user password
			return bcrypt.genSalt(10, (error, salt) => {
				if (error) throw error;
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(savedUser => res.json({ success: true, user: savedUser }))
						.catch(e => res.status(400).json(e));
				});
			});
		})
		.catch(err => res.status(400).json(err));
});

// Export router for use in server
module.exports = router;
