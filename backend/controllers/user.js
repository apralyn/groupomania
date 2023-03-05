const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");

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

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
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

//when user click profile from feed to access profile page
exports.getUser = (req, res, next) => {
  User.findOne({ id: req.params.id })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

//when user wants to modify their profile page
exports.modifyUser = () => {};

//when user wants to delete their profile
exports.deleteUser = (req, res, next) => {
  User.findOne({ id: req.params.id }).then((user) => {
    const filename = user.imageUrl.split("/images")[1];
    fs.unlink("images/" + filename, () => {
      User.deleteOne({ id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "User successfully deleted.",
          });
        })
        .catch((error) => {
          res.status(400).json({
            erorr: error.message,
          });
        });
    });
  });
};
