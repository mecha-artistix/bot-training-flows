const { LinkedNodes, makeConnectionsObj, generateModel } = require('./generatePromptString');

const Bot = require('./botModel');
const UserProfile = require('../userProfile/UserProfileModel');
const User = require('../users/userModel');
const Flowchart = require('../flowcharts/flowchartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');

exports.generateBot = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { flowchartId, botId } = req.body;
  let bot;
  if (flowchartId !== null) {
    // get nodes and edges from flowchart
    const flowchart = await Flowchart.findById(flowchartId);
    const { name, nodes, edges } = flowchart;

    // generate bot using nodes and edges
    const promptList = new LinkedNodes();
    makeConnectionsObj(promptList, nodes, edges);
    const promptConnectedList = promptList.getTree();
    const promptText = generateModel(promptConnectedList);

    // update bot model
    const botData = { userId, name, prompt: { promptText, source: flowchartId } };
    bot = await Bot.findOneAndUpdate({ user: userId, name }, { $set: botData }, { new: true, upsert: true });

    await flowchart.updateOne({ $set: { bot: bot } });

    // add bot to user
    await User.findOneAndUpdate({ _id: userId }, { $addToSet: { bots: bot._id } }, { new: true, upsert: true });
  } else if (botId !== null) {
    bot = await Bot.findById(botId);
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: bot,
    },
  });
});

exports.getAllBots = factory.getAll(Bot);

exports.getBot = factory.getOne(Bot);

// exports.createBot = factory.createOne(Bot)

exports.updateUser = async (req, res, next) => {
  // const { _id: userId } = req.user;
  req.body.user = req.user._id;
  next();
};

exports.createBot = catchAsync(async (req, res, next) => {
  const { name, promptText } = req.body;

  const newBot = await Bot.create({
    user: req.user._id,
    name,
    prompt: {
      promptText,
    },
  });

  res.status(201).json({
    status: 'success',
    message: 'bot created successfully',
    bot: newBot,
  });
});

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

exports.deleteBot = factory.deleteOne(Bot);

exports.clearUser = async (req, res, next) => {
  if (!req.deletedDoc) return next(new AppError('Document was not deleted', 500));
  const deletedBot = req.deletedDoc;

  // check/delete related flowchart
  let pullFromUser = { bots: deletedBot._id };
  const relatedFlowchart = deletedBot.prompt.source;
  if (relatedFlowchart != null) {
    const deletedFlowchart = await Flowchart.findByIdAndDelete(relatedFlowchart);
    pullFromUser.flowcharts = deletedFlowchart._id;
  }
  // update user
  await User.updateMany({ _id: req.user._id }, { $pull: pullFromUser });

  res.status(204).json({
    status: 'deleted',
    data: null,
  });
};
