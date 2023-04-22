const { Post } = require("../models");

//all posts (getAll)
exports.getAllPosts = (req, res) => {
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

//create new post (addPost)
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

exports.readPost = (req, res) => {
  const postId = req.params.id;
  Post.findOne({ where: { id: postId } })
    .then((post) => {
      //array
      const usersReadArray = post.usersRead;
      //userId must be add to usersReadArray
      const user = req.body.userReadId;

      usersReadArray.push(user);
      Post.update({ usersRead: [] }, { where: { usersRead: [] } });
      post.save();
      console.log(post);

      res.status(200).json({
        message: "user successfully added.",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message || error,
      });
    });
};

// edit post (modifyPost) !important
// exports.modifyPost = (req, res, next) => {
//   let post = new Post({ id: req.params.id });
//   if (req.file) {
//     const imageUrl = req.protocol + "://" + req.get("host");
//     post = {
//       title: req.body.title,
//       description: req.body.description,
//       //replace images with media
//       imageUrl: imageUrl + "/images/" + req.file.filename,
//       userId: req.body.userId,
//     };
//   } else {
//     post = {
//       title: req.body.title,
//       description: req.body.description,
//       imageUrl: req.body.imageUrl,
//       userId: req.body.userId,
//     };
//     console.log(post);
//   }
// };
// //delete post (deletePost) !important
exports.deletePost = (req, res,) => {
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
