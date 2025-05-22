const mongoose = require('mongoose');
const policySchema = new mongoose.Schema({
  policyNumber: { type: String, required: true },
  policyStartDate: { type: String, required: true },
  policyEndDate: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
module.exports = mongoose.model('Policy', policySchema);