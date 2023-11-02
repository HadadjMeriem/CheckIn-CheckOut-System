const db=require("../models")
const sequelize = require("sequelize");
const { format, parseISO } = require('date-fns');
const Employee = db.Employee;
// create function that allows the insertion of a new employee in the database 
// req is the request body from the client and res is the response from the server
exports.create = (req, res) => {
    // If both last name and first name exist in the database we display that an employee with these credentials already exist in the database
    Employee.count({ where: { lastName: req.body.lastName , firstName : req.body.firstName} })
   .then(count => {
    if (count != 0) {
        return res.status(402).send({ message:"This Employee exists in the database."});

    }
    // If the last name or the first name doesn t exist 
 else{
    // we have to generate a unique ID for the employee in string format we use for that the timestamp with a random number
    const timestamp = new Date().getTime(); // Get the current timestamp
    const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number
    // Combine the timestamp and random number to create a unique ID
    const uniqueID = `${timestamp}${randomNumber}`;
    // the instance is created with the attributes specified in the request
    Employee.create({
                id:uniqueID,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                dateCreated: sequelize.literal('CURRENT_TIMESTAMP'),
                department:req.body.department

            }).then(
                employee => {
                    // In case of success the status returned in the response is 200 with the instance created 
                    res.status(200).send(employee);
                }
            )

        } 
    }
    
).catch(err => {
    res.status(500).send({ message: err.message })
});
};

// The function to get all the employees from the database

exports.getAll= (req,res) => {
    Employee.findAll(

    )
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message })
    });
}

// Get the employees based on the date of creation 
exports.getEmployeesByDate = (req, res) => {
     
    const requestedDate = req.body.date; 
    Employee.findAll({
      
      where: {
        // convert the date of creation from timestamp format to DATE format
        dateCreated:sequelize.literal(`DATE("Employee"."dateCreated") = '${requestedDate}'`)
     
      }
     }).then((employees) => {
        if (employees.length==0){
            // No employee found
            return res.status(400).send({ message:"No employee was created at this date."});
        }
        else {
            // return the list of employees
            res.send(employees);
        }
     
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
      });
 }
