const express = require('express')
const router = express.Router()
const ValidateToken = require('../middleware/ValidateToken')
const {todoCreate,tododelete,todoupdate,todoread,todoreadAll} = require('../controllers/TodoControl')

router.post('/',ValidateToken,todoCreate)
router.delete('/:id',ValidateToken,tododelete)
router.put('/:id',ValidateToken,todoupdate)
router.get('/:id',ValidateToken,todoread)
router.get('/',ValidateToken,todoreadAll)

module.exports = router