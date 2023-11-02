// The structure of a schedule table in the database
module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define("Schedule", {
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        } ,
        checkIn:{
            type: Sequelize.DATE
        },
        checkOut:{
            type: Sequelize.DATE
        },
        //A comment field is specified in the request parameters therefore I seperated the comments for Check In and Check Out
        checkInComment:{
        type:Sequelize.TEXT
        },
        checkOutComment:{
            type:Sequelize.TEXT
        },
        // The duration is saved during the Check Out
        duration:{
        type: Sequelize.STRING
        }

    });
    return Schedule;
};