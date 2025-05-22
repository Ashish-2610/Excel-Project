const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  scheduledFor: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);