/**
 * @module Server
 * @description Server.js is the start point of this nodejs project
 * @author Saurav Dutta
 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRouter = require("./api.router");
var cors = require("cors");

/**
 * setting the limit of data to be sent over server
 */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

/**
 * Here we are using cors to access the APIs over cross origins
 */
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to JARVIS 2.0 !!!! ");
});

app.listen(PORT, () => {
  console.log(`info: Our app is running on port ${PORT}`);
});

process.on("unhandledRejection", err => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});
