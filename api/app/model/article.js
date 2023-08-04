module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema({
    authorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    tags: {
      type: Array,
      required: true,
    },
    createTime: {
      type: Number,
      required: true,
    },
    updateTime: {
      type: Number,
      required: false,
    },
  });

  return mongoose.model('Article', ArticleSchema);
};
