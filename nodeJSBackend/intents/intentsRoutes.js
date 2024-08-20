const express = require('express');
const intentController = require('./intentsController');

const router = express.Router();
router.route('/intents').post(intentController.createIntent).get(intentController.getAllIntents);

module.exports = router;
