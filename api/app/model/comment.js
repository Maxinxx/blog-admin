module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema({
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
    time: {
      type: Date,
      required: true,
    },
  });

  return mongoose.model('Comment', CommentSchema);
};
