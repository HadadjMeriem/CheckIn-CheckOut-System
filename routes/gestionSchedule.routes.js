const controller=require("../controllers/Schedule.controllers")
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
   *     description: perform the checkIn operation
   *     responses:
  *       200:
  *         description: Success
  *       400:
  *         description: Bad request ( if the EmployeeId doesn't exist).
  */
    app.post(
        "/check-in",
        controller.checkIn
    )
        /**
   * @swagger
   * /api/endpoint:
   *   post:
   *     description: perform the checkOut operation
   *     responses:
  *       200:
  *         description: Success
  *       400:
  *         description: Bad request ( if there is no correspond checkIn in the same day.)
  */
    app.post(
        "/check-out",
        controller.checkOut
    )
;
}
