const express = require('express');
const router = express.Router();

const { getChoice } = require('../handlers/choice-handler');

router.get('/', getChoice);
module.exports = router;
