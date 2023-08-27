const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getAllAppliedShift,
    getFavouriteClinicsByUserId,
    getclinic_Fav_UsersByUserAndClnic,
    getFavouriteUserByClincId,
  });
  async function get() {
    return prismaService.clinic_Fav_Users.findMany();
  }
  async function getOne(id) {
    return prismaService.clinic_Fav_Users.findFirst({
      where: {
        id: id,
      },
    });
  }

  async function getFavouriteClinicsByUserId(userId) {
    return prismaService.clinic_Fav_Users.findMany({
      where: {
        tsmId: userId,
      },
    });
  }
  async function getFavouriteUserByClincId(clinicId) {
    return prismaService.clinic_Fav_Users.findMany({
      where: {
        clinicId: clinicId,
      },
      include: {
        tsm: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async function add(model) {
    return prismaService.clinic_Fav_Users.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.clinic_Fav_Users.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.clinic_Fav_Users.delete({
      where: {
        id: id,
      },
    });
  }

  async function getAllAppliedShift(userId) {
    return prismaService.clinic_Fav_Users.findMany({
      where: {
        tsmId: userId,
      },
      include: {
        shift: true,
      },
    });
  }

  async function getclinic_Fav_Users(userId, clinic_Fav_UsersID) {
    return prismaService.clinic_Fav_Users.findFirst({
      where: {
        id: userId,
        clinicPersonnelId: userId,
      },
    });
  }

  async function getclinic_Fav_UsersByUserAndClnic(userId, clinicId) {
    return prismaService.clinic_Fav_Users.findFirst({
      where: {
        tsmId: userId,
        clinicId: clinicId,
      },
    });
  }
};

module.exports = query;
