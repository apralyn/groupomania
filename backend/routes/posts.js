const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postsCtrl = require("../controllers/posts");

router.post("/addpost", auth, postsCtrl.addPost);
router.get("/feed", auth, postsCtrl.getAllPosts);
router.get("/:id/viewpost", auth, postsCtrl.viewPost);
router.put("/:id/mod", auth, multer, postsCtrl.modifyPost);
router.post("/:id/like", auth, postsCtrl.likePost);
router.delete("/:id/delete", auth, postsCtrl.deletePost);

module.exports = router;