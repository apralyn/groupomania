const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");

router.post("/addpost", postsCtrl.addPost);
router.get("/feed", postsCtrl.getAllPosts);
router.get("/:id/viewpost", postsCtrl.viewPost);
router.put("/:id/modify", postsCtrl.modifyPost);
router.post("/:id/like", postsCtrl.likePost);
router.delete("/:id/delete", postsCtrl.deletePost);

module.exports = router;