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
  User.findOne({where: { email: req.body.email }})
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

//getting all users
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

//puling the user Profile
exports.getUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      res.status(200).json(user);
      console.log(user.id);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

//delete user profile
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user !== null) {
        user.destroy().then(() => {
          res.status(201).json({
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

//when user wants to modify their profile page
exports.modifyUser = () => {};
