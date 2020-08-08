const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs');
})

router.get('/nuevousuario', (req, res) => {
  res.render('subscribe.ejs');
})

module.exports = router;