module.exports = (options, app) => {
  return async function error(ctx, next) {
    try {
      await next();
    } catch (error) {
      console.error(error);
      ctx.body = {
        status: 500,
        msg: '服务器错误',
        error,
      };
    }
  };
};
