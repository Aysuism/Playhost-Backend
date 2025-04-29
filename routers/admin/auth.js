const express = require('express');
const { user_auth } = require('../../controllers/user');

const router = express.Router();

router.post('/', user_auth);

module.exports = router;