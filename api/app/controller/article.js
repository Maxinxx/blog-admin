"use strict";

const { Controller } = require("egg");

class ArticleController extends Controller {
  async create() {
    const article = this.ctx.request.body;
    const gid = await this.ctx.service.article.create(article);
    if (gid) {
      this.ctx.body = {
        status: 0,
        msg: "ok",
        data: {
          gid,
        },
      };
    }
  }

  async delete() {
    const { gid } = this.ctx.request.body;
    const result = await this.ctx.service.article.deleteByGid(gid);
    if (result) {
      this.ctx.body = {
        status: 0,
        msg: "ok",
      };
    }
  }

  async search() {
    const query = this.ctx.request.body;
    const articles = await this.ctx.service.article.search(query);
    this.ctx.body = {
      status: 0,
      msg: "ok",
      data: articles,
    };
  }

  async update() {
    const { title, content, tags, gid } = this.ctx.request.body;
    const targetArticle = await this.ctx.service.article.getByGid(gid);
    if (!targetArticle) {
      this.ctx.body = {
        status: 400,
        msg: "article not found",
      };
      return;
    }

    const result = await this.ctx.service.article.update(gid, {
      title,
      content,
      tags,
    });
    this.ctx.body = {
      status: 0,
      msg: "ok",
      data: result,
    };
  }

  async detail() {
    const { gid } = this.ctx.request.body;
    const result = await this.ctx.service.article.getByGid(gid);
    this.ctx.body = {
      status: 0,
      msg: "ok",
      data: result,
    };
  }
}

module.exports = ArticleController;
