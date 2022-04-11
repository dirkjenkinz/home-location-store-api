const express = require('express');
const router = express.Router();

const { landing } = require('../handlers/landing-handler');

router.get('/', landing);
module.exports = router;
