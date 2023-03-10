const express = require("express");
const bodyParser = require("body-parser");

// const { Sequelize } = require("sequelize");
const path = require("path");

const userRoutes = require("./routes/user");

const app = express();


//connect to sequelize
// const sequelize = new Sequelize("groupomania", "newuser", "password", {
//   host: "localhost",
//   dialect: "postgres",
// });

//testing sequelize connection
// sequelize
//   .authenticate()
//   .then(() => console.log("Sequelize is connected!"))
//   .catch((error) => console.log("Error: " + error));

app.use(express.json());

//CORS error handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);

module.exports = app;
