const { prismaService } = require("../index");
// ######
const query = require("./query");
// ######
const model = {};
const clinicRepository = query({ prismaService, model });
// ######
module.exports = clinicRepository;
