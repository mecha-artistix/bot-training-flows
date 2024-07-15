const mongoose = require('mongoose');
const { LinkedNodes, makeConnectionsObj, generateModel } = require('./generatePromptString');
const Bot = require('../bots/botModel');
const UserProfile = require('../userProfile/UserProfileModel');

const nodeSchema = new mongoose.Schema({
  type: { type: String },
  position: {
    x: { type: Number },
    y: { type: Number },
  },
  data: { type: mongoose.Schema.Types.Mixed },
  width: { type: Number },
  height: { type: Number },
  id: { type: String, required: true },
});

const edgeSchema = new mongoose.Schema({
  source: { type: String, required: true },
  sourceHandle: { type: String },
  target: { type: String, required: true },
  targetHandle: { type: String },
  type: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
  style: { type: mongoose.Schema.Types.Mixed },
  markerEnd: { type: mongoose.Schema.Types.Mixed },
  id: { type: String, required: true },
});

const flowChartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  nodes: [nodeSchema],
  edges: [edgeSchema],
  promptText: { type: String },
  bot: { type: mongoose.Schema.Types.ObjectId, ref: 'Bot' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
});

// Middleware to fetch the document before update
flowChartSchema.post('findOneAndUpdate', async function (doc, next) {
  if (doc) {
    try {
      // console.log('options \n', this.options);
      const { name, nodes, edges, user, _id } = doc;
      // console.log(nodes, edges);
      // Generate promptText
      const promptList = new LinkedNodes();
      makeConnectionsObj(promptList, nodes, edges);
      const promptConnectedList = promptList.getTree();
      const promptText = generateModel(promptConnectedList);

      const botData = { user, name, prompt: { promptText, source: _id } };
      const bot = await Bot.findOneAndUpdate({ user, name }, { $set: botData }, { new: true, upsert: true });

      if (bot && bot._id) {
        await Flowchart.updateOne({ _id: doc._id }, { $addToSet: { bot: bot._id } });
        await UserProfile.findOneAndUpdate({ user }, { $addToSet: { bots: bot._id } }, { new: true, upsert: true });
      }
    } catch (error) {
      console.error('Error updating bot:', error);
    }
  }
  next();
});

const Flowchart = mongoose.model('Flowchart', flowChartSchema);
module.exports = Flowchart;
