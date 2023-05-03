const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const User = require("../models/user");
require('dotenv').config();

// 新規登録
exports.register = async(req, res) => {
    // パスワードの受け取り
    const password = req.body.password;

    try {
        // パスワード暗号化
        req.body.password = crypto.AES.encrypt(password, process.env.SECRET_KEY);
        // ユーザ新規作成
        const user = await User.create(req.body);
        // JWT発行
        const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {expiresIn: "24h"});
        return res.status(200).json({ user, token });
    } catch (err) {
        return res.status(500).json(err);
    }
};

// ログイン
exports.login = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({ username : username });
        if (!user) {
            return res.status(401).json({
                errors: {
                    param: "username",
                    message: "Invalid username."
                }
            })
        }
        // パスワード照合
        const descryptedPassword = crypto.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        ).toString(crypto.enc.Utf8);

        if (descryptedPassword !== password) {
            return res.status(401).json({
                errors: {
                    param: "password",
                    message: "Invalid password."
                }
            })
        }

        // JWTトークン発行
        const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {expiresIn: "24h"});
        return res.status(201).json({ user, token });
    } catch (err) {
        return res.status(500).json(err);
    }
};