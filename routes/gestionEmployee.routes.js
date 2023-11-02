const controller=require("../controllers/Employee.controllers")
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
 /**
   * @swagger
   * /api/endpoint:
   *   post:
   *     summary: Create a new employee
   *     description: create a new employee and return the employee details
   *     requestBody:
   *        content:
   *          application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 lastName:
   *                   type: string
   *                 firstName:
   *                   type: string
   *                 department:
   *                   type: string

   *     responses:
   *       200:
   *         description: Employee created successfully 
   *         content: 
   *            application/json:
   *               schema: 
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   firstName:
   *                     type: string
   *                   lastName:
   *                     type: string
   *                   department: 
   *                     type: string
   *                   dateCreated:
   *                     type: DATE
   *       402:
   *         description: Employee exists in the database.
  */
    app.post(
        "/employees",
        controller.create
    )
  /**
   * @swagger
   * /api/endpoint:
   *   post:
   *    summary: fetch a user
   *    description: get a list of employees based on the creation date
   *    requestBody:
   *        content:
   *          application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 date:
   *                   type: string
   *    responses:
   *       200:
   *         description: Returns at least one employee.
   *       400:
   *         description: No employee was created at this date.
   */
    app.post("/employees/getByDate",
    controller.getEmployeesByDate)
    app.get("/", (req, res) => {
    res.json({ message: "Welcome to our Api." });
})
   app.get(  "/employees",
   controller.getAll)
  
;
}
