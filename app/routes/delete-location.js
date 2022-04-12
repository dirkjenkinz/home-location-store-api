const express = require('express');
const { deleteLocation } = require('../handlers/delete-location-handler');

const router = express.Router();
router.get('/', deleteLocation);
module.exports = router;
