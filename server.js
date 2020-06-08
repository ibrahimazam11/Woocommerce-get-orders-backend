const express = require('express')
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8835;
const database = require("./app/config/database");
const apiRoutesV1 = require("./app/v1/api/api");
require('dotenv').config();


app.get('/ping', (req, res) => {
    res.send("pong")
})

//database.createMongoose();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", apiRoutesV1);
app.get("/*", async (req, res) => {
    return res.send("WooCommerce Rest API Server");
});

process.on("uncaughtException", function (err) {
    console.log(err);
    console.log("Node NOT Exiting...");
});

app.listen(PORT, () => {
    console.log("WooCommerce Rest API Server is live on Port: ", PORT)
})