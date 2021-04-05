const await = require("await-stream-ready/lib/await");
const BaseService = require("./base");

class courseService extends BaseService {
  async createCategory(params) {
    return this.run(async () => {
      const { ctx } = this;
      const { name } = params;
      console.log("--------", name);
      const result = await this.getSpecifyCategory(name);
      if (result) {
        return "该栏目已存在";
      }
      return await ctx.model.CourseCategory.create({
        ...params,
      });
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
  async showUserSelectCategory(id) {
    return this.run(async () => {
      const { ctx, app } = this;
      return await ctx.model.CourseCategory.findByPk(id, {
        include: [
          {
            model: app.model.Course,
          },
          {
            model: app.model.Imgs,
          },
        ],
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

module.exports = courseService;
