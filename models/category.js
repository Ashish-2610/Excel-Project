const mongoose = require('mongoose');
const policyCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
});
module.exports = mongoose.model('PolicyCategory', policyCategorySchema);