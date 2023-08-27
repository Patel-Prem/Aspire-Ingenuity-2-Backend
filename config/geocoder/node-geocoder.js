const NodeGeocoder = require("node-geocoder");
require("dotenv").config();

const options = {
  provider: "google",

  // Optional depending on the providers
  // fetch: customFetchImplementation,
  apiKey: process.env.GOOGLE_MAP_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
