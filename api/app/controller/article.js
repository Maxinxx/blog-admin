"use strict";

const { Controller } = require("egg");

class ArticleController extends Controller {
  async create() {
    const { title, content, tags, createTime, authorName } =
      this.ctx.request.body;
    const authorId = await this.ctx.service.user.getUid(authorName);
    const article = { title, content, tags, createTime, authorId };
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
    const { title, content, tags, updateTime, gid } = this.ctx.request.body;
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
      updateTime,
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
