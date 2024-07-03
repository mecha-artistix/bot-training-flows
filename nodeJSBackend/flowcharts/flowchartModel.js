const mongoose = require('mongoose');
const LinkedNodes = require('./generatePromptString');

const nodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String },
  position: {
    x: { type: Number },
    y: { type: Number },
  },
  data: { type: mongoose.Schema.Types.Mixed },
});

const edgeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  sourceHandle: { type: String },
  target: { type: String, required: true },
  targetHandle: { type: String },
  type: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
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
flowChartSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const query = this.getQuery();
    const update = this.getUpdate();
    console.log(query);
    const docToUpdate = await this.model.findOne(query);

    if (!docToUpdate) {
      return next(new Error('Document not found'));
    }

    // Now you have access to nodes and edges in docToUpdate
    const list = new LinkedNodes(docToUpdate.nodes, docToUpdate.edges);
    this._update.$set = this._update.$set || {};
    this._update.$set.promptText = await list.generateModel();

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Flowchart', flowChartSchema);

// const list = new LinkedNodes(this.nodes, this.edges);
// this.promptText = await list.generateModel();
