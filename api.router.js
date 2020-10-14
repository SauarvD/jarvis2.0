/**
 * @module api.router
 * @description This file contains all the routes in the app
 * @author Saurav Dutta
 */

const express = require("express");
const router = express.Router();

/**
 * IMPORT ALL ROUTES HERE
 */

const tokenRoute = require("./routes/tokenRoute");
const intentRoute = require("./routes/intentRoute");

/**
 * DEFINE ALL ROUTES HERE
 */
router.use("/token", tokenRoute);
router.use("/handleIntent", intentRoute);

module.exports = router;