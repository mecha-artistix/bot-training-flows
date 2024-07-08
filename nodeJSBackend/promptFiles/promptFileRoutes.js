const express = require('express');
const promptFileController = require('./promptFileController');

const router = express.Router();

router
  .route('/:user')
  .post(promptFileController.createPromptFile)
  .delete(promptFileController.deletePromptFile)
  .get(promptFileController.getPromptFiles);

module.exports = router;
