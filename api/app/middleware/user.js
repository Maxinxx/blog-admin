module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    console.log(111);
    await next();
  };
};
