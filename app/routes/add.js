const express = require('express');
const { postAdd } = require('../handlers/add-handler');

const router = express.Router();
router.post('/', postAdd);
module.exports = router;
