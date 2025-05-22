const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  dob: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  userType: { type: String, required: true },
});
module.exports = mongoose.model('User', userSchema);