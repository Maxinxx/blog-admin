'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async hello() {
    const { ctx } = this;
    const { keys } = this.app.config;
    ctx.body = keys;
  }
}

module.exports = HomeController;
