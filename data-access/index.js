const { PrismaClient } = require("@prisma/client");

const prismaService = new PrismaClient();

async function main() {
  await prismaService.$connect();
}

main()
  .then(async () => {
    console.log("Connected to the DB!");
  })
  .catch(async (e) => {
    console.error(e);
    await prismaService.$disconnect();
    process.exit(1);
  });

module.exports = { prismaService };
