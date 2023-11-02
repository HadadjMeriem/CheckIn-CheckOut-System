const db=require("../models")
const sequelize = require("sequelize");
const Employee = db.Employee;
const Schedule=db.Schedule;

// Perform the checkIn 
exports.checkIn=(req,res)=>{
    Employee.findOne({
        where: {
            id: req.body.employeeId
        }
    }).then(

       employee=>{
        if(!employee){
            res.status(400).send({ message: "No employee correponds to the ID provided in the request." })

        }
        else{
             Schedule.create({
                checkIn:sequelize.literal('CURRENT_TIMESTAMP'),
                idEmployee: req.body.employeeId,
                checkInComment: req.body.comment
             }          
             ).then(
                schedule => {
                    res.status(201).send(schedule);
                }
            )             
        }
       }

    ) .catch(err => {
        res.status(500).send({ message: err.message })
    });

}

// The checkOut function (it includes the calculation of the duration)
// For the checkout we have to fetch first for the latest schedule instance that corresponds the the IDEmployee and verify the the checkout field is NULL 
exports.checkOut=(req,res)=>{
    Schedule.findOne({
        where: {
            idEmployee:req.body.employeeId,checkOut: null
        },
        order: [['checkIn', 'DESC']], // Get the most recent check-in
       
    }).then(
        scheduleRecord=>{
            if(!scheduleRecord){
                res.status(400).send({ message: "No corresponding check-in found." })
            }
            else{
                // we must check that the check-in date found corresponds to the actual day 
                // get the current date
                const currentTime = new Date();
                let checkInTime=scheduleRecord.checkIn
                //convert the timeStamp to a date format
                checkInTime = new Date(checkInTime);
                if (  checkInTime.getFullYear() === currentTime.getFullYear() &&
                checkInTime.getMonth() === currentTime.getMonth() &&
                checkInTime.getDate() === currentTime.getDate()){
               // Calculate the duration in milliseconds
                const durationInMilliseconds = currentTime - checkInTime;
               // Convert the duration to hours, minutes, and seconds
               const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
               const minutes = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
               const seconds = Math.floor((durationInMilliseconds % (1000 * 60)) / 1000);
              // Create a formatted duration string
               const duration = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
               // update the Schedule instance based on its ID
               Schedule.update(
                {
                  checkOut:sequelize.literal('CURRENT_TIMESTAMP'),
                  duration: duration,
                  checkOutComment: req.body.comment,
                },
                { where: { id: scheduleRecord.id },returning: true}
              ).then(
                ([rowsUpdated, [updatedSchedule]])=>{
                    // return the new schedule instance
                    res.status(201).send(updatedSchedule)
                }
              )
               }
                else{
                    // The check-in recording found doesn't correpond to the actual day 
                    res.status(400).send({ message: "message: 'Check-out must be on the same day as check-in'" })
                }
            }
        }
    ).catch(err => {
        res.status(500).send({ message: err.message })
    });

}