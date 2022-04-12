const express = require('express');
const { postHome } = require('../handlers/home-handler');

const router = express.Router();

router.post('/', postHome);
module.exports = router;
