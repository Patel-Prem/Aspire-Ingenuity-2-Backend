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
    getUserWithProfile,
    getWithPage,
    getAllTSM,
    getAllUserwithTheDeviceToken,
    updateMany,
  });
  async function get() {
    return prismaService.user.findMany();
  }

  async function getAllTSM() {
    return prismaService.user.findMany({
      where: {
        role: "USER",
      },
      include: {
        profile: {
          include: {
            address: true,
            educations: true,
            availabilities: true,
          },
        },
      },
    });
  }

  async function getAllUserwithTheDeviceToken(device_token) {
    return prismaService.user.findMany({
      where: {
        device_token_firebase: device_token,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async function updateMany(ids, model) {
    return prismaService.user.updateMany({
      where: {
        id: { in: ids },
      },
      data: model,
    });
  }

  async function getOne(id) {
    return prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function getWithPage({ page, size }, searchKey) {
    if (searchKey) {
      return prismaService.user.findMany({
        include: {
          profile: {
            include: {
              address: true,
              educations: true,
              availabilities: true,
            },
          },
        },
        where: {
          role: "USER",
          OR: [
            {
              email: {
                contains: searchKey,
                mode: "insensitive",
              },
            },
            {
              profile: {
                firstName: {
                  contains: searchKey,
                  mode: "insensitive",
                },
              },
            },
          ],
        },

        skip: Number(page - 1) * Number(size),
        take: Number(size),
      });
    } else {
      return prismaService.user.findMany({
        where: {
          role: "USER",
        },
        include: {
          profile: {
            include: {
              address: true,
              educations: true,
              availabilities: true,
            },
          },
        },
        skip: Number(page - 1) * Number(size),
        take: Number(size),
      });
    }
  }

  async function getUserWithProfile(id) {
    return prismaService.user.findFirst({
      include: {
        profile: true,
      },
      where: {
        id: id,
      },
    });
  }
  async function getByEmail(email) {
    return prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async function getByRefreshToken(refreshToken) {
    return prismaService.user.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async function getByIdAndCode(id, code) {
    return prismaService.user.findFirst({
      where: {
        id: id,
        verificationToken: code,
      },
    });
  }

  async function add(model) {
    return prismaService.user.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.user.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
