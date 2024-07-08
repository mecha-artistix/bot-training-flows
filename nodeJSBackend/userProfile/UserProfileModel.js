const mongoose = require('mongoose');

// USSERS PROFILE SCHEMA
const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAuth', required: true },
  basicInfo: {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    userName: { type: String, required: true },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, default: null },
  },
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    country: { type: String, default: null },
  },
  flowcharts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flowchart' }],
  promptFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PromptFile' }],
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
