const JWT = require("jsonwebtoken");
const User = require("../models/user")

// クライアントから受け取ったJWTが正常か検証
const tokenDecode = (req) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ")[1];
        try {
            const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
            return decodedToken;
        } catch {
            return false;
        }
    } else {
        return false;
    }
};

//JWT認証を検証するためのミドルウェア
exports.verifyToken = async(req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        // JWTと一致するユーザを検索
        const user = await User.findById(tokenDecoded.id);
        if (!user) {
            return res.status(401).json("Not authorized.");
        }
        req.user = user;
        next();
    } else {
        return res.status(401).json("Not authorized.");
    }
};