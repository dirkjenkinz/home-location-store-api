const express = require('express');
const router = express.Router();

const { getAllLocations } = require('../handlers/get-all-handler');

router.get('/', getAllLocations);
module.exports = router;
