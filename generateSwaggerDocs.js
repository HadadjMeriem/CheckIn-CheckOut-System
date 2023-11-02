const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');

const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'CheckIn-CheckOut API',
        version: '1.0.0',
        description: 'API documentation',
      },
      basePath: '/',
    },
    apis: ['./routes/*.js'], // Path to the API routes
  };
// Generate the Swagger JSON file
const swaggerSpec = swaggerJsdoc(options);
fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger documentation generated successfully.');