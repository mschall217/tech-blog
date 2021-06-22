const router = require('express').Router();
const { Post, User, Comment } = require('../../models/');
const Sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');



router.post('/', withAuth, async (req, res) => {
    try { 
      const postData = await Post.create({
      title: req.body.title,
      postBody: req.body.postBody,
      user_id: req.session.user_id

    });
    res.status(200).json(postData)
  } catch (err) {
    res.status(400).json("not working");
  }
  });


module.exports = router;