/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1615823076405_6343";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: 'matt',
    redisExpire: 60 * 60 * 24
  };
  config.jwt = {
    secret: 'matt'
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.mysql = {
    client: {
      // host
      host: "139.186.132.230",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "matt123",
      // 数据库名
      database: "travel",
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '139.186.132.230',
    port: '3306',
    user: 'root',
    password: 'matt123',
    database: 'travel',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
    }
  };
  config.redis = {
    client: {
      port: 6379,
      host: '139.186.132.230',
      db: 0,
      password: '123456'
    }
  }
  config.multipart = {
    mode: 'stream',
  }

  return {
    ...config,
    ...userConfig,
  };
};
