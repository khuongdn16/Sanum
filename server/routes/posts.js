/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', 
  postsController.getPosts, 
  (req, res) => {
    res.status(200).json({
      posts: res.locals.posts
    });
  }
);

router.post('/', 
  postsController.createPosts, 
  postsController.getPosts, 
  (req, res) => {
    res.status(200).json({
      posts: res.locals.posts
    });  
  }
);

router.delete('/', 
  postsController.deletePosts, 
  (req, res) => {
    res.status(200).json({
      posts: res.locals.posts
    });  
  });

module.exports = router;
