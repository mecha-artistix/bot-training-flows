const PromptFile = require('./promptFileModel');
const UserProfile = require('../userProfile/UserProfileModel');

exports.createPromptFile = async (req, res) => {
  // const user = req.params;
  try {
    const prompt = { ...req.body };
    const { name, promptText, user } = req.body;
    const newPrompt = await PromptFile.create({
      user: user,
      name: name,
      prompt: {
        promptText: promptText,
      },
    });
    await UserProfile.findOneAndUpdate(
      { user },
      { $addToSet: { promptFiles: newPrompt._id } },
      { new: true, upsert: true }
    );
    res.status(201).json({
      status: 'success',
      data: {
        newPrompt,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.getPromptFiles = async (req, res) => {
  const { user } = req.params;
  try {
    const userProfile = await UserProfile.findOne({ user: user });
    let promptFiles;

    // QUERY BY NAME OF A USER
    if (req.query.prompt) {
      promptFiles = await PromptFile.findOne({ _id: { $in: userProfile.promptFiles }, name: req.query.prompt });
    } else {
      promptFiles = await PromptFile.find({ _id: { $in: userProfile.promptFiles } });
    }
    res.status(200).json({
      status: 'success',
      data: {
        promptFiles,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.deletePromptFile = async (req, res) => {
  const { user } = req.params;
  try {
    const userProfile = await UserProfile.findOne({ user: user });
    if (!userProfile) res.status(404).json({ status: 'failed', message: 'No user found' });
    const deletedPromptFile = await PromptFile.deleteOne({ _id: { $in: userProfile.promptFiles }, _id: req.query.id });
    await UserProfile.updateOne({ _id: userProfile._id }, { $pull: { promptFiles: deletedPromptFile._id } });
    res.status(204).json({ message: 'Prompt File deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
