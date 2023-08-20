module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      age: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      avatar: String,
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

  return mongoose.model("User", UserSchema);
};
