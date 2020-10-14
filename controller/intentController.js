/**
 * @module intentController
 * @description Deals with all business logic involved in transaction of intent data
 * @author Saurav Dutta
 */

const axios = require("axios");

const getWeatherData = query => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=d64b4096e02d47bcacb111415201410&q=${query.parameters.any}`
      )
      .then(response => {
        resolve(
          query.parameters.any +
            "seems to be" +
            response.data.current.condition.text
        );
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * @function handleIntent
 * @description Function to get token from google API
 * @param {object} req request from client
 * @param {object} res response from server
 */
const handleIntent = async (req, res) => {
  try {
    let response = "response seems to take long time";
    switch (req.body.queryResult.action) {
      case "location":
        response = await getWeatherData(req.body.queryResult);
        console.log("*********** " + response);
        res.status(200).send({
          fulfillmentMessages: [
            {
              text: {
                text: [response]
              }
            }
          ]
        });
        break;
      default:
        response = "Something seems to be broken, I need more training";
        console.log("&&&&&&&&&&& " + response);
        res.status(200).send({
          fulfillmentMessages: [
            {
              text: {
                text: [response]
              }
            }
          ]
        });
        break;
    }
  } catch (ex) {
    res.status(500).send({
      fulfillmentMessages: [
        {
          text: {
            text: [response]
          }
        }
      ]
    });
  }
};

module.exports = { handleIntent };
