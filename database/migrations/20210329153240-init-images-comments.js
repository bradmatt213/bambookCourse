'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('imgs', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      url: STRING(500),
      classId: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('comments', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: INTEGER,
      classId: INTEGER,
      created_at: DATE,
      msg: STRING(500),
      updated_at: DATE,
    });
    await queryInterface.addColumn('classes', 'content', Sequelize.TEXT('long'));
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('imgs');
    await queryInterface.dropTable('comments');
    await queryInterface.removeColumn('classes', 'content');

  },
};
