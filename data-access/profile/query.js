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
    addInclusive,
    getByUserId,
    updateInclusive,
  });
  async function get() {
    return prismaService.profile.findMany();
  }
  async function getOne(id) {
    return prismaService.profile.findFirst({
      where: {
        id: id,
      },
      include: {
        address: true,
        educations: true,
        availabilities: true,
      },
    });
  }
  async function getByEmail(email) {
    return prismaService.profile.findUnique({
      where: {
        email: email,
      },
    });
  }

  async function getByUserId(userId) {
    return prismaService.profile.findUnique({
      where: {
        userId: userId,
      },
      include: {
        address: true,
        educations: true,
        availabilities: true,
      },
    });
  }

  async function getByRefreshToken(refreshToken) {
    return prismaService.profile.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async function getByIdAndCode(id, code) {
    return prismaService.profile.findFirst({
      where: {
        id: id,
        verificationToken: code,
      },
    });
  }

  async function addInclusive(model) {
    // no suit
    if (model.address) {
      delete model.address.suit;
    }
    const address = model.address;
    const educations = model.educations;
    const availabilities = model.availabilities;
    return prismaService.profile.create({
      data: {
        userId: model.userId,
        firstName: model.firstName,
        lastName: model.lastName,
        middleName: model.middleName,
        expectedSalary: model.expectedSalary,
        position: model.position,
        status: "NO_CERTIFICATE_PROVIDED",
        documentStatus: "NO_CERTIFICATE_PROVIDED",
        address: {
          create: address,
        },
        educations: {
          create: educations,
        },
        availabilities: {
          create: availabilities,
        },
      },
    });
  }

  async function updateInclusive(model, id) {
    const address = model.address;
    const educations = model.educations;
    const availabilities = model.availabilities;
    return prismaService.profile.update({
      where: {
        id: id,
      },
      data: {
        userId: model.userId,
        firstName: model.firstName,
        lastName: model.lastName,
        middleName: model.middleName,
        expectedSalary: model.expectedSalary,
        address: {
          update: { where: { profileId: id }, data: address },
        },
        educations: {
          update: { where: { profileId: id }, data: educations },
        },
        availabilities: {
          update: { where: { profileId: id }, data: availabilities },
        },
      },
    });
  }

  async function add(model) {
    return prismaService.profile.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.profile.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.profile.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
