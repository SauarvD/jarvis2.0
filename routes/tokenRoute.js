/**
 * @module TokenRoute
 * @description Route for token API
 * @author Saurav Dutta
 */

const express = require("express");
const router = express.Router();

const { tokenAuthenticate } = require("../controller/tokenController");

/**
 * Endpoints used to handle all token operations
 */
router.get("/getToken", tokenAuthenticate);

module.exports = router;