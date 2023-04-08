const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");
console.log("this is " + fs);

//post
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

//post
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password!"),
            });
          }
          const token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          res.status(200).json({
            userId: user.id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

//get
exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

//get
exports.getUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      res.status(200).json(user);
      console.log("this is the current user id " + user.email);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

//delete
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user !== null) {
        user.destroy().then(() => {
          res.status(200).json({
            message: "User successfully deleted.",
          });
        });
      } else {
        res.status(400).json({
          message: "User not found.",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        erorr: error.message,
      });
    });
};

// WIP on modifying user
//put
exports.modifyUser = (req, res, next) => {
  let user = new User({ id: req.params.id });
  if (req.file) {
    const imageUrl = req.protocol + "://" + req.get("host");
    user = {
      name: req.body.name,
      imageUrl: imageUrl + "/images/" + req.file.filename,
      userId: req.body.userId,
    };
  } else {
    user = {
      name: req.body.name,
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
