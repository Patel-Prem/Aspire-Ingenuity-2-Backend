const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getNotificationsOfUser,
    getNotificationsByUserIdAndId,
  });
  async function get() {
    return prismaService.notification.findMany();
  }
  async function getOne(id) {
    return prismaService.notification.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function getNotificationsOfUser(id) {
    return prismaService.notification.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        time: "desc",
      },
      take: 20,
    });
  }
  async function getNotificationsByUserIdAndId(userId, notificationId) {
    return prismaService.notification.findFirst({
      where: {
        userId: userId,
        id: notificationId,
      },
    });
  }

  async function add(model) {
    return prismaService.notification.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.notification.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.notification.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
