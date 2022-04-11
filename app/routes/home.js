const express = require('express');
const router = express.Router();

const { postHome } = require('../handlers/home-handler');

router.post('/', postHome);

module.exports = router;
