'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/hello', controller.home.hello);

  // 用户相关接口
  // 注册
  router.post('/signUp', controller.user.signUp);
  // 登陆
  router.post('/signIn', controller.user.signIn);

  // 文章相关接口
  router.get('/article', controller.article.getAll);
  router.post('/article', controller.article.postArticle);
  router.post('/article/search', controller.article.search);
  router.post('/article/update', controller.article.update);
  router.post('/article/delete', controller.article.delete);


  // 评论相关接口
};
