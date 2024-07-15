const express = require('express');
const botController = require('./botController');

const router = express.Router();

router.route('/:userId').get(botController.getBots).post(botController.createBot);

router.route('/:userId/:botId').patch(botController.updateBotModal).delete(botController.deleteBot);
module.exports = router;
