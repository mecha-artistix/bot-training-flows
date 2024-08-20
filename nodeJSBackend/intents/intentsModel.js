const mongoose = require('mongoose');

const intentSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.Mixed,
});
const Intent = mongoose.model('Intent', intentSchema);
module.exports = Intent;
