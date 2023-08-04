const Service = require('egg').Service;

class UserService extends Service {
  async exist(username) {
    return await this.ctx.model.User.find({ name: username });
  }

  async check(username, password) {
    return await this.ctx.model.User.find({ name: username, password });
  }

  async create(params) {
    const { id } = await this.ctx.model.User.create(params);
    return {
      id,
    };
  }

  async getUid(username) {
    let uid;
    const user = await this.ctx.model.User.find({ name: username });
    if (user.length > 0) {
      uid = user[0].id;
    }
    return uid;
  }
}

module.exports = UserService;
