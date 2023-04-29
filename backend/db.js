const { Pool } = require("pg");
require('dotenv').config();

// Create a pool to handle database connections
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect();
// Create a table for user model
const createUserTable = () => {
  pool
    .query(
      `CREATE TABLE IF NOT EXISTS users (
      id          SERIAL PRIMARY KEY,
      username    VARCHAR(255),
      initials    VARCHAR(255),
      password    VARCHAR(255),
      email       VARCHAR(255)UNIQUE,
      createdAt  TIMESTAMP DEFAULT NOW(),
      updatedAt  TIMESTAMP DEFAULT NOW()
    )
  `
    )
    .then(() => console.log("User table created"))
    .catch((err) => console.error("Error creating user table", err));
};

// Create a table for post model
const createPostTable = () => {
  pool
    .query(
      `CREATE TABLE IF NOT EXISTS posts (
      id            SERIAL PRIMARY KEY,
      title         VARCHAR(255),
      description   VARCHAR (512),
      imageURL      VARCHAR(255),
      usersRead     INTEGER[],
      userId        INTEGER,
      createdAt    TIMESTAMP DEFAULT NOW(),
      updatedAt    TIMESTAMP DEFAULT NOW()
    )
  `
    )
    .then(() => console.log("Post table created"))
    .catch((err) => console.error("Error creating post table", err));
};

// Call the table creation functions
createUserTable();
createPostTable();

module.exports = pool;