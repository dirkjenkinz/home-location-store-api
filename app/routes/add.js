const express = require('express');
const router = express.Router();
const { postAdd } = require('../handlers/add-handler');
router.post('/', postAdd);
module.exports = router;
