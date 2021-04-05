'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('classes', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(20),
      create_by: {
        type: STRING,
      },
      title: STRING(50),
      subTitle: {
        type: STRING(100),
        comment: "副标题"
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('classes');
  },
};
