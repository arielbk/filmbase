const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const validateRegisterInput = require('../utils/validators').register;
const validateLoginInput = require('../utils/validators').login;

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

/**
 * @route   POST api/auth/login
 * @desc    Logs user in
 * @access  Public
 */
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) return res.status(400).json(errors);

	const { email, password } = req.body;
	return User.findOne({ email })
		.then(user =>
			bcrypt.compare(password, user.password).then(result => {
				if (!result) return res.status(400).json({ password: 'Incorrect password' });

				// Create JWT payload
				const payload = {
					id: user.id,
					email: user.email,
					name: user.name,
					avatar: user.avatar,
				};

				// Sign JWT token
				return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
					if (err) throw err;
					res.json({
						success: true,
						token: `Bearer ${token}`,
					});
				});
			})
		)
		.catch(() => res.status(404).json({ user: 'User not found ' }));
});

// Export router for use in server
module.exports = router;
