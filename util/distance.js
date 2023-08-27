const geolib = require("geolib");

const getDisInM = async ({ userCord, clinicCord }) => {
  return geolib.getDistance(
    { latitude: userCord.lat, longitude: userCord.lng },
    { latitude: clinicCord.lat, longitude: clinicCord.lng }
  );
};

module.exports = getDisInM;
