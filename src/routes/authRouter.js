const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/authCtrl");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);

module.exports = router;