const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");

router.get("/feed", postsCtrl.getAllPosts);
router.get("/viewpost/:id", postsCtrl.viewPost);
// router.post("/addpost", postsCtrl.addPost);
// router.put("/:id", postsCtrl.modifyPost);
// router.delete("/:id", postsCtrl.deletePost);

module.exports = router;