const express = require('express');
const usersAuthControllers = require('./usersAuthController');

const router = express.Router();

router.route('/login').post(usersAuthControllers.authUser);
router.route('/register').post(usersAuthControllers.createUser);

router.route('/delete/:id').delete(usersAuthControllers.deleteProfile, usersAuthControllers.deleteUser);

module.exports = router;
