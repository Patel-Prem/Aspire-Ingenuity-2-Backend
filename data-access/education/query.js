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
    return prismaService.education.findMany();
  }
  async function getOne(id) {
    return prismaService.education.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function getByEmail(email) {
    return prismaService.education.findUnique({
      where: {
        email: email,
      },
    });
  }

  async function getByRefreshToken(refreshToken) {
    return prismaService.education.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async function getByIdAndCode(id, code) {
    return prismaService.education.findFirst({
      where: {
        id: id,
        verificationToken: code,
      },
    });
  }

  async function add(model) {
    return prismaService.education.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.education.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.education.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
