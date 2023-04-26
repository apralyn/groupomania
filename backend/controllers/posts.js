const { Post } = require("../models");

//onFeedView
exports.getAllPosts = (req, res) => {
  Post.findAll({ order: [["createdAt", "DESC"]] })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message || error,
      });
    });
};

//onViewPost
exports.viewPost = (req, res) => {
  const postId = req.params.id;
  Post.findOne({ where: { id: postId } })
    .then((post) => {
      if (!post) {
        return res.status(404).send(new Error("Post not found!"));
      }
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message || error,
      });
    });
};

//onAddPost
exports.addPost = (req, res) => {
  let post, title, description, userId;
  let imageUrl = null;
  if (req.file) {
    const parsedPost = JSON.parse(req.body.post);
    imageUrl = req.protocol + "://" + req.get("host");
    title = parsedPost.title;
    description = parsedPost.description;
    userId = parsedPost.userId;
    imageUrl += "/images/" + req.file.filename;
  } else {
    title = req.body.title;
    description = req.body.description;
    userId = req.body.userId;
  }
  post = new Post({
    title,
    description,
    imageUrl,
    read: 0,
    usersRead: [],
    userId,
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
        error: error.message || error,
      });
    });
};

//onViewPost
exports.readPost = (req, res) => {
  const postId = req.params.id;
  Post.findOne({ where: { id: postId } }).then((post) => {
    const user = req.body.userId;
    if (post.usersRead.includes(user)) {
      return res.status(304).json({
        message: "user already read the post.",
      });
    } else {
      post
        .update({ usersRead: [...post.usersRead, user] })
        .then((post) => {
          post.save().then(() => {
            res.status(200).json({
              message: "user successfully added.",
            });
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error.message || error,
          });
        });
    }
  });
};

