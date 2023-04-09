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
      if (!post) {
        return res.status(404).send(new Error("Post not found!"));
      }
      res.status(200).json(post);
      console.log("Hello Cat");
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

//create new post (addPost)
exports.addPost = (req, res, next) => {
  const imageUrl = req.protocol + "://" + req.get("host");
  if (req.file !== null) {
    const parsedPost = JSON.parse(req.body.post);
    const post = new Post({
      title: parsedPost.title,
      description: parsedPost.description,
      imageUrl: imageUrl + "/images/" + req.file.filename,
      read: 0,
      usersRead: [],
      userId: parsedPost.userId,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({
          message: "Post successfully added!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  } else {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    imageUrl: imageUrl + "/images/" + req.file.filename,
    read: 0,
    usersRead: [],
    userId: req.body.userId,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post successfully added!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
  }   
};

//read-indicator on a post (likePost)
exports.readPost = (req, res, next) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  Post.findOne({ where: { id: postId } })
    .then((post) => {
      let read;
      let { usersRead } = post;
      if (req.body.like == 1) {
        console.log("read post");
        if (!post.usersRead.includes(userId)) {
          usersRead = [...usersRead, userId];
          read = post.read + 1;
        }
      }
      if (req.body.like == 0) {
        console.log("unread");
        if (post.usersRead.includes(userId)) {
          const userId = req.body.userId;
          post.usersRead = post.usersRead.filter((value) => value !== userId);
          post.read--;
        }
      }
      post.update({ usersRead, read });
      post.save().then(() =>
        res.status(200).json({
          message: "Updated the post status.",
        })
      );
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

// edit post (modifyPost) !important
exports.modifyPost = (req, res, next) => {
  let post = new Post({ id: req.params.id });
  if (req.file) {
    const imageUrl = req.protocol + "://" + req.get("host");
    post = {
      title: req.body.title,
      description: req.body.description,
      //replace images with media
      imageUrl: imageUrl + "/images/" + req.file.filename,
      userId: req.body.userId,
    };
  } else {
    post = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userId: req.body.userId,
    };
  }
};
//delete post (deletePost) !important
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post !== null) {
        post.destroy().then(() => {
          res.status(200).json({
            message: "Post successfully deleted.",
          });
        });
      } else {
        res.status(400).json({
          message: "Post not found.",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        erorr: error.message,
      });
    });
};
