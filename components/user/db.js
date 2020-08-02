const UserModel = require('./model');


function saveUser(userData) {
  const newUser = new UserModel(userData);
  return newUser.save();
}

async function getUsers() {
  const users = await UserModel.find();
  return users;
}


module.exports = {
  dbSaveUser: saveUser,
  dbGetUsers: getUsers,
}