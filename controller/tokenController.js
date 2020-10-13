/**
 * @module tokenController
 * @description Deals with all business logic involved in transaction of token data
 * @author Saurav Dutta
 */

const googleAuth = require("google-oauth-jwt");
const configData = require("../utils");

/**
 * @function getToken
 * @description Helper Function to talk to google API to get authentication token
 */
const getToken = async () => {
    let email = process.env.client_email
    let key = process.env.private_key
    console.log(email);
    console.log(key);
    return new Promise(resolve => {
        googleAuth.authenticate(
          {
            email: email,
            key: key,
            scopes: [
              "https://www.googleapis.com/auth/cloud-platform",
              "https://www.googleapis.com/auth/dialogflow"
            ]
          },
          (err, token) => {
            resolve(token);
          }
        );
      });
}

/**
 * @function tokenAuthenticate
 * @description Function to get token from google API
 * @param {object} req request from client
 * @param {object} res response from server
 */
const tokenAuthenticate = async (req, res) => {
    try {
        let token = await getToken();
        res.status(200).send({
            success: true,
            response: token,
        });
    } catch(ex) {
        res.status(500).send({
            success: false,
            response: ex.message || 'Token authentication Failed'
        })
    }
}

module.exports = { tokenAuthenticate }
