/**
 * @module intentController
 * @description Deals with all business logic involved in transaction of intent data
 * @author Saurav Dutta
 */

/**
 * @function handleIntent
 * @description Function to get token from google API
 * @param {object} req request from client
 * @param {object} res response from server
 */
const handleIntent = async (req, res) => {
    try {
        res.status(200).send({
            "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      "Text response from webhook"
                    ]
                  }
                }
            ]
        });
    } catch(ex) {
        res.status(500).send({
            "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      "Text response from webhook"
                    ]
                  }
                }
            ]
        })
    }
}

module.exports = { handleIntent }