const BaseService = require("./base");

class imgService extends BaseService {
  async insertImg({ filename, url }) {
    return this.run(async () => {
      const { ctx, app } = this;
      const result = await ctx.model.Imgs.create({
        url,
        filename: filename,
      });
      return result;
    });
  }
  async getImages(params) {
    return this.run(async () => {
      const { ctx, app } = this;
      if (params && params.imagesIds) {
        return await ctx.model.Imgs.findAll({
          where: {
            id: [...params.imagesIds],
          },
        });
      }
      return await ctx.model.Imgs.findAll();
    });
  }
}

module.exports = imgService;
