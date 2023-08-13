const Service = require("egg").Service;

class ArticleService extends Service {
  async create(article) {
    const { id } = await this.ctx.model.Article.create(article);
    return {
      id,
    };
  }

  async deleteByGid(gid) {
    const res = await this.ctx.model.Article.deleteOne({ _id: gid });
    return {
      res,
    };
  }

  async search(query) {
    const filter = {
      ...(query._id?.length > 0 ? { _id: { $in: query._id } } : {}),
      ...(query.title?.length > 0 ? { title: { $regex: query.title } } : {}),
      ...(query.tags?.length > 0 ? { tags: { $in: query.tags } } : {}),
    };
    const res = await this.ctx.model.Article.find(filter).lean();
    return res;
  }

  async getByUid(value) {
    const res = await this.ctx.model.Article.find({ authorId: value });
    return {
      res,
    };
  }

  async getByGid(gid) {
    const res = await this.ctx.model.Article.findOne({ _id: gid });
    return res;
  }

  async update(gid, value) {
    const res = await this.ctx.model.Article.updateOne(
      { _id: gid },
      { ...value }
    );
    return res;
  }
}

module.exports = ArticleService;
