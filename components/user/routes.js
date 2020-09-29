const express = require('express');
const router = express.Router();
const response = require('../../network/response');

const {controlSubscribeNewUser, controlSearchUser, controlGetUserBattles} = require('./controller');

// Look after a user by name or tag
// Returns list of matched users.
router.get('/', (req, res) => {
  const nameOrTag = req.query.nametag;
  const searchBy = req.query.search_by;
  controlSearchUser(nameOrTag, searchBy)
  .then(data => {
    // users is asked on results as object for showing results
    const dataObject = { users: data };
    res.render('index.ejs', dataObject);
  })
  .catch( err => {
    console.log(err);
  })
  
})

// Render the Subscribe page
router.get('/subscribe', (req, res) => {
  res.render('subscribe.ejs');
})

// Returns user battles info
// Rendering it on User page
router.get('/:tag', (req, res) => {
  controlGetUserBattles(req.params.tag)
    .then( data => {
      res.render('user.ejs', data)
    })
    .catch( err => {
      console.log(err);
    })
})

// Subscribe a new user on the DB
router.post('/', (req, res) => {
  const newTag = req.body.newtag
  controlSubscribeNewUser(newTag)
    .then( data => {
      console.log(data.messageToLog);
      res.render('subscribe.ejs', data )
    })
    .catch( err => {
      const message = 'User not found or user has not played yet.';
      console.log(message, err);
      response.error(req, res, err, message, 400);
    })
})


module.exports = router;