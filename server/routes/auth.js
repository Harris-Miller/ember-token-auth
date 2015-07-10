const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = require('../config').secret;

router.route('/auth')
	.get(function(req, res, next) {
		// check if user has an active session
	})
	.post(function(req, res, next) {
		// create a session, eg 'login'

		var email = req.body.email;
		var password = req.body.password;

		var err;

		if (!email) {
			err = new Error('Email required for login!');
			err.status = 401;
			return next(err);
		}

		if (!password) {
			err = new Error('Password required for login!');
			err.status = 401;
			return next(err);
		}

		User.findOne({
			email: email
		}, function(err, user) {
			if (err) {
				return next(err);
			}

			if (!user) {
				err = new Error('Email ' + email + ' has not yet been registered!');
				err.status = 401;
				return next(err);
			}

			// check if password matched
			user.comparePassword(password, function(err, isMatch) {
				if (err) {
					return next(err);
				}

				if (!isMatch) {
					err = new Error('Password is incorrect for ' + email);
					err.status = 401;
					return next(err);
				}

				// if password matches, generate a jwt!
				var token = jwt.sign({user: user.email}, secret, {
					// expiresInMinutes: 1440 // 24 hours
					expiresInSeconds: 60 // for testing
				});

				res.status(200);
				res.json({
					user: user.toJSON(),
					token: token
				});
			});
		});
	})
	.delete(function(req, res, next) {
		// destory a session,eg 'logout'
	});

module.exports = router;
