const Flowchart = require('./flowchartModel');
const UserProfile = require('../userProfile/UserProfileModel');
const LinkedNodes = require('./generatePromptString');

exports.createFlowchart = async (req, res) => {
  try {
    const { name, nodes, edges, user } = req.body;

    // Generate promptText
    const promptList = new LinkedNodes(nodes, edges);
    const promptText = await promptList.generateModel();

    const flowChartData = { name, nodes, edges, promptText, user };

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
    });
  }
};

// exports.createFlowchart = async (req, res) => {
//   try {
//     const { name, nodes, edges, user } = req.body;
//     console.log('user:', user);

//     // Find the user
//     const userProfile = await UserProfile.findById(user).populate('flowcharts');

//     if (!userProfile) {
//       return res.status(404).json({
//         status: 'failed',
//         message: 'User not found',
//       });
//     }

//     // Check if a flowchart with the same name exists within the user's flowcharts
//     let flowchart = userProfile.flowcharts.find((fc) => fc.name === name);

//     if (flowchart) {
//       // Update existing flowchart
//       flowchart.nodes = nodes;
//       flowchart.edges = edges;
//       flowchart.user = user;
//     } else {
//       // Create a new flowchart
//       flowchart = new Flowchart({ name, nodes, edges, user });
//       userProfile.flowcharts.push(flowchart);
//     }

//     // Save the flowchart (triggers pre('save') middleware)
//     await flowchart.save();

//     // Save the user profile to update the flowcharts array
//     await userProfile.save();

//     res.status(201).json({
//       status: 'created',
//       message: 'Flowchart created successfully',
//       flowchart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 'failed',
//       message: error.message,
//     });
//   }
// };

exports.getFlowcharts = async (req, res) => {
  const { user } = req.params;
  const queryObj = { ...req.query };
  try {
    // QUERY ALL OF A USER
    const userProfile = await UserProfile.findOne({ user: user });
    let flowcharts;

    // QUERY BY NAME OF A USER
    if (req.query.flow) {
      flowcharts = await Flowchart.findOne({ _id: { $in: userProfile.flowcharts }, name: req.query.flow });
    } else {
      flowcharts = await Flowchart.find({ _id: { $in: userProfile.flowcharts } });
    }

    res.status(200).json({
      status: 'success',
      length: flowcharts.length,
      data: {
        flowcharts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.deleteFlowchart = async (req, res) => {
  const { user } = req.params;
  try {
    // QUERY ALL OF A USER
    const userProfile = await UserProfile.findOne({ user: user });
    if (!userProfile) res.status(404).json({ status: 'failed', message: 'No user found' });
    let flowcharts;
    const deletedFlowchart = await Flowchart.deleteOne({ _id: { $in: userProfile.flowcharts }, _id: req.query.id });
    await UserProfile.updateOne({ _id: userProfile._id }, { $pull: { flowcharts: deletedFlowchart._id } });
    res.json({ message: 'Flowchart deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
