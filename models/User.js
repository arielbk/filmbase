const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create user schema
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	dateJoined: {
		type: Date,
		default: Date.now,
	},
	// Starred films associated with the user
	starred: {
		type: [String],
	},
});

// Export user model with user schema
module.exports = mongoose.model('User', userSchema);
