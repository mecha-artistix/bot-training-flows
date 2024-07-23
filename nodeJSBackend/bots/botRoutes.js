const express = require('express');
const authController = require('../users/authController');
const botController = require('./botController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, botController.getAllBots)
  .post(authController.protect, botController.createBot);

router
  .route('/:id')
  .get(authController.protect, botController.getBot)
  .patch(authController.protect, botController.updateBotModal)
  .delete(authController.protect, botController.deleteBot, botController.clearUser);

router.route('/generate-bot').post(authController.protect, botController.generateBot);
module.exports = router;
