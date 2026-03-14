const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/ValidateToken')
const { Teamcreate,getTeam,editTeam,deleteTeam,allTeam } = require('../controllers/TeamControl')
const { addMembers, getMembers, removeMembers,getChatHistory} = require('../controllers/MemberControl')


router.get('/',validateToken,allTeam)
router.post('/',validateToken,Teamcreate)
router.get('/:id',validateToken,getTeam)
router.put('/:id',validateToken,editTeam)
router.delete('/:id',validateToken,deleteTeam)


router.get('/:teamId/messages', validateToken, getChatHistory);
router.post('/:teamId/members', validateToken, addMembers);
router.get('/:teamId/members', validateToken, getMembers);
router.delete('/:teamId/members/:userId', validateToken, removeMembers);

module.exports = router