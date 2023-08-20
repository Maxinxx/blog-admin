"use strict";

const { Controller } = require("egg");

class CommentController extends Controller {
  async create() {
    const comment = this.ctx.request.body;
    const { _id: uid } = this.ctx.state.user;
    const commentId = await this.ctx.service.comment.create({
      ...comment,
      uid,
    });
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
