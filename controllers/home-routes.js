const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(err).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/homepage', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, { attributes: { exclude: ['password'] } });
    const users = { ...user.dataValues };
    console.log(users);
    res.render('homepage', {users});
  } catch (err) {
    console.log(err);
    res.status(err).json(err);
  }
});

router.get('/homepage', async (req, res) => {
  try {;
    res.render('homepage');
  } catch (err) {
    console.log(err);
    res.status(err).json(err);
  }
});
module.exports = router;