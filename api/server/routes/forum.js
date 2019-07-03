const express = require('express');
const router = express.Router();

const { getAllForums, createForum, archiveForum, deleteForum } = require('../controller').Forum;
const { verifyAuthentication, verifyAccessLevelPerms, accessLevelPerms } = require('../auth');
const { ADMIN } = accessLevelPerms;

router.get('/', getAllForums);

router.post('/', verifyAuthentication, verifyAccessLevelPerms(ADMIN.name), createForum);
router.patch('/', verifyAuthentication, verifyAccessLevelPerms(ADMIN.name),archiveForum);
router.delete('/', verifyAuthentication, verifyAccessLevelPerms(ADMIN.name), deleteForum);

module.exports = router;