"use strict";
const { params } = require("../extend/context");
const BaseController = require("./base");
class CourseController extends BaseController {
  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues),
    };
  }
  async createCourse() {
    const { ctx, app } = this;
    const parmas = ctx.params();
    const result = await ctx.service.course.addCourse({
      ...parmas,
    });
    if (result) {
      this.success(result);
    } else {
      this.error("新增失败");
    }
  }
  async isUserSaved() {
    const { ctx, app } = this;
    const parmas = ctx.params();
    const result = await ctx.service.course.checkSave(parmas.id);
    this.success(result);
  }
  async getAllCourse() {
    const { ctx, app } = this;
    const parmas = ctx.params();
    const result = await ctx.service.course.getAllCourse(parmas);
    if (result) {
      this.success(result);
    } else {
      this.error("查询失败");
    }
  }
  async getCourseDetail() {
    const { ctx, app } = this;
    const parmas = ctx.params();
    const result = await ctx.service.course.getCourse(parmas.id);
    if (result) {
      this.success(result);
    } else {
      this.error("查询失败");
    }
  }
  async getCourseComment() {
    const { ctx, app } = this;
    const parmas = ctx.params();
    const result = await ctx.service.course.getCourse(parmas.id);
    if (result) {
      this.success(result);
    } else {
      this.error("查询失败");
    }
  }
  // 获取课程评分
  async getCourseScore() {
    const { ctx, app } = this;
    const parmas = ctx.params();
    const result = await ctx.service.course.getCourseScore(parmas.id);
    if (result) {
      this.success(result);
    } else {
      this.error("查询失败");
    }
  }
}

module.exports = CourseController;
