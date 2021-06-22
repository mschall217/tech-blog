const router = require('express').Router();
const { User, Post, } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } }).catch((err) => { res.json(err);});
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', {posts});
  } catch (err) {
    console.log(err);
    res.status(err).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } }).catch((err) => { res.json(err);});
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('dashboard', { posts});
  } catch (err) {
    console.log(err);
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

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, { attributes: { exclude: ['password'] } });
    const users = { ...user.dataValues };
    console.log(users);
    res.render('dashboard', {users});
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