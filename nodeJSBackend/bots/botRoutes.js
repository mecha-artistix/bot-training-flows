const express = require('express');
const authController = require('../users/authController');
const botController = require('./botController');

const router = express.Router();

router.route('/').get(botController.getAllBots).post(botController.createBot);

router
  .route('/:id')
  .get(botController.getBot)
  .patch(botController.updateBotModal)
  .delete(botController.deleteBot, botController.clearUser);

router.route('/generate-bot').post(authController.protect, botController.generateBot);
module.exports = router;
