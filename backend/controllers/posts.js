const { Post } = require("../models");
const fs = require("fs");

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