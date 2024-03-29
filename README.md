# CheckIn-CheckOut-System
# Check-In and Check-Out Node.js MVC Project

Welcome to the Check-In and Check-Out Node.js MVC project. This application allows you to manage employee of the ABC School check-ins and check-outs efficiently.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Documentation](#documentation)
- [Testing](#testing)


## Project Overview
The purpose of this project is to create a RESTful API using Node.js to efficiently manage employees at ABC School. The project adheres to the MVC (Model-View-Controller) architecture for structured development. PostgreSQL is the chosen database technology. 

## Features

- Create a new employee.
- Fetch employees from the database based on specified conditions.
- Manage employee schedules by assuring check-in and check-out actions.
- Calculate the duration between check-in and check-out events.
- The project is thoroughly tested using Jasmine for unit tests, ensuring the reliability of the codebase.
- The API's endpoints are documented using Swagger to provide clear and comprehensive documentation for users and developers. 

## Prerequisites
        "cors": "^2.8.5",
        "date-fns": "^2.30.0",
        "express": "^4.18.1",
        "jsonwebtoken": "^8.5.1",
        "mysql2": "^3.6.2",
        "pg": "^8.7.3",
        "sequelize": "^6.19.0",
        "supertest": "^6.3.3",
        "swagger-jsdoc": "^6.2.8",
        "swagger-ui-express": "^5.0.0"
    
        "jasmine": "^5.1.0",
        "jasmine-node": "^3.0.0"
## Technologies

The project is built using the following technologies:

- Node.js: Backend development platform.
- Express.js: Web application framework for Node.js.
- PostgreSQL: Database technology for storing employee and schedule data.
- Sequelize: An Object-Relational Mapping (ORM) for Node.js, used for interacting with the database.
- Swagger: Used for API documentation.
- Docker: Containerization for easier deployment.
- Jasmine: Testing framework for unit tests.

## Getting Started

to run the development server : npm run start. 

## Project Structure

The project follows the MVC (Model-View-Controller) architecture for organizing code. Here's a high-level overview of the project structure:
- config: Configuration settings for the database and other modules.
- controllers: Controllers for handling API endpoints.
- models: Database models defined using Sequelize.
- routes: Route definitions for the API.
- spec: Unit tests using Jasmine.
- swagger.json: Swagger API documentation.
- app.js: Main application file.
- migrations: To manage changes to the database schema over time.

## API Endpoints
The API exposes the following endpoints:

- `POST /employees`: Create a new employee.
- `POST /employees/getByDate`: Fetch employees based on the date.
- `POST /check-in`: Record employee check-in time.
- `POST /check-out`: Record employee check-out time.
## Database
The database contains two main tables: 
1. **Employee Table:**

   The Employee table stores information about each employee in the system. It contains the following fields:

   - `id`: A unique identifier for each employee.
   - `lastName`: The last name of the employee.
   - `firstName`: The first name of the employee.
   - `dateCreated`: The date when the employee record was created.
   - `department`: The department to which the employee belongs.

2. **Schedule Table:**

   The Schedule table records the check-in and check-out times for each employee. It also includes the comment and duration information for each check-in/check-out event. It contains the following fields:

   - `id`: A unique identifier for each schedule record.
   - `idEmployee`: A foreign key to employee.
   - `checkIn`: The timestamp when the employee checked in.
   - `checkOut`: The timestamp when the employee checked out.
   - `checkInComment`: Any additional comments related to the check-in.
   - `checkOutComment`: Any additional comments related to the check-out.
   - `duration`: The duration between check-in and check-out.

These tables are interconnected. The database, managed by PostgreSQL and hosted on Render.

## Documentation
The API is documented using Swagger, which provides detailed information on available endpoints, request/response schemas.

## Testing
Ensuring the reliability and accuracy of the Check-In/Check-Out API is a top priority. This project includes a comprehensive suite of unit tests built using Jasmine, a popular testing framework for Node.js applications. The tests are avaialable in the spec folder.


# Start the server
npm start
