/**
 * @module intentController
 * @description Deals with all business logic involved in transaction of intent data
 * @author Saurav Dutta
 */

const axios = require("axios");

/**
 * @function getWeatherData
 * @description Function to call weather api to get weather status of a particular location
 * @param {object} query query from the client
 */
const getWeatherData = query => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=d64b4096e02d47bcacb111415201410&q=${query.parameters.any}`
      )
      .then(response => {
        resolve(`${query.parameters.any}:${response.data.current.temp_c}:${response.data.current.condition.text}:${response.data.current.condition.icon}`)
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
    let response = "response seems to be taking long time";
    /**
     * Handling different actions from the client
     */
    switch (req.body.queryResult.action) {
      /**
       * Handling all weather locations here
       */
      case "location":
        response = await getWeatherData(req.body.queryResult);
        console.log("location response " + response);
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
      /**
       * Handling all google searches here
       */
      case "google":
        let queryResult = req.body.queryResult.parameters.google;
        queryResult = queryResult.split(" ").join("+");
        response = `https://www.google.com/search?q=${queryResult}`;
        console.log("google response " + response);
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
      case "maplocation":
        let locationQueryResult = req.body.queryResult.parameters.maplocation;
        locationQueryResult = locationQueryResult.split(" ").join("+");
        response = `https://www.google.co.in/maps/place/${locationQueryResult}`;
        console.log("map response " + response);
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
      /**
       * Handling default responses here
       */
      default:
        res.status(200).send({
          fulfillmentMessages: [
            {
              text: {
                text: [
                  "I am not sure about that, do you want me to google that?"
                ]
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
