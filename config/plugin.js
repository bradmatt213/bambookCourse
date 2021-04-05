"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  sequelize: {
    enbale: "true",
    package: "egg-sequelize",
  },
  mysql: {
    enable: true,
    package: "egg-mysql",
  },
  redis: {
    enable: true,
    package: "egg-redis",
  },
  jwt: {
    enbale: true,
    package: "egg-jwt",
  },
  routerPlus: {
    enable: true,
    package: "egg-router-plus",
  },
};
