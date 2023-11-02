var request = require("supertest");
var assert = require('assert') 
var base_url = "http://127.0.0.1:8100"
//-------------------------------------------------------
// Test the function  of check-In
//-------------------------------------------------------
describe("Test the function of Check-In ", function() {
// Test with correct data ==> must return the status 200

it("Must return  201 if the data is correct (The employee ID exixts)", function(done) {
    var validEmployee = {
        employeeId:"16989081380221007",
        comment: "I have today a meeting with the development team."
    };
    var jsonPayload1 = JSON.parse(JSON.stringify(validEmployee));
     // Create asset
     request(base_url)
     .post('/check-in')
     .send(jsonPayload1)
     .expect(201)        
     .end(function(err, result) {
        try{
            assert.equal(result.body.idEmployee, "16989081380221007", `Must be 16989081380221007`);
        }
        catch{    
            return done(err);
        }
        return done();
    });
},);
it("Must return  400 if the data is incorrect (The employee ID doesn't exixt)", function(done) {
    // Test with an invalid Id employee
var invalidEmployee = {
    employeeId:"16988032338865831",
    comment: "I have today a meeting with the development team."
};
var jsonPayload2 = JSON.parse(JSON.stringify(invalidEmployee));
 // Create asset
 request(base_url)
 .post('/check-in')
 .send(jsonPayload2)
 .expect(400)        
 .end(function(err, result) {
    try{
        assert.equal(result.body.message, "No employee correponds to the ID provided in the request.", `Must be No employee correponds to the ID provided`);
    }
    catch{    
        return done(err);
    }
    return done();
});
});
it("Must return  400 if the data is the check-In is already performed", function(done) {
    // Test with an invalid Id employee
var invalidEmployee = {
    employeeId:"16988032338865832",
    comment: "I have today a meeting with the development team."
};
var jsonPayload2 = JSON.parse(JSON.stringify(invalidEmployee));
 // Create asset
 request(base_url)
 .post('/check-in')
 .send(jsonPayload2)
 .expect(400)        
 .end(function(err, result) {
    try{
        assert.equal(result.body.message, "Check-in already performed today.", `Check-in already performed today.`);
    }
    catch{    
        return done(err);
    }
    return done();
});
});


},);

