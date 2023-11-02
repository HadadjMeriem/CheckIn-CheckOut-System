const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Your Swagger configuration file
const db = require("./models");
db.sequelize.sync();
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// simple route
require('./routes/gestionEmployee.routes')(app);
require('./routes/gestionSchedule.routes')(app);
const initRoutes = require("./routes/gestionEmployee.routes");
global.__basedir = __dirname;
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
// set port, listen for requests
const PORT = process.env.PORT || 8100;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, () => {
    console.log(`Your database ${db.Schedule}.`);
    console.log(`Server is running on port ${PORT}.`);
});