const UserModel = require('./model');

async function searchUser(query) {
  console.log('query', query)
  const searchResults = await UserModel.find(query);
  //console.log('searchResults', searchResults)
  return searchResults;
}

async function saveUser(userData) {
  const newUser = new UserModel(userData);
  return await newUser.save();
}

async function getUsers() {
  const users = await UserModel.find();
  return users;
}


module.exports = {
  dbSearchUser: searchUser,
  dbSaveUser: saveUser,
  dbGetUsers: getUsers,
}