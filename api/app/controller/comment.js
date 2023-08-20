"use strict";

const { Controller } = require("egg");

class CommentController extends Controller {
  async create() {
    const comment = this.ctx.request.body;
    const commentId = await this.ctx.service.comment.create(comment);
    this.ctx.body = {
      status: 0,
      msg: "ok",
      data: {
        id: commentId,
      },
    };
  }

  async delete() {
    const { _id } = this.ctx.request.body;
    await this.ctx.service.comment.delete(_id);
    this.ctx.body = {
      status: 0,
      msg: "ok",
    };
  }

  async search() {
    const query = this.ctx.request.body;
    const comments = await this.ctx.service.comment.search(query);
    this.ctx.body = {
      status: 0,
      msg: "ok",
      data: comments,
    };
  }
}

module.exports = CommentController;
