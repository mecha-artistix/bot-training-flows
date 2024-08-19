const express = require('express');
const userController = require('./userController');
const authController = require('./authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verify', authController.verify);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);
router.post('/logout', authController.logout);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.uploadUserPhoto, userController.updateMe);

router.route('/').get(authController.restrictTo('admin'), userController.getAllUsers);
// .post(userController.createUser);
// router.route('/:id').get(userController.getUser).patch(userController.updateUser);

module.exports = router;
