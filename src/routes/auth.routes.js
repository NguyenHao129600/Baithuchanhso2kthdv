const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const verifyToken = require("../middleware/auth.middleware");

router.post("/login", authController.login);

router.post("/auth", verifyToken, (req, res) => {
    res.status(200).json({
        message: "Token hợp lệ",
        user: req.user
    });
});

module.exports = router;