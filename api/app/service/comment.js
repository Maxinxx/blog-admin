const Service = require("egg").Service;

class CommentService extends Service {
  async create(comment) {
    const { id } = await this.ctx.model.Comment.create(comment);
    return id;
  }

  async delete(id) {
    await this.ctx.model.Comment.remove({ _id: id });
  }

  async search(query) {
    const filter = {
      ...(query.content ? { content: { $regex: query.content } } : {}),
      ...(query.gid ? { gid: query.gid } : {}),
      ...(query.uid ? { uid: query.uid } : {}),
    };
    const res = await this.ctx.model.Comment.find(filter).lean();
    return res;
  }
}

module.exports = CommentService;
