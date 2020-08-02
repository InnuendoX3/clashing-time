const express = require('express');
const router = express.Router();
const response = require('../../network/response');

const {controlSubscribeNewUser, controlGetUserByTag} = require('./controller');

router.get('/', (req, res) => {
  controlGetUserByTag(req.query.tag)
    .then(data => {
      res.render('user.ejs', data)
    })
    .catch( err => {
      res.render('user.ejs', err)
    })
    
  //res.send('Aqui se pregunta suscribir un tag ó consultar un tag');
})


router.get('/battle-days', (req, res) => {
  //TODO: devolver cantidad de batallas por dia de cierto usuario
  res.render('battledays.ejs');
})
/* router.get('/:id', (req, res) => {
  //TODO: devolver cantidad de batallas por dia de cierto usuario
  res.send('Mostrando resultados del usuario');
}) */

//Subscribe a new user on the DB
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