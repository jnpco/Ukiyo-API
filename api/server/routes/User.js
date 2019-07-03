const express = require('express');
const router = express.Router();

const { getAllUsers, getUser, createUser, deleteUser } = require('../controller').User;
const { verifyAuthentication, verifyAccessLevelPerms, accessLevelPerms } = require('../auth');
const { ADMIN } = accessLevelPerms;

router.get('/', verifyAuthentication, verifyAccessLevelPerms(ADMIN.name), getAllUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.delete('/:userId', deleteUser);

module.exports = router;