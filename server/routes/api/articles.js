const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../../config').secret;

router.use(function(req, res, next) {

	// do authentication here!
	var token = req.headers['x-access-token'];

	if (!token) {
		var err = new Error('Unauthorized!');
		err.status = 401;
		next(err);
	}

	jwt.verify(token, secret, function(err, decoded) {
		if (err) {
			err.status = 401;
			return next(err);
		}

		req.decoded = decoded;
		next();
	});
});

router.route('/articles')
	.get(function(req, res, next) {

		res.status(200);
		res.json(req.decoded);
	})
	.post(function() {

	})
	.patch(function() {

	})
	.delete(function() {

	});


module.exports = router;
