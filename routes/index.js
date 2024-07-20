const express = require("express");
const { user, post, edit, deleteUser } = require("../controller/userController");
const {register, login} = require("../controller/authController")
const { verifyToken } = require("../midleware/verifyToken");
const router = express.Router();

// user
router.get('/', verifyToken, user)
router.post("/route/post", post)
router.put("/route/put/:ID", edit)
router.delete("/route/delete/:IDS", deleteUser)

// auth
router.post("/auth/register", register)
router.post("/auth/login", login)

module.exports = router;
