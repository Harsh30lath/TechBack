const express = require('express');
const router = express.Router();
const { login, register, current, logout,getAllUsers} = require('../controllers/RegisterControl')
const validateToken = require('../middleware/ValidateToken');

router.post('/login',login);
router.post('/register',register);
router.get('/current',validateToken,current);
router.post('/logout',validateToken,logout);
router.get('/all', validateToken, getAllUsers);
module.exports = router;
