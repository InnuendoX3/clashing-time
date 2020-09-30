const express = require('express');
const { controlGetQtyUsers } = require('../components/user/controller');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs');
})

router.get('/about', async (req, res) => {
  try {
    const totalUsers = await controlGetQtyUsers();
    res.render('about.ejs', {totalUsers});
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;