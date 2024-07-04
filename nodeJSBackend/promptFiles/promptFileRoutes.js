const express = require('express');
const promptFileController = require('./promptFileController');

const router = express.Router();

router.route('/:user').post(promptFileController.createPromptFile).get(promptFileController.getPromptFiles);

module.exports = router;
