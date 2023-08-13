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

  userInfo() {
    const token = this.ctx.cookies.get("token");
    let res = {};
    // 解码token
    if (token) {
      res = this.ctx.app.jwt.verify(token, this.ctx.app.config.jwt.secret);
    }
    return res;
  }
}

module.exports = UserService;
