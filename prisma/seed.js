const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//npx prisma db seed
async function main() {
  const adminEmail = "adminuser@yopmail.com";
  const password = "AdminUser123#";
  const encryptedPassword = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: encryptedPassword,
      role: "ADMIN",
      isVerified: true,
    },
  });
  console.log("Admin user updated!");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
