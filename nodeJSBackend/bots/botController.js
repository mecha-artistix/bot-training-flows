const Bot = require('./botModel');
const UserProfile = require('../userProfile/UserProfileModel');
const Flowchart = require('../flowcharts/flowchartModel');

exports.getBots = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserProfile.findOne({ user: userId });
    if (!userId && !user) return res.status(400).json({ message: 'user not found' });
    let bots;
    if (req.query.bot) {
      bots = await Bot.findOne({ _id: { $in: user.bots }, name: req.query.bot });
    } else {
      bots = await Bot.find({ _id: { $in: user.bots } });
    }

    const results = bots.length || 0;

    res.status(200).json({
      status: 'success',
      results,
      data: {
        bots: bots,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.messagem,
      stack: error.stack,
    });
  }
};

exports.createBot = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(userId);
    const user = await UserProfile.findOne({ user: userId });
    if (!userId && !user) return res.status(404).json({ message: 'user not found' });
    const { name, promptText } = req.body;

    const newBot = await Bot.create({
      user: userId,
      name,
      prompt: {
        promptText,
      },
    });

    await UserProfile.findOneAndUpdate(
      { user: userId },
      { $addToSet: { bots: newBot._id } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      status: 'success',
      message: 'bot created successfully',
      bot: newBot,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
      stack: err.stack,
    });
  }
};

exports.updateBotModal = async (req, res) => {
  const { userId, botId } = req.params;
  try {
    console.log(userId, botId);
    const user = await UserProfile.findOne({ user: userId });
    const bot = await Bot.findOneAndUpdate({ _id: botId }, { $set: { modal: req.body.modal } }, { new: true });

    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    res.status(200).json({
      status: 'success',
      data: {
        bot,
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

exports.deleteBot = async (req, res) => {
  const { userId } = req.params;
  try {
    const { _id } = req.body;
    const user = await UserProfile.findOne({ user });
    if (!user) res.status(404).json({ status: 'failed', message: 'user not found' });

    const deletedBot = await Bot.deleteOne({ _id: { $in: user.bots }, _id });
    await UserProfile.updateOne({ _id: user._id }, { $pull: { bots: deletedBot._id } });
    await Flowchart.updateOne({ _id: deletedBot.prompt.source, user: userId }, { $set: { bot: '' } });
    res.status(204).json({
      message: 'Bot deleted',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
      stack: err.stack,
    });
  }
};
