"use strict";
const BaseController = require("./base");
class CommentCategaryController extends BaseController {
  async index() {
    const { ctx } = this;
    const result = await ctx.service.comment.getComment();
    this.success(result)
  }
  async create() {
    const { ctx } = this;
    const result = await ctx.service.comment.createComment(ctx.params());
    ctx.body = {
      msg: "SUCCESS",
      result,
    };
  }
}

module.exports = CommentCategaryController;
