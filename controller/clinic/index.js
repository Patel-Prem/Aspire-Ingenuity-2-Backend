const {
  createClinicSer,
  selectClinicSer,
  updateClinicSer,
  deleteClinicSer,
} = require("../../use-case/clinic");
// #########

const createClinicFun = require("./insert-clinic");
const selectClinicFun = require("./select-clinic");
const updateClinicFun = require("./update-clinic");
const deleteClinicFun = require("./delete-clinic");

// #########

const createClinicController = createClinicFun({ createClinicSer });
const selectClinicController = selectClinicFun({ selectClinicSer });
const updateClinicController = updateClinicFun({ updateClinicSer });
const deleteClinicController = deleteClinicFun({ deleteClinicSer });
// #########
const services = Object.freeze({
  createClinicController,
  selectClinicController,
  updateClinicController,
  deleteClinicController,
});

module.exports = services;
module.exports = {
  createClinicController,
  selectClinicController,
  updateClinicController,
  deleteClinicController,
};
