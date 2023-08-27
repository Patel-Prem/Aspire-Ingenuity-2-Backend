const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
  });
  async function get() {
    return prismaService.post.findMany();
  }
  async function getOne(id) {
    return prismaService.post.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function add(model) {
    return prismaService.post.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.post.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.post.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
