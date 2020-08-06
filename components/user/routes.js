const express = require('express');
const router = express.Router();
const response = require('../../network/response');

const {controlSubscribeNewUser, controlSearchUser, controlGetUserBattles} = require('./controller');

router.get('/', (req, res) => {
  const nameOrTag = req.query.nametag;
  const searchBy = req.query.search_by;
  controlSearchUser(nameOrTag, searchBy)
    .then(data => {
      const dataObject = { users: data};
      res.render('index.ejs', dataObject);
    })
    .catch( err => {
      console.log(err);
    })
    
  //res.send('Aqui se pregunta suscribir un tag ó consultar un tag');
})

// Returns user battles info
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
      console.log(data.message);
      response.success(req, res, data.dataReturned, data.message, 201);
    })
    .catch( err => {
      const message = 'User not found or user has not played yet.';
      console.log(message, err);
      response.error(req, res, err, message, 400);
    })
})

module.exports = router;