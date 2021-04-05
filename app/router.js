"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  const { comment } = controller;
  const apiV1Router = app.router.namespace("/api/v1");
  const jwt = app.middleware.jwt(app.config.jwt);
  router.get("/", controller.home.index);
  // 用户相关
  router.post("/api/user/register", controller.user.register);
  router.post("/api/user/login", controller.user.login);
  router.get("/api/user/getUserComment", controller.user.getUserComment);
  router.post("/api/user/saveCourse", controller.user.saveCourse);
  // 课程相关
  router.post("/api/course/createCourse", jwt, controller.course.createCourse);
  // 用户是否收藏了课程
  router.get("/api/course/isUserSaved", jwt, controller.course.isUserSaved);
  router.get("/api/course/getAllCourse", controller.course.getAllCourse);
  router.get("/api/course/getCourseDetail", controller.course.getCourseDetail);
  router.get(
    "/api/course/getCourseComment",
    controller.course.getCourseComment
  );
  router.get("/api/course/getCourseScore", controller.course.getCourseScore);
  router.post("/api/img/upload", controller.imgs.upload);
  router.get("/api/img/getall", controller.imgs.getAll);
  router.resources(
    "courseCategory",
    "/api/courseCategory",
    controller.courseCategory
  );
  // 用户评论
  apiV1Router.post("/comment", jwt, comment.create);
  apiV1Router.get("/comment", comment.index);
};
