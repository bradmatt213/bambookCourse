"use strict";
const BaseController = require("./base");
class CourseCategaryController extends BaseController {
  async index() {
    const { ctx } = this;
    const result = await ctx.service.courseCategory.getCategory();
    ctx.body = {
      msg: "SUCCESS",
      data: result,
    };
  }
  async create() {
    const { ctx } = this;
    const result = await ctx.service.courseCategory.createCategory({
      ...ctx.params(),
    });
    ctx.body = {
      msg: "SUCCESS",
      result,
    };
  }
  async show() {
    const { ctx } = this;
    const result = await ctx.service.courseCategory.showUserSelectCategory(ctx.params.id);
    this.success(result);
  }
}

module.exports = CourseCategaryController;
