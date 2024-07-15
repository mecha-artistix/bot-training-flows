const Flowchart = require('./flowchartModel');
const UserProfile = require('../userProfile/UserProfileModel');
const { LinkedNodes, makeConnectionsObj, generateModel } = require('./generatePromptString');

exports.createFlowchart = async (req, res) => {
  try {
    const { name, nodes, edges, user } = req.body;

    const flowChartData = { name, nodes, edges, user };

    const newFlowchart = await Flowchart.findOneAndUpdate(
      { user, name },
      { $set: flowChartData },
      { new: true, upsert: true }
    );

    await UserProfile.findOneAndUpdate(
      { user },
      { $addToSet: { flowcharts: newFlowchart._id } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      status: 'created',
      message: 'flowchart created successfully',
      flowchart: newFlowchart,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.getFlowcharts = async (req, res) => {
  const { userId } = req.params;
  const queryObj = { ...req.query };
  try {
    // QUERY ALL OF A USER
    const userProfile = await UserProfile.findOne({ user: userId });
    let flowcharts;

    if (req.query.flow) {
      // QUERY single flowchart by providing name of the flow in user profile
      flowcharts = await Flowchart.findOne({ _id: { $in: userProfile.flowcharts }, name: req.query.flow });
    } else {
      // query all in user profile
      flowcharts = await Flowchart.find({ _id: { $in: userProfile.flowcharts } });
    }

    res.status(200).json({
      status: 'success',
      // results: flowcharts.length,
      data: {
        flowcharts,
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

exports.deleteFlowchart = async (req, res) => {
  const { userId } = req.params;
  try {
    // QUERY ALL OF A USER
    const userProfile = await UserProfile.findOne({ user: userId });
    if (!userProfile) res.status(404).json({ status: 'failed', message: 'No user found' });
    let flowcharts;
    const deletedFlowchart = await Flowchart.deleteOne({ _id: { $in: userProfile.flowcharts }, _id: req.query.id });
    await UserProfile.updateOne({ _id: userProfile._id }, { $pull: { flowcharts: deletedFlowchart._id } });
    res.status(204).json({ message: 'Flowchart deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
