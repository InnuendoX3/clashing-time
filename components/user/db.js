const UserModel = require('./model');

function saveUser(userData) {
  console.log('Saving user on DB', userData)
  const newUser = new UserModel(userData);
  return newUser.save();
}

module.exports = {
  dbSaveUser: saveUser,
}