const express = require('express');
const { landing } = require('../handlers/landing-handler');

const router = express.Router();
router.get('/', landing);
module.exports = router;
