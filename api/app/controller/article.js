'use strict';

const { Controller } = require('egg');

class ArticleController extends Controller {
  async postArticle() {
    const { title, content, tags, createTime, authorName } = this.ctx.request.body;
    const authorId = await this.ctx.service.user.getUid(authorName);
    const article = { title, content, tags, createTime, authorId };
    const gid = await this.ctx.service.article.create(article);
    if (gid) {
      this.ctx.body = {
        status: 0,
        msg: 'ok',
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
        msg: 'ok',
      };
    }
  }

  async search() {
    const { groupId: queryGid, title: queryTitle, keyword: queryTags } = this.ctx.request.body;

    const query = {};
    if (queryGid && queryGid.length > 0) {
      query._id = { $in: queryGid };
    }
    if (queryTitle && queryTitle.length > 0) {
      query.title = { $in: queryTitle };
    }
    if (queryTags && queryTags.length > 0) {
      query.tags = { $in: queryTags };
    }
    const articles = await this.ctx.service.article.search(query);
    if (articles.res.length > 0) {
      const result = articles.res.map(item => item._doc).map(item => delete item.__v);
      this.ctx.body = {
        status: 0,
        msg: 'ok',
        data: {
          article: result,
        },
      };
      return;
    }
    this.ctx.body = {
      status: 400,
      msg: 'find nothing',
    };

  }

  async update() {
    const { title, content, tags, updateTime, gid } = this.ctx.request.body;
    const targetArticle = await this.ctx.service.article.getByGid(gid);
    if (!targetArticle) {
      this.ctx.body = {
        status: 400,
        msg: 'article not found',
      };
      return;
    }

    const result = await this.ctx.service.article.update(gid, { title, content, tags, updateTime });
    if (result) {
      this.ctx.body = {
        status: 0,
        msg: 'ok',
      };
    }
  }


  async getAll() {
    const { authorName, gid } = this.ctx.request.query;
    let articles;
    if (gid) {
      articles = await this.ctx.service.article.getByGid(gid);

    } else if (authorName) {
      const uid = await this.ctx.service.user.getUid(authorName);
      if (!uid) {
        this.ctx.body = {
          status: 400,
          msg: 'user not found',
        };
        return;
      }
      articles = await this.ctx.service.article.getByUid(uid);
    } else {
      this.ctx.body = {
        status: 400,
        msg: 'query error',
      };
      return;
    }

    if (articles) {
      this.ctx.body = {
        status: 0,
        msg: 'ok',
        data: {
          article: [...articles.res],
        },
      };
      return;
    }
    this.ctx.body = {
      status: 400,
      msg: 'article not found',
    };
  }
}

module.exports = ArticleController;
