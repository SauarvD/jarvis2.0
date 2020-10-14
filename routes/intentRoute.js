/**
 * @module IntentRoute
 * @description Route for handling intent
 * @author Saurav Dutta
 */

const express = require("express");
const router = express.Router();

const { handleIntent } = require("../controller/intentController");


/**
 * Endpoints used to handle all token operations
 */
router.post("/intent", handleIntent);

module.exports = router;