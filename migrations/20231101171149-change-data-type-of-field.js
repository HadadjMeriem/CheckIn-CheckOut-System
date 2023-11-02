module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Schedules', 'checkIn', {
      type: Sequelize.DATE, // Replace with the new data type
    });
    await queryInterface.changeColumn('Schedules', 'checkOut', {
      type: Sequelize.DATE, // Replace with the new data type
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Define the reverse operation here (e.g., change it back to the old data type)
    await queryInterface.changeColumn('Schedules', 'checkIn', {
      type: Sequelize.DATE, // Replace with the new data type
    });
    await queryInterface.changeColumn('Schedules', 'checkOut', {
      type: Sequelize.DATE, // Replace with the new data type
    });
  },
};