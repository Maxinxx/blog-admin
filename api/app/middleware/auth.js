module.exports = (options, app) => {
  return async function user(ctx, next) {
    const token = ctx.cookies.get("token");
    try {
      // 解码token
      const userInfo = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      ctx.state.user = userInfo;
      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        message: "token 失效或解析错误",
      };
      return;
    }
  };
};
