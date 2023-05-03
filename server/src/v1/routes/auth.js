const router = require("express").Router();
const { body, validationResult } = require("express-validator");
require('dotenv').config();
const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

// ユーザ新規登録API
router.post(
    "/register",
    body("username")
        .isLength({ min: 8 })
        .withMessage("Username must be 8 characters."),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be 8 characters."),
    body("confirmPassword")
        .isLength({ min: 8 })
        .withMessage("ConfirmPassword must be 8 characters."),
    body("username").custom((value) => {
        return User.findOne( {username: value}).then((user) => {
            if (user) {
                return Promise.reject("This user is already in use.");
            }
        });
    }),
    validation.validate,
    userController.register
);

// ユーザログイン用API
router.post(
    "/login",
    body("username")
        .isLength({ min: 8 })
        .withMessage("Username must be 8 characters."),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be 8 characters."),
    validation.validate,
    userController.login
);

// JWT認証API
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
    return res.status(200).json({ user: req.user });
});

module.exports = router;