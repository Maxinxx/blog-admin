"use strict";

const { Controller } = require("egg");

class UserController extends Controller {
  // 注册
  async signUp() {
    const { name, ...restParams } = this.ctx.request.body;
    const exists = await this.ctx.service.user.exist(name);

    if (exists) {
      this.ctx.body = {
        status: 400,
        msg: "username is exists",
      };
      return;
    }

    const res = await this.ctx.service.user.create({ name, ...restParams });
    this.ctx.body = {
      status: 0,
      msg: "ok",
      data: res,
    };
  }

  // 登录
  async signIn() {
    const { name, password } = this.ctx.request.body;
    const userInfo = await this.ctx.service.user.find(name, password);

    if (userInfo.length > 0) {
      // 生成签名
      const token = this.app.jwt.sign(userInfo[0], this.app.config.jwt.secret, {
        expiresIn: "7d",
      });
      this.ctx.cookies.set("token", token);
      this.ctx.body = {
        status: 0,
        msg: "ok",
        data: {
          ...userInfo[0],
          uid: userInfo[0]._id,
        },
      };
    } else {
      this.ctx.body = {
        status: 400,
        msg: "wrong password",
      };
    }
  }

  // 用户信息
  async userInfo() {
    const userInfo = this.ctx.service.user.userInfo() || {};

    this.ctx.body = {
      status: 0,
      msg: "ok",
      data: userInfo,
    };
  }

  async search() {
    const query = this.ctx.request.body;
    const users = await this.ctx.service.user.search(query);
    this.ctx.body = {
      status: 0,
      msg: "ok",
      data: users,
    };
  }

  async detail() {
    const { uid } = this.ctx.request.body;
    const user = await this.ctx.service.user.detail(uid);
    this.ctx.body = {
      status: 0,
      msg: "ok",
      data: user,
    };
  }
}

module.exports = UserController;
