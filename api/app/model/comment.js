module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema(
    {
      uid: {
        type: String,
        required: true,
      },
      gid: {
        type: String,
        required: true,
      },
      content: {
        type: String,
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

  return mongoose.model("Comment", CommentSchema);
};
