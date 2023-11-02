const Sequelize = require("sequelize");
var sequelize
//PostgreSQL database URL
const databaseUrl = 'postgres://employee_9em1_user:RNgmDPp66YqFBmhChCu3ondAfh53jpJ2@dpg-cl0l9c3jdq6s738cf5pg-a.oregon-postgres.render.com/employee_9em1';
sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    protocol: "postgres",
    //native: true,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Employee = require("./model.employee.js")(sequelize, Sequelize);
db.Schedule = require("./model.schedule.js")(sequelize, Sequelize);
// Association Schecule - idEmployee
db.Employee.hasOne(db.Schedule, { foreignKey: 'idEmployee' });
db.Schedule.belongsTo(db.Employee, { foreignKey: 'idEmployee' });
module.exports = db;