const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/signup", auth, userCtrl.signup);
router.post("/login", auth, userCtrl.login);
router.get("/", auth, userCtrl.getUsers);
router.get("/:id", auth, userCtrl.getUser);
router.put("/:id", auth, userCtrl.modifyUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
