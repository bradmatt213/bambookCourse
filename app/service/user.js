const BaseService = require("./base");
const md5 = require("md5");

class userServices extends BaseService {
  async add(params) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    });
  }
  async getUser(pwd, rest) {
    return this.run(async () => {
      const { ctx, app } = this;
      const _where = pwd
        ? { ...rest, pwd: md5(pwd + app.config.salt) }
        : { ...rest };
      const result = await ctx.model.User.findOne({
        where: _where,
      });

      return result;
    });
  }
  async getComment(userId) {
    return this.run(async () => {
      const { ctx, app } = this;
      const result = await ctx.model.User.findByPk(userId, {
        include: [
          {
            model: app.model.Comment,
          },
        ],
        attributes: ["name"],
      });
      return result;
    });
  }
  async saveSource(userId, courseId) {
    return this.run(async () => {
      const { ctx, app } = this;
      const user = await ctx.model.User.findByPk(userId);
      const course = await ctx.model.Course.findByPk(courseId);
      const isSaved = await user.hasCourse(course);
      if (!isSaved) {
        await user.addCourse(course, { through: { saved: true } });
      } else {
        await user.removeCourse(course, { through: { saved: false } });
      }

      return await user.getCourses();
    });
  }
}

module.exports = userServices;
