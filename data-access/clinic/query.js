const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getAllTheClinics,
    getClinic,
    getAllShifts,
    getWithPage,
    getOneForAdmin,
    getAllShiftsInFuture,
    getClnicsByIdAndUserId,
  });
  async function get() {
    return prismaService.clinic.findMany();
  }

  // async function get() {
  //   return prismaService.clinic.findMany({
  //     include: {
  //       clinicPersonnel: true,
  //     },
  //     where: {
  //       OR: [
  //         {
  //           clinicPersonnel: {
  //             isBannedByAdmin: false,
  //           },
  //         },
  //         {
  //           clinicPersonnel: {
  //             isBannedByAdmin: null,
  //           },
  //         },
  //       ],
  //     },
  //   });
  // }

  async function getWithPage({ page, size }, searchKey) {
    if (searchKey) {
      return prismaService.clinic.findMany({
        include: {
          clinicPersonnel: true,
        },
        where: {
          OR: [
            {
              officeName: {
                contains: searchKey,
                mode: "insensitive",
              },
            },
            {
              address: {
                contains: searchKey,
                mode: "insensitive",
              },
            },
          ],
        },

        skip: Number(page - 1) * Number(size),
        take: Number(size),
      });
    } else {
      return prismaService.clinic.findMany({
        include: {
          clinicPersonnel: true,
        },
        skip: Number(page - 1) * Number(size),
        take: Number(size),
      });
    }
  }
  async function getOneForAdmin(id) {
    return prismaService.clinic.findFirst({
      include: {
        clinicPersonnel: true,
      },
      where: {
        id: id,
      },
    });
  }
  async function getOne(id) {
    return prismaService.clinic.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function add(model) {
    return prismaService.clinic.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.clinic.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.clinic.delete({
      where: {
        id: id,
      },
    });
  }

  async function getClnicsByIdAndUserId(clinicId, userId) {
    return prismaService.clinic.findFirst({
      where: {
        id: clinicId,
        clinicPersonnelId: userId,
      },
    });
  }
  async function getAllTheClinics(userId) {
    return prismaService.clinic.findMany({
      where: {
        clinicPersonnelId: userId,
      },
    });
    // return prismaService.user
    //   .findUnique({
    //     where: {
    //       id: userId,
    //     },
    //   })
    //   .clinics();
  }

  async function getAllShifts(clinicId) {
    return prismaService.clinic
      .findUnique({
        where: {
          id: clinicId,
        },
      })
      .shifts();
  }

  async function getAllShiftsInFuture(clinicId) {
    return prismaService.clinic
      .findUnique({
        where: {
          id: clinicId,
        },
      })
      .shifts({
        where: {
          startTime: {
            gte: new Date(),
          },
        },
      });
  }

  async function getClinic(userId, clinicID) {
    return prismaService.clinic.findFirst({
      where: {
        id: clinicID,
        clinicPersonnelId: userId,
      },
    });
  }
};

module.exports = query;
