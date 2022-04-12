const express = require('express');
const { getAllLocations } = require('../handlers/get-all-handler');

const router = express.Router();
router.get('/', getAllLocations);
module.exports = router;
