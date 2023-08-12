const Service = require("egg").Service;

class UserService extends Service {
  async exist(name) {
    return await this.ctx.model.User.exists({ name });
  }

  async find(name, password) {
    return await this.ctx.model.User.find({ name, password })
      .select(["name", "avatar"])
      .lean();
  }

  async create(params) {
    const { id } = await this.ctx.model.User.create(params);
    return {
      id,
    };
  }

  async getUid(name) {
    let uid;
    const user = await this.ctx.model.User.find({ name });
    if (user.length > 0) {
      uid = user[0].id;
    }
    return uid;
  }
}

module.exports = UserService;
