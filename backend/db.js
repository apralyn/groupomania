const { Pool } = require("pg");

// Create a pool to handle database connections
const pool = new Pool({
  user: "newuser",
  host: "localhost",
  database: "groupomania",
  password: "password",
  port: 5432,
});

pool.connect();
// Create a table for user model
const createUserTable = () => {
  pool
    .query(
      `CREATE TABLE IF NOT EXISTS users (
      userId      SERIAL PRIMARY KEY,
      username    VARCHAR(50) UNIQUE NOT NULL,
      initials    VARCHAR(2)  NOT NULL,
      password    VARCHAR(50) NOT NULL,
      email       VARCHAR(50) UNIQUE NOT NULL,
      created_at  TIMESTAMP DEFAULT NOW(),
      updated_at  TIMESTAMP DEFAULT NOW()
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
      id SERIAL PRIMARY KEY,
      title VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      imageURL VARCHAR(50) NOT NULL,
      usersRead INTEGER[] NOT NULL,
      userId INTEGER REFERENCES users(id) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
    )
    .then(() => console.log("Post table created"))
    .catch((err) => console.error("Error creating post table", err));
};

// Call the table creation functions
createUserTable();
createPostTable();
