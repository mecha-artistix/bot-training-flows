const Flowchart = require('./flowchartModel');
const User = require('../users/userModel');
const Bot = require('../bots/botModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');

exports.createFlowchart = factory.createOne(Flowchart);

exports.updateUser = async (req, res, next) => {
  // const { _id: userId } = req.user;
  req.body.user = req.user._id;
  next();
};

exports.updateFlowchart = factory.updateOne(Flowchart);

exports.getAllFlowcharts = factory.getAll(Flowchart);

exports.getFlowchart = factory.getOne(Flowchart);

exports.deleteFlowchart = factory.deleteOne(Flowchart);

exports.clearUser = async (req, res, next) => {
  if (!req.deletedDoc) return next(new AppError('Document was not deleted', 500));
  const deletedFlowchart = req.deletedDoc;

  // check/delete related flowchart
  let pullFromUser = { flowcharts: deletedFlowchart._id };
  const relatedBot = deletedFlowchart.bot;
  if (relatedBot) {
    const deletedBot = await Bot.findByIdAndDelete(relatedBot);
    pullFromUser.bots = deletedBot._id;
  }
  // update user
  await User.updateMany({ _id: req.user._id }, { $pull: pullFromUser });

  res.status(204).json({
    status: 'deleted',
    data: null,
  });
};

// exports.getAllFlowcharts = catchAsync(async (req, res, next) => {
//   const { _id: userId, flowcharts } = req.user;

//   // QUERY ALL OF A USER
//   if (flowcharts.length == 0)
//     return res.status(200).json({
//       status: 'success',
//       results: 0,
//       data: {
//         flowcharts: null,
//       },
//     });

//   let resFlowcharts;
//   if (req.query.flow) {
//     // QUERY single flowchart by providing name of the flow in user profile
//     resFlowcharts = await Flowchart.findOne({ _id: { $in: flowcharts }, name: req.query.flow });
//   } else {
//     // query all in user profile
//     resFlowcharts = await Flowchart.find({ _id: { $in: flowcharts } });
//   }
//   const resLength = resFlowcharts.length > 0 ? resFlowcharts.length : 1;

//   res.status(200).json({
//     status: 'success',
//     results: resLength,
//     data: {
//       flowcharts: resFlowcharts,
//     },
//   });
// });

// exports.createFlowchart = catchAsync(async (req, res, next) => {
//   const { _id: userId } = req.user;
//   // if (flowcharts.length == 0) return next(new AppError('No flowcharts found', 404));
//   // console.log('userId ', userId);
//   const { name, nodes, edges } = req.body;

//   // const flowChartData = { name, nodes, edges, user };

//   const newFlowchart = await Flowchart.findOneAndUpdate(
//     { name, user: userId },
//     { $set: { name, nodes, edges, user: userId } },
//     { new: true, upsert: true }
//   );

//   res.status(201).json({
//     status: 'created',
//     message: 'flowchart created successfully',
//     flowchart: newFlowchart,
//   });
// });
