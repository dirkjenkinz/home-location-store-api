const express = require('express');
const router = express.Router();

const { getChange, postChange } = require('../handlers/change-handler');

router.get('/', getChange);
router.post('/', postChange);
module.exports = router;
