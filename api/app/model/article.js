module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema(
    {
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
      // 将更新时间和创建时间存为 unix 时间戳
      createdAt: Number,
      updatedAt: Number,
    },
    {
      timestamps: {
        currentTime: () => Date.now(),
      },
    }
  );

  return mongoose.model("Article", ArticleSchema);
};
