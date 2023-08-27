const { prismaService } = require("../index");
// ######
const query = require("./query");
// ######
const model = {};
const userRepository = query({ prismaService, model });
// ######
module.exports = userRepository;
