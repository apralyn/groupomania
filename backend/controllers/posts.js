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

//create a new one (addPost)
exports.addPost = (req, res, next) => {
  //TODO add if statement to check if req.files is not null
  //note if it is not null create the post like below line38-47 is good if there is req.files
  //check either console.log
  console.log(req.file);
  console.log(req.body);
  const imageUrl = req.protocol + "://" + req.get("host");
  if (req.file !== null) {
    const parsedPost = JSON.parse(req.body.post);
    const post = new Post({
      title: parsedPost.title,
      description: parsedPost.description,
      imageUrl: imageUrl + "/images/" + req.file.filename,
      likes: 0,
      usersLiked: [],
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
  }
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    imageUrl: imageUrl + "/images/" + req.file.filename,
    likes: 0,
    usersLiked: [],
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
};

// edit a post (modifyPost)
exports.modifyPost = (req, res, next) => {
  let post = new Post({ id: req.params.id });
  if (req.file) {
    const imageUrl = req.protocol + "://" + req.get("host");
    post = {
      title: req.body.title,
      description: req.body.description,
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

  // Post.updateOne({ id: req.params.id }, post)
  //   .then(() => {
  //     res.status(201).json({
  //       message: "Post updated successfully!",
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({
  //       error: error.message || error,
  //     });
  //   });
};

//liking a post (likePost)
exports.likePost = (req, res, next) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  Post.findOne({ where: { id: postId } })
    .then((post) => {
      let likes;
      let { usersLiked } = post;
      if (req.body.like == 1) {
        console.log("read post");
        if (!post.usersLiked.includes(userId)) {
          usersLiked = [...usersLiked, userId];
          likes = post.likes + 1;
        }
      }
      if (req.body.like == 0) {
        console.log("unread");
        if (post.usersLiked.includes(userId)) {
          const userId = req.body.userId;
          post.usersLiked = post.usersLiked.filter((value) => value !== userId);
          post.likes--;
        }
      }
      post.update({ usersLiked, likes });
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

//delete a post (deletePost)
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
