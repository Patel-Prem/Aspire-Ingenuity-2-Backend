const clinicRepository = require("../../data-access/clinic");
const shiftRepository = require("../../data-access/shift");
const userRepository = require("../../data-access/user");

const createClinicFun = require("./insert-clinic");
const selectClinicFun = require("./select-clinic");
const updateClinicFun = require("./update-clinic");
const deleteClinicFun = require("./delete-clinic");

const createClinicSer = createClinicFun({ clinicRepository, userRepository });
const selectClinicSer = selectClinicFun({ clinicRepository, userRepository });
const updateClinicSer = updateClinicFun({ clinicRepository, userRepository });
const deleteClinicSer = deleteClinicFun({
  clinicRepository,
  userRepository,
  shiftRepository,
});

const services = Object.freeze({
  createClinicSer,
  selectClinicSer,
  updateClinicSer,
  deleteClinicSer,
});

module.exports = services;
module.exports = {
  createClinicSer,
  selectClinicSer,
  updateClinicSer,
  deleteClinicSer,
};
