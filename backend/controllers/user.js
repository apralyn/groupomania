const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");


//SignupView
exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      initials: req.body.initials,
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

//LoginView
exports.login = (req, res) => {
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

//get || ProfileView
exports.getUser = (req, res) => {
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
exports.deleteUser = (req, res) => {
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


//edit user profile !important
// exports.modifyUser = (req, res, next) => {
//   let user = new User({ id: req.params.id });
//   if (req.file) {
//     const imageUrl = req.protocol + "://" + req.get("host");
//     user = {
//       name: req.body.name,
//       imageUrl: imageUrl + "/images/" + req.file.filename,
//       userId: req.body.userId,
//     };
//   } else {
//     user = {
//       name: req.body.name,
//       imageUrl: req.body.imageUrl,
//       userId: req.body.userId,
//     };
//   }
// };

//get all users !important
// exports.getUsers = (req, res) => {
//   User.findAll()
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: error.message,
//       });
//     });
// };