const express = require('express');
const router = express.Router();
const { deleteLocation } = require('../handlers/delete-location-handler');
router.get('/', deleteLocation);
module.exports = router;
