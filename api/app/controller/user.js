'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  // 注册
  async signUp() {
    const { name, password } = this.ctx.request.body;
    const exists = await this.ctx.service.user.exist(name);

    if (exists.length > 0) {
      this.ctx.body = {
        status: 400,
        msg: 'username is exists',
      };
      return;
    }

    const res = await this.ctx.service.user.create({ name, password });
    this.ctx.body = {
      status: 0,
      msg: 'ok',
      data: res,
    };
  }

  // 登录
  async signIn() {
    const { name, password } = this.ctx.request.body;
    const isLegal = await this.ctx.service.user.check(name, password);

    if (isLegal.length > 0) {
      this.ctx.body = {
        status: 0,
        msg: 'ok',
      };
    } else {
      this.ctx.body = {
        status: 400,
        msg: 'wrong password',
      };
    }
  }
}

module.exports = UserController;
