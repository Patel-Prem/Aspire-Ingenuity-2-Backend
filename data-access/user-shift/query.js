const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getAllAppliedShift,
    getByUserIdAndShiftId,
    getAllAppliedShiftForTsm,
    getAllAppliedShiftForTsmTotal,
    getAllUpcomingShifts,
    getByShiftId,
  });
  async function get() {
    return prismaService.shift.findMany();
  }
  async function getOne(id) {
    return prismaService.user_Shifts.findFirst({
      where: {
        id: id,
      },
    });
  }

  async function getByUserIdAndShiftId(userId, shiftId) {
    return prismaService.user_Shifts.findFirst({
      where: {
        tsmId: userId,
        shiftId: shiftId,
      },
    });
  }
  async function add(model) {
    return prismaService.user_Shifts.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.user_Shifts.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.user_Shifts.delete({
      where: {
        id: id,
      },
    });
  }

  async function getAllAppliedShift(userId) {
    return prismaService.user_Shifts.findMany({
      where: {
        tsmId: userId,
        isCanceledByTSM: false,
      },
      include: {
        shift: true,
      },
    });
  }

  async function getAllAppliedShiftForTsm(userId, query) {
    const { page, size } = query;
    return prismaService.user_Shifts.findMany({
      where: {
        tsmId: userId,
        isCanceledByTSM: false,
        isAcceptedByCP: false,
      },
      include: {
        shift: {
          include: {
            clinic: {
              select: {
                officeName: true,
                address: true,
                city: true,
              },
            },
          },
        },
      },
      skip: Number(page - 1) * Number(size),
      take: Number(size),
    });
  }

  async function getAllAppliedShiftForTsmTotal(userId, query) {
    const { page, size } = query;
    return prismaService.user_Shifts.findMany({
      where: {
        tsmId: userId,
        isCanceledByTSM: false,
        isAcceptedByCP: false,
      },
      include: {
        shift: true,
      },
    });
  }

  async function getAllUpcomingShifts(userId) {
    return prismaService.user_Shifts.findMany({
      where: {
        tsmId: userId,
        isAcceptedByCP: true,
        isMarkCompletedByCP: false,
        isMarkCompletedByTSM: false,
      },
    });
  }

  async function getAllCreatedShift(userId) {
    return prismaService.user_Shifts.findMany({
      where: {
        tsmId: userId,
      },
      include: {
        shift: true,
      },
    });
  }

  async function getuser_Shifts(userId, user_ShiftsID) {
    return prismaService.usershifts.findFirst({
      where: {
        id: user_ShiftsID,
        clinicPersonnelId: userId,
      },
    });
  }

  async function getuser_ShiftssByUserAndClnic(userId, clinicId) {
    return prismaService.user_Shifts.findMany({
      where: {
        clinicPersonnelId: userId,
        clinicId: clinicId,
      },
    });
  }

  async function getByShiftId(shiftId) {
    return prismaService.user_Shifts.findMany({
      where: {
        shiftId: shiftId,
      },
    });
  }
};

module.exports = query;
