const express = require('express');
const router = express.Router();


router.use('/api',
	require('./users'),
	require('./articles')
);

module.exports = router;
