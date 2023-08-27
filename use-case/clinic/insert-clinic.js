const ValidationError = require("../../error/validationError");
const NodeGeoCoder = require("../../config/geocoder/node-geocoder");

const createClinic = ({ clinicRepository, userRepository }) => {
  return async function insert(model, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    model.clinicPersonnelId = loggedInUser.id;
    let ab = {};
    try {
      ab = await NodeGeoCoder.geocode(model.address + " " + model.city);
      console.log("after the one");
      console.log(ab);
      model.lattitude = ab[0].latitude.toString();
      model.longitude = ab[0].longitude.toString();
    } catch (e) {
      console.log("Could not retrieve from NodeGeoGenerator");
      console.log(e);
    }
    return clinicRepository.add(model);
  };
};

module.exports = createClinic;
