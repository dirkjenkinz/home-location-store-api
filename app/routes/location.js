const express = require('express');
const { getLocation } = require('../handlers/get-location-handler');

const router = express.Router();
router.get('/', getLocation);
module.exports = router;
