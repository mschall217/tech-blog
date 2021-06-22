const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in,
        page: 'dashboard',
      });
    } catch (e) {
      res.status(400).json(e);
    }
  });

module.exports = router;