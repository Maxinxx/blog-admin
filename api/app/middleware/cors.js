module.exports = () => {
  return async function cors(ctx, next) {
    // 允许来自任何来源的请求
    ctx.set('Access-Control-Allow-Origin', '*');

    // 允许的请求方法
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // 允许的请求头部字段
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

    // 允许携带身份凭证
    ctx.set('Access-Control-Allow-Credentials', 'true');

    // 预检请求的有效期，单位为秒
    ctx.set('Access-Control-Max-Age', '3600');

    // 如果是预检请求（OPTIONS），直接响应成功
    if (ctx.method === 'OPTIONS') {
      ctx.status = 200;
    } else {
      await next();
    }
  };
};
