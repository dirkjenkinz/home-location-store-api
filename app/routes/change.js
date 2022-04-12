const express = require('express');
const { getChange, postChange } = require('../handlers/change-handler');

const router = express.Router();
router.get('/', getChange);
router.post('/', postChange);
module.exports = router;
