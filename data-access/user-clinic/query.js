const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getAllAppliedShift,
    getFavouriteClinicsByUserId,
    getuser_Fav_ClinicsByUserAndClnic,
  });
  async function get() {
    return prismaService.shift.findMany();
  }
  async function getOne(id) {
    return prismaService.user_Fav_Clinics.findFirst({
      where: {
        id: id,
      },
    });
  }

  async function getFavouriteClinicsByUserId(userId) {
    return prismaService.user_Fav_Clinics.findMany({
      where: {
        tsmId: userId,
      },
    });
  }
  async function add(model) {
    return prismaService.user_Fav_Clinics.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.user_Fav_Clinics.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.user_Fav_Clinics.delete({
      where: {
        id: id,
      },
    });
  }

  async function getAllAppliedShift(userId) {
    return prismaService.user_Fav_Clinics.findMany({
      where: {
        tsmId: userId,
      },
      include: {
        shift: true,
      },
    });
  }

  async function getuser_Fav_Clinics(userId, user_Fav_ClinicsID) {
    return prismaService.usershifts.findFirst({
      where: {
        id: userId,
        clinicPersonnelId: userId,
      },
    });
  }

  async function getuser_Fav_ClinicsByUserAndClnic(userId, clinicId) {
    return prismaService.user_Fav_Clinics.findMany({
      where: {
        tsmId: userId,
        clinicId: clinicId,
      },
    });
  }
};

module.exports = query;
