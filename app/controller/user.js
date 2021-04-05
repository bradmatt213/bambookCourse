"use strict";

const Controller = require("egg").Controller;
const md5 = require("md5");
const dayjs = require("dayjs");
const BaseController = require("./base");

class UserController extends BaseController {
  async jwtSign({ id, name, email }) {
    const { ctx, app } = this;
    const token = app.jwt.sign(
      {
        id,
        name,
      },
      app.config.jwt.secret
    );
    // ctx.session[name] = 1;
    await app.redis.set(
      `${name}|${email}`,
      token,
      "EX",
      app.config.redisExpire
    );
    return token;
  }

  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, ["pwd"]),
    };
  }
  async register() {
    const { ctx, app } = this;
    const parmas = ctx.params();
    const searchParams = {
      email: parmas.email,
      name: parmas.name,
    };
    const user = await ctx.service.user.getUser(parmas.pwd, searchParams);

    if (user) {
      this.error("用户已经存在");
      return;
    }

    const result = await ctx.service.user.add({
      ...parmas,
      pwd: md5(parmas.pwd + app.config.salt),
      created_at: ctx.helper.time(),
    });
    if (result) {
      const token = await this.jwtSign({
        id: result.id,
        name: result.name,
        email: result.email,
      });
      this.success({
        ...this.parseResult(ctx, result),
        token,
      });
    } else {
      this.error("注册失败");
    }
  }

  async login() {
    const { ctx, app } = this;
    const { name, pwd } = ctx.params();

    const user = await ctx.service.user.getUser(pwd, { name });

    if (user) {
      const token = await this.jwtSign({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      this.success({
        ...this.parseResult(ctx, user),
        token,
      });
    } else {
      this.error("该用户不存在");
    }
  }
  async detail() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.name);

    if (user) {
      this.success({
        ...this.parseResult(ctx, user),
      });
    } else {
      this.error("该用户不存在");
    }
  }
  async logout() {
    const { ctx, app } = this;
    try {
      await app.redis.del(ctx.username);
      this.success("ok");
    } catch (error) {
      this.error("退出登录失败");
    }
  }

  async edit() {
    const { ctx } = this;
    const result = ctx.service.user.edit({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
      sign: ctx.helper.escape(ctx.params("sign")),
    });

    this.success(result);
  }
  async getUserComment() {
    const { ctx } = this;
    const result = await ctx.service.user.getComment(ctx.userId);

    ctx.body = {
      msg: "SUCCESS",
      result,
    };
  }
  async saveCourse() {
    const { ctx } = this;
    const params = ctx.params();
    const result = await ctx.service.user.saveSource(
      ctx.userId,
      params.courseId
    );

    this.success(result)
  }
}

module.exports = UserController;
