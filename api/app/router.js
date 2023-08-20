"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.prefix("/api");

  // 用户相关接口
  router.post("/signUp", controller.user.signUp);
  router.post("/signIn", controller.user.signIn);
  router.post("/userInfo", controller.user.userInfo);
  router.post("/user/search", controller.user.search);
  router.post("/user/detail", controller.user.detail);

  // 文章相关接口
  router.post("/article/create", controller.article.create);
  router.post("/article/search", controller.article.search);
  router.post("/article/update", controller.article.update);
  router.post("/article/delete", controller.article.delete);
  router.post("/article/detail", controller.article.detail);

  // 评论相关接口
  router.post("/comment/create", controller.comment.create);
  router.post("/comment/search", controller.comment.search);
  router.post("/comment/delete", controller.comment.delete);
};
