module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema(
    {
      authorId: {
        type: Number,
        required: true,
      },
      gid: {
        type: Number,
        required: true,
      },
      content: {
        type: String,
        required: false,
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

  return mongoose.model("Comment", CommentSchema);
};
