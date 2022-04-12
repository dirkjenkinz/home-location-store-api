const express = require('express');
const { getChoice } = require('../handlers/choice-handler');

const router = express.Router();
router.get('/', getChoice);
module.exports = router;
