const express = require('express');
const userProfileController = require('./userProfileController');

const router = express.Router();

router.route('/').post(userProfileController.createUserProfile);
router.route('/all-users').get(userProfileController.getAllUsers);

module.exports = router;
