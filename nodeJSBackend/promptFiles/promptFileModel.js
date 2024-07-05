const mongoose = require('mongoose');
const Flowchart = require('../flowcharts/flowchartModel');

const promptFileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  prompt: {
    promptText: { type: String },
    source: {
      flowchart: { type: mongoose.Schema.Types.ObjectId, ref: 'Flowchart', default: null },
    },
  },
});

const PromptFile = mongoose.model('PromptFile', promptFileSchema);

// promptFileSchema.post('save', async function (doc, next) {
//   try {
//     if (doc.prompt.source)
//       await Flowchart.findOneAndUpdate(
//         { _id: doc.prompt.source, user: doc.user },
//         { promptText: doc._id },
//         { new: true, upsert: true }
//       );
//     next();
//   } catch (error) {
//     console.log(error.message);
//     next(error);
//   }
// });

module.exports = PromptFile;
