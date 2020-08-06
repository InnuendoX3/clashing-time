const UserModel = require('./model');

async function getUserInfo(tag) {
  const query = {"tag": tag};
  const response = await UserModel.findOne(query);
  console.log('response', response)
  return response;
}

async function getUsers() {
  const users = await UserModel.find();
  return users;
}

async function saveUser(userData) {
  const newUser = new UserModel(userData);
  return await newUser.save();
}

async function searchUser(query) {
  const searchResults = await UserModel.find(query);
  return searchResults;
}


module.exports = {
  dbGetUserInfo: getUserInfo,
  dbGetUsers: getUsers,
  dbSaveUser: saveUser,
  dbSearchUser: searchUser,
}