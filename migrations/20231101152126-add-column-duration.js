'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the column duration
   
    await queryInterface.addColumn('Schedules', 'duration', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust this as needed
    });

  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('Schedules', 'duration');

  },
};