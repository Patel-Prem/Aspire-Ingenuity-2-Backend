const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getAllTheShifts,
    getAllTheShiftsTSM,
    getShift,
    getShiftsByUserAndClnic,
    getOneWithClinic,
    getOneWithUser,
    getAllTheTimePassedAndMarkComplete,
  });
  async function get() {
    return prismaService.shift.findMany();
  }
  async function getOne(id) {
    return prismaService.shift.findFirst({
      where: {
        id: id,
      },
      include: {
        clinic: true,
      },
    });
  }
  async function getOneWithUser(id) {
    return prismaService.shift.findFirst({
      where: {
        id: id,
      },
      include: {
        user_shifts: {
          include: {
            tsm: {
              include: {
                profile: {
                  include: {
                    educations: true,
                  },
                },
              },
            },
          },
        },
        clinic: true,
      },
    });
  }
  async function getOneWithClinic(id) {
    return prismaService.shift.findFirst({
      where: {
        id: id,
      },
      include: {
        clinic: true,
      },
    });
  }
  async function add(model) {
    return prismaService.shift.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.shift.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.shift.delete({
      where: {
        id: id,
      },
    });
  }

  async function getAllTheShifts(userId) {
    return prismaService.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .shifts({
        include: {
          clinic: true,
        },
      });
  }

  async function getShift(userId, shiftID) {
    return prismaService.shift.findFirst({
      where: {
        id: shiftID,
        clinicPersonnelId: userId,
      },
    });
  }

  async function getShiftsByUserAndClnic(userId, clinicId) {
    return prismaService.shift.findMany({
      where: {
        clinicPersonnelId: userId,
        clinicId: clinicId,
      },
      include: {
        user_shifts: true,
      },
    });
  }

  async function getAllTheShiftsTSM() {
    return prismaService.shift.findMany({
      include: {
        user_shifts: false,
      },
    });
  }

  async function getAllTheTimePassedAndMarkComplete() {
    return prismaService.shift.findMany({
      where: {
        endTime: {
          lt: new Date(),
        },
        isComplete: false,
        isCompleteNotificationSent: false,
      },
      include: {
        clinic: true,
        user_shifts: true,
        clinicPersonnel: true,
      },
    });
  }
};

module.exports = query;
