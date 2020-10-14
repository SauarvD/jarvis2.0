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
        console.log(req);
        res.status(200).send({
            speech: 'weather is fine',
            displayText: 'weather is fine',
        });
    } catch(ex) {
        res.status(500).send({
            success: false,
            response: ex.message || 'Token authentication Failed'
        })
    }
}

module.exports = { handleIntent }