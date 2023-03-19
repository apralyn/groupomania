const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");

router.get("/feed", postsCtrl.getAllPosts);

module.exports = router;