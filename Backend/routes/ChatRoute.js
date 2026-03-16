const express = require('express');
const router = express.Router();
const ValidateToken = require('../middleware/ValidateToken')
const { getall } = require('../controllers/ChatControl')

router.get('/all',ValidateToken,getall)

module.exports = router