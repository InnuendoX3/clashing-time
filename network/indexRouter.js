const express = require('express');
const { controlGetQtyUsers } = require('../components/user/controller');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs');
})

router.get('/about', async (req, res) => {
  const totalUsers = await controlGetQtyUsers();
  res.send(`This app has ${totalUsers} users`);
})

module.exports = router;