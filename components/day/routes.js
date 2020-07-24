const express = require('express');
const router = express.Router();

const {controlGetAllDays, controlSetBattleDay} = require('./controller');

router.get('/', (req, res) => {
  controlGetAllDays()
    .then( data => res.send(data))
    .catch( err => res.send(err));
})

router.post('/', (req, res) => {
  controlSetBattleDay(req.body)
    .then( data => {
      console.log(data)
      res.send(data)
    })
    .catch( err => {
      console.log(err)
      res.send(err)
    })
})

module.exports = router;