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
    return prismaService.address.findMany();
  }
  async function getOne(id) {
    return prismaService.address.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function getByEmail(email) {
    return prismaService.address.findUnique({
      where: {
        email: email,
      },
    });
  }

  async function getByRefreshToken(refreshToken) {
    return prismaService.address.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async function getByIdAndCode(id, code) {
    return prismaService.address.findFirst({
      where: {
        id: id,
        verificationToken: code,
      },
    });
  }

  async function add(model) {
    console.log("model");
    console.log(model);
    if (model.suit) {
      delete model.suit;
    }
    return prismaService.address.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.address.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.address.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
