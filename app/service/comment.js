const BaseService = require("./base");

class commentService extends BaseService {
  async createComment(params) {
    return this.run(async () => {
      const { ctx } = this;
      //   const { name } = params;
      const result = await ctx.model.Comment.create({
        userId: ctx.userId,
        content: params.content,
        courseId: params.courseId,
        score: params.score,
      });
      return result;
    });
  }
  async getSpecifyCategory(name) {
    return this.run(async () => {
      const { ctx } = this;
      return await ctx.model.CourseCategory.findOne({
        where: {
          name: name,
        },
      });
    });
  }
  async getCategory(params) {
    return this.run(async () => {
      const { ctx, app } = this;
      return await ctx.model.CourseCategory.findAll({
        include: [
          {
            model: app.model.Imgs,
          },
          {
            model: app.model.Course,
          },
        ],
      });
    });
  }
}

module.exports = commentService;
