'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users', 'avatar', Sequelize.TEXT('long'));
    await queryInterface.addColumn('users', 'phone', Sequelize.STRING(20));
    await queryInterface.addColumn('users', 'sign', Sequelize.STRING(300));
    await queryInterface.addColumn('users', 'email', Sequelize.STRING(255));
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'avatar');
    await queryInterface.removeColumn('users', 'phone');
    await queryInterface.removeColumn('users', 'sign');
    await queryInterface.removeColumn('users', 'email');
  }
};
