const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var userSchema = new Schema({
	email: String,
	password: String,
	role: String
}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});

userSchema.pre('save', function(next) {
	var user = this;

	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				return next(err);
			}

			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					return next(err);
				}

				user.password = hash;
				next();
			});
		});
	}
	else {
		next();
	}
});

userSchema.methods.comparePassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) {
			return cb(err);
		}

		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);
