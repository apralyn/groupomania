const { Post } = require("../models");
const fs = require("fs");

//all postings (getAll)
exports.getAllPosts = (req, res, next) => {
  Post.findAll()
  .then((post) => {
    res.status(200).json(post);
  })
  .catch((error) => {
    res.status(500).json({
      error: error.message,
    });
  });
};

//view one post (viewPost)
exports.viewPost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      res.status(200).json(post);
      console.log("Hello Cat");
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

//create a new one (addPost)

// edit a post (modifyPost)

//delete a post (deletePost)

