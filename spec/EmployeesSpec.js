var request = require("supertest");
var assert = require('assert') 
var base_url = "http://127.0.0.1:8100"
//-------------------------------------------------------
// Test the function of the creation of an employee
//-------------------------------------------------------
describe("Test the creation of an employee", function() {

// Test with correct data ==> must return the status 200

it("Must return  200 if the data is correct ( last name and first name are not already used in the database", function(done) {
    var validEmployee = {
        lastName: "HADADJ",
        firstName: "Zineb",
        department: "IT"
    };
    var jsonPayload1 = JSON.parse(JSON.stringify(validEmployee));
     // Create asset
     request(base_url)
     .post('/employees')
     .send(jsonPayload1)
     .expect(200)        
     .end(function(err, result) {
        try{
            assert.equal(result.body.lastName, "HADADJ", `Must be HADADJ`);
            assert.equal(result.body.firstName, "Zineb", `Must be ZINEB`);
            assert.equal(result.body.department, "IT", `Must be IT`);
        }
        catch{    
            return done(err);
        }
        return done();
    });
},);
// Test with an existant last name and first name ==> must return the status 402
it("Must return  402 if the data is incorrect ( last name and first name  are already used in the database", function(done) {
    var invalidEmployee = {
        lastName: "Hadadj",
        firstName: "Meriem",
        department: "IT"
    };
    var jsonPayload = JSON.parse(JSON.stringify(invalidEmployee));
    // Create asset
    request(base_url)
    .post('/employees')
    .send(jsonPayload)
    .expect(402)
    .expect((result) => {
        assert.equal(result.body.message, "This Employee exists in the database.", `This Employee exists in the database.`);
    })
    .end(function(err) {
        if (err) return done(err);
        return done();
    });     
  
},);
})

describe("Test the function of fetching employees per date of creation",function(){
    it("Must return 200 and the list of employees if there is at least one employee created at the date provided in the request ", function(done) {
        var date = {
            date:"2023-11-01"
        };
        var jsonPayload3 = JSON.parse(JSON.stringify(date));
         // Define the expected data
         const expectedData = [
         {
          id: '16988032338865832',
          lastName: 'Hadadj',
          firstName: 'Meriem',
          dateCreated: '2023-11-01T01:47:13.965Z',
          department: 'IT',
          createdAt: '2023-11-01T01:47:13.891Z',
          updatedAt: '2023-11-01T01:47:13.891Z',
         },
        ];
         // Create asset
         request(base_url)
         .post('/employees/getByDate')
         .send(jsonPayload3)
         .expect(200)        
         .end(function(err, result) {
            try{
                expect(result.body).toEqual(expectedData);
            }
            catch{    
                return done(err);
            }
            return done();
        });
    },);
    it("Must return 400 if there is no employee created at the date provided in the request ", function(done) {
        var date = {
            date:"2023-11-03"
        };
        var jsonPayload4 = JSON.parse(JSON.stringify(date));
        
         // Create asset
         request(base_url)
         .post('/employees/getByDate')
         .send(jsonPayload4)
         .expect(400)        
         .end(function(err, result) {
            try{
             assert.equal(result.body.message, "No employee was created at this date.", `No employee was created at this date.`);
            }
            catch{    
                return done(err);
            }
            return done();
        });
    },);
})