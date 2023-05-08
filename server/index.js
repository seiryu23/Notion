const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const PORT = 5000;
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:3000",
}));

app.use(express.json());
app.use("/api/v1", require("./src/v1/routes"));

//DB接続
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("success connect!!");
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log("express 起動")
});