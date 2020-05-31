const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const options = {};

// Accepts a request and returns JWT as a string or null
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// Verify the token signature with secret key
options.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
	passport.use(
		new JwtStrategy(options, (jwtPayload, done) => {
			User.findById(jwtPayload.id)
				.then(user => {
					if (!user) return done(null, false);
					return done(null, user);
				})
				.catch(err => console.log(err));
		})
	);
};
