const Service = require('egg').Service;

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

  async search(value) {
    const res = await this.ctx.model.Article.find(value);
    return {
      res,
    };
  }

  async getByUid(value) {
    const res = await this.ctx.model.Article.find({ authorId: value });
    return {
      res,
    };
  }

  async getByGid(gid) {
    const res = await this.ctx.model.Article.find({ _id: gid });
    return {
      res,
    };
  }

  async update(gid, value) {
    const res = await this.ctx.model.Article.updateOne({ _id: gid }, { ...value }).exec()
      .then(result => {
        console.log(`success: ${result}`);
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
    return { res };
  }
}


module.exports = ArticleService;
