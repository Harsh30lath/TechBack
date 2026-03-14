const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const { create, update, delCalendar,getAll } = require('../controllers/CalendarContol')
const ValidateToken = require('../middleware/ValidateToken')


router.get('/', ValidateToken, getAll)
router.post('/',ValidateToken,create)
router.put('/:id',ValidateToken,update)
router.delete('/:id',ValidateToken,delCalendar)


module.exports = router;