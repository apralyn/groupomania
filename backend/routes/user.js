const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", auth, userCtrl.getUser);
router.delete("/:id", auth, userCtrl.deleteUser);
// router.put("/:id",  userCtrl.modifyUser);
// router.get("/",  auth, userCtrl.getUsers);

module.exports = router;
