const express = require('express');
const router = express.Router();

const { getLocation } = require('../handlers/get-location-handler');

router.get('/', getLocation);
module.exports = router;
