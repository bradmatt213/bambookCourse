const BaseService = require("./base");
class courseService extends BaseService {
  async getAllCourse() {
    return this.run(async () => {
      const { ctx, app } = this;
      const { currentPage, pageSize, searchKey } = ctx.params();
      const _where = {};
      const offset = (Number(currentPage) - 1) * Number(pageSize);
      console.log("#######", offset);

      const { lte, gte, like, or } = app.Sequelize.Op;
      if (searchKey) {
        _where[or] = {
          name: {
            [like]: `%${searchKey}%`,
          },
          title: {
            [like]: `%${searchKey}%`,
          },
          content: {
            [like]: `%${searchKey}%`,
          },
        };
      }

      const result = await ctx.model.Course.findAll({
        where: _where,
        limit: Number(pageSize),
        offset,
        order: [["createdAt", "ASC"]],
        include: [
          {
            model: app.model.Imgs,
            required: false,
          },
          {
            model: app.model.CourseCategory,
            attributes: ["name"],
          },
          {
            model: app.model.Comment,
            attributes: ["score"],
          },
        ],
      });
      return result;
    });
  }
  async addCourse(params) {
    return this.run(async () => {
      const { ctx } = this;

      const images = await ctx.service.img.getImages(
        params.imageIds.split(",")
      );
      const newClass = await ctx.model.Course.create({
        ...params,
      });

      await newClass.setImgs([...images]);

      return newClass;
    });
  }
  async checkSave(id) {
    return this.run(async () => {
      const { ctx } = this;
      const course = await ctx.model.Course.findByPk(id);
      const users = await course.getUsers();
      return users.find((user) => user.id === ctx.userId)?true:false;
    });
  }
  async getCourse(id) {
    return this.run(async () => {
      const { ctx, app } = this;
      const course = await ctx.model.Course.findByPk(id, {
        include: ["imgs"],
      });
      const comments = await course.getComments({
        include: ["user"],
      });

      return {
        course,
        comments,
      };
    });
  }

  async getCourseScore(id) {
    return this.run(async () => {
      const { ctx, app } = this;
      const course = await ctx.model.Course.findByPk(id);
      const comments = await course.getComments({
        raw: true,
      });
      const score =
        comments
          .map((e) => {
            return e.score;
          })
          .reduce((cur, acc) => cur + acc) / comments.length;
      return {
        score,
      };
    });
  }
}

module.exports = courseService;
