const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

// メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);

// ログインしているユーザが投降したメモを全て取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);

// ログインしているユーザが投降したメモを1つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

// ログインしているユーザが投降したメモを1つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

// ログインしているユーザが投降したメモを1つ削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

module.exports = router;