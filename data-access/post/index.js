const { prismaService } = require("../index");
// ######
const query = require("./query");
// ######
const model = {};
const postRepository = query({ prismaService, model });
// ######
module.exports = postRepository;
