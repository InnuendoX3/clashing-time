const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true
  },
  name: String, 
})

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;