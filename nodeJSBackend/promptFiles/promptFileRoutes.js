const express = require('express');
const promptFileController = require('./promptFileController');

const router = express.Router();

router.route('/:user').post(promptFileController.createPromptFile);

module.exports = router;
