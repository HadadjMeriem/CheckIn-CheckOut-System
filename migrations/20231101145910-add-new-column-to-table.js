'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the column checkInComment
    await queryInterface.addColumn('Schedules', 'checkInComment', {
      type: Sequelize.TEXT,
      allowNull: true, // Adjust this as needed
    });
    await queryInterface.addColumn('Schedules', 'checkOutComment', {
      type: Sequelize.TEXT,
      allowNull: true, // Adjust this as needed
    });
    await queryInterface.addColumn('Schedules', 'duration', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust this as needed
    });

    // Remove an existing column
    await queryInterface.removeColumn('Schedules', 'comment');
  },

  down: async (queryInterface, Sequelize) => {
    // In the "down" method, you should reverse the changes
    // Remove the new column added in "up"
    await queryInterface.removeColumn('Schedules', 'checkInComment');
    await queryInterface.removeColumn('Schedules', 'checkOutComment');
    await queryInterface.removeColumn('Schedules', 'duration');


    // Add back the dropped column
    await queryInterface.addColumn('Schedules', 'comment', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust this as needed
    });
  },
};