const express = require('express');
const router = express.Router();

const getDays = require('./db')

router.get('/', (req, res) => {
  getDays()
    .then( data => {
      console.log(data)
      res.send(data)
    })
})

module.exports = router;