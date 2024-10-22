const mongoose = require('mongoose');

const intentSchema = new mongoose.Schema({
  session_id: { type: String },
  intent: { type: String },
});
const Intent = mongoose.model('Intent', intentSchema);
module.exports = Intent;
