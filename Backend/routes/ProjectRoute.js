const express = require('express');
const { addProject, deleteProject , allProject , editProject, getProject} = require('../controllers/ProjectControl');
const router = express.Router();
const ValidateToken = require('../middleware/ValidateToken')


router.get('/',ValidateToken,allProject)
router.post('/',ValidateToken,addProject)
router.delete('/:id',ValidateToken,deleteProject)
router.put('/:id',ValidateToken,editProject)
router.get('/:id',ValidateToken,getProject)

module.exports = router