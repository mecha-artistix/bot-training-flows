const mongoose = require('mongoose');
const LinkedNodes = require('./generatePromptString');

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
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
});

// Middleware to fetch the document before update
// flowChartSchema.pre('findOneAndUpdate', async function (next) {
//   try {
//     console.log(this.qetQuery);
//     // const { promptText } = doc;

//     // await PromptFile.findOneAndUpdate({ _id: doc._id }, { promptText });
//     // console.log(promptText);
//   } catch (error) {
//     console.log(error.message);
//     next(error.message);
//   }
//   next();
// });

// flowChartSchema.post('save', async function (doc, next) {
//   try {
//     const { nodes, edges } = doc;
//     const promptList = new LinkedNodes(nodes, edges);
//     const promptText = promptList.generateModel();
//     await Flowchart.findOneAndUpdate({ _id: doc._id }, { promptText });
//     console.log(promptText);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// flowChartSchema.pre('updateOne', async function (next) {
//   console.log('updateOne');
//   try {
//     const update = this.getUpdate();
//     console.log(update);
//     console.log(this.getQuery());
//     // Fetch the document being updated
//     const docToUpdate = await this.model.findOne(this.getQuery());

//     if (!docToUpdate) {
//       return next(new Error('Document not found'));
//     }

//     const { nodes, edges } = update.$set || update;

//     // Now you have access to nodes and edges in docToUpdate
//     const list = new LinkedNodes(nodes, edges);
//     const promptText = await list.generateModel();

//     // Ensure $set is initialized in update
//     update.$set = update.$set || {};
//     update.$set.promptText = promptText;

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const Flowchart = mongoose.model('Flowchart', flowChartSchema);
module.exports = Flowchart;
