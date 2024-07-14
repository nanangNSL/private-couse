const express = require("express");
const { user, post, edit, deleteUser } = require("../controller/userController");
const router = express.Router();

router.get('/', user)
router.post("/route/post", post)
router.put("/route/put/:ID", edit)
router.delete("/route/delete/:IDS", deleteUser)

module.exports = router;
