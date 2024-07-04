const PromptFile = require('./promptFileModel');
const LinkedNodes = require('./generatePromptString');

exports.createPromptFile = async (req, res) => {
  try {
    if (req.body.flowchart) console.log(req.body);
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};
