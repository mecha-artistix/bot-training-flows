const mongoose = require('mongoose');

const intentSchema = new mongoose.Schema({
  name: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
});
const Intent = mongoose.model('Intent', intentSchema);
module.exports = Intent;
