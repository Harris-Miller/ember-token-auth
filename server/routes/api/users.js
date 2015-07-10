const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.route('/users')
	.get(function() {

	})
	.post(function(req, res, next) {
		// create a new user
		// performed through 'sign up'

		var newUser = new User({
			email: req.body.email,
			password: req.body.password,
			role: 'user'
		});

		newUser.save(function(err) {
			if (err) {
				next(err);
			}

			res.status(201);
			res.end();
		});
	})
	.delete(function() {

	});

module.exports = router;
