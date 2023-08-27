const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getByEmail,
    getByRefreshToken,
    getByIdAndCode,
  });
  async function get() {
    return prismaService.availability.findMany();
  }
  async function getOne(id) {
    return prismaService.availability.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function getByEmail(email) {
    return prismaService.availability.findUnique({
      where: {
        email: email,
      },
    });
  }

  async function getByRefreshToken(refreshToken) {
    return prismaService.availability.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async function getByIdAndCode(id, code) {
    return prismaService.availability.findFirst({
      where: {
        id: id,
        verificationToken: code,
      },
    });
  }

  async function add(model) {
    return prismaService.availability.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.availability.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.availability.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
