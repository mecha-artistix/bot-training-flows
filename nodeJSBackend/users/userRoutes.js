const express = require('express');
const userController = require('./userController');
const authController = require('./authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verify', authController.verify);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

router.route('/').get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers);
// .post(userController.createUser);
// router.route('/:id').get(userController.getUser).patch(userController.updateUser);

module.exports = router;
