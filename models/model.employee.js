// The structure of an employee table in the database
module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("Employee", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        dateCreated: {
            type: Sequelize.DATE
        },
       department: {
          type: Sequelize.STRING
       }
    });
    return Employee;
};