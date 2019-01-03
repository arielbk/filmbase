/* eslint-disable no-param-reassign */
const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports.register = ({ name, email, password, password2 }) => {
	const errors = {};
	name = isEmpty(name) ? '' : name;
	email = isEmpty(email) ? '' : email;
	password = isEmpty(password) ? '' : password;
	password2 = isEmpty(password2) ? '' : password2;

	if (!validator.isLength(name, { min: 2, max: 20 }))
		errors.name = 'Name must be between 2 and 20 characters';
	if (validator.isEmpty(name)) errors.name = 'Name field is required';

	if (!validator.isEmail(email)) errors.email = 'Email is invalid';
	if (validator.isEmpty(email)) errors.email = 'Email field is required';

	if (!validator.isLength(password, { min: 6 }))
		errors.password = 'Password must be at least 6 characters';
	if (validator.isEmpty(password)) errors.password = 'Password field is required';

	if (!validator.equals(password2, password)) errors.password2 = 'Passwords must match';
	if (validator.isEmpty(password2)) errors.password2 = 'Confirm password field is required';

	return { errors, isValid: isEmpty(errors) };
};

module.exports.login = ({ email, password }) => {
	const errors = {};
	email = isEmpty(email) ? '' : email;
	password = isEmpty(password) ? '' : password;

	if (!validator.isEmail(email)) errors.email = 'Email is invalid';
	if (validator.isEmpty(email)) errors.email = 'Email field is required';

	if (validator.isEmpty(password)) errors.password = 'Password field is required';

	return { errors, isValid: isEmpty(errors) };
};

// this is quite superfluous for now, but later on it may prove handy
// (if movie info is stored in the user's list itself)
module.exports.addFilm = id => {
	const errors = {};
	id = isEmpty(id) ? '' : id;

	// TODO: Make TMDB api call to ensure the film exists
	if (validator.isEmpty(id)) errors.id = 'Film ID is required as a parameter';

	return { errors, isValid: isEmpty(errors) };
};
