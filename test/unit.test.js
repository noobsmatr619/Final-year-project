const expect = require('chai').expect;
var chai = require("chai");
var chaiHttp = require("chai-http");
var mongoose = require("mongoose");
var server = require('./server.test');
var testData = require('./test-data');
require('dotenv').config();

// Mongo Models/Collections
const testUser = require("../Models/User");
const testChat = require("./../models/Chat"); //gives error
const testMachine = require("../Models/Machine");
const testMessage = require("../Models/Message");
const testOrder = require("../Models/Order");
const testProduct = require("../Models/Product");
const testRawMaterial = require("../Models/RawMaterial");
const testTeam= require("../Models/Team");
const testProductMachine = require("../Models/ProductMachine");
const testSalary = require("../Models/Salary");
const testTask = require("../Models/Task");
const testTeamMembers = require("../Models/TeamMembers");




// // Starting Unit test for database
// console.log("Starting Unit Tests")
// describe('Mongo DB Collection tests', () => {
//     before(async () => {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//         });
//         const con = mongoose.connection;
//     });

//     describe('Test User', () => {
//         // User collection test cases
//         it('User saved to database', (done) => {
//             let user = new testUser({
//                 email: 'mytestuser@gmail.com',
//                 password: '123456789',
//                 actualName: 'Test User',
//                 cart: [],
//                 admin: false,
//                 wishlist: [],
//                 orderhistory: [],
//                 resettoken: '',
//                 expiretoken: new Date()
//             });
//             user.save((err, user) => {
//                 if (err) {
//                     throw new Error('User not created');
//                 }
//                 else {
//                     done();
//                 }
//             });
//         });

//         it('Don\'t save User with duplicate email', (done) => {
//             let user = new testUser({
//                 email: 'mytestuser@gmail.com',
//                 password: '123456789',
//                 actualName: 'Test User',
//                 cart: [],
//                 admin: false,
//                 wishlist: [],
//                 orderhistory: [],
//                 resettoken: '',
//                 expiretoken: new Date()
//             });
//             user.save((err, user) => {
//                 if (err) {
//                     return done();
//                 }
//                 if (user) {
//                     throw new Error('Email Duplicated');
//                 }
//             })
//         });

//         it('Get User by email', (done) => {
//             testUser.findOne({ email: 'mytestuser@gmail.com' }, (err, user) => {
//                 if (err) {
//                     throw err;
//                 }
//                 else if (!user) {
//                     throw new Error('User not found');
//                 }
//                 else {
//                     done();
//                 }
//             });
//         });

//         it('Create User with small password', (done) => {
//             let user = new testUser({
//                 email: 'mytestuser1@gmail.com',
//                 password: '123456',
//                 actualName: 'Test User',
//                 cart: [],
//                 admin: false,
//                 wishlist: [],
//                 orderhistory: [],
//                 resettoken: '',
//                 expiretoken: new Date()
//             });
//             user.save(err => {
//                 if (err) {
//                     done();
//                 }
//                 else {
//                     throw new Error('User Password weak');
//                 }
//             })
//         });

//         it('Try create user with wrong data type', (done) => {
//             let user = new testUser({
//                 email: 'mytestuser1@gmail.com',
//                 password: '123456',
//                 actualName: 'Test User',
//                 cart: [],
//                 admin: 'false',
//                 wishlist: [],
//                 orderhistory: [],
//                 resettoken: '',
//                 expiretoken: new Date()
//             });
//             user.save(err => {
//                 if (err) {
//                     return done();
//                 }
//                 else {
//                     throw new Error('User Password weak');
//                 }
//             })
//         });
//     });

//     it('Try creating chat for user', (done) => {
//         let chat = new testChat({});
//         chat.save(err => {
//             if (err) {
//                 throw new Error('Chat not created');
//             }
//             else {
//                 done();
//             }
//         });
//     });


//     after((done) => {
//         testUser.findOneAndRemove({ email: 'mytestuser@gmail.com' }, (err, user) => {
//             if (err) {
//                 throw new Error('User not deleted');
//             }
//             else {
//                 done();
//             }
//         })
//     });
// });


// // Starting integeration Test
// console.log("Starting integeration Test")
// chai.should();

// chai.use(chaiHttp);


// describe('Routes Testing', () => {

//     describe('Testing', () => {
//         it('it should create a new user', (done) => {
//             chai.request(server)
//                 .post('/api/user/signup')
//                 .set('Content-Type', 'application/json')
//                 .send(testData.createNewUser)
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     done();
//                 })

//         }).timeout(10000);

//         it('it should login the  user', (done) => {
//             chai.request(server)
//                 .post('/api/user/login')
//                 .set('Content-Type', 'application/json')
//                 .send(testData.createNewUser)
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     done();
//                 })

//         }).timeout(10000);


//         describe('Add an admin', () => {
//             it('it should add an admin', (done) => {
//                 chai.request(server)
//                     .post('/api/admin/addadmin')
//                     .set('Content-Type', 'application/json')

//                     .send(testData.addAdmin)
//                     .end((err, response) => {
//                         response.should.have.status(200);
//                         done();
//                     })

//             }).timeout(10000);

//         });
//         describe('login an admin', () => {
//             it('it should login', (done) => {
//                 chai.request(server)
//                     .post('/api/admin/login')
//                     .set('Content-Type', 'application/json')

//                     .send(testData.addAdmin)
//                     .end((err, response) => {
//                         // console.log(response);
//                         response.should.have.status(200);
//                         done();
//                     })

//             }).timeout(10000);

//         });
//         describe('it should get admin information', () => {
//             it('get admin information sucessfullt', (done) => {
//                 chai.request(server)
//                     .get('/api/admin/')
//                     .set('Content-Type', 'application/json')
//                     .set('x-auth-token', testData.AdminToken)
//                     .end((err, response) => {
//                         response.should.have.status(200);
//                         done();
//                     })

//             }).timeout(10000);

//         });


//         describe('it should get the product list', () => {
//             it('list all products sucessfully', (done) => {
//                 chai.request(server)
//                     .get('/api/product/')
//                     .set('Content-Type', 'application/json')
//                     .end((err, response) => {
//                         expect(response.body).to.be.an('Array');
//                         done();
//                     })

//             }).timeout(10000);

//         });
//         describe('list all users', () => {
//             it('it should get the list of users', (done) => {
//                 chai.request(server)
//                     .get(`/api/user/all`)
//                     .set('Content-Type', 'application/json')
//                     .set('x-auth-token', testData.AdminToken)
//                     .end((err, response) => {
//                         expect(response.body).to.be.an('Array')
//                         done();
//                     });
//             }).timeout(10000);

//         });

//         describe('Get all Blogs', () => {
//             it('it should list of all blog', (done) => {
//                 chai.request(server)
//                     .get(`/api/blog/`)
//                     .set('Content-Type', 'application/json')
//                     .end((err, response) => {
//                         expect(response.body).to.be.an('Array');
//                         done();
//                     });
//             }).timeout(10000);

//         });
//         it('user deletion without authorization', (done) => {
//             chai.request(server)
//                 .delete('/api/user/delete')
//                 .set('Content-Type', 'application/json')
//                 .send({ email: testData.createNewUser.email })
//                 .end((err, response) => {
//                     response.should.have.status(401);
//                     done();
//                 });
//         }).timeout(10000);


//         it('user deletion with authorization', (done) => {
//             chai.request(server)
//                 .delete('/api/user/delete')
//                 .set('Content-Type', 'application/json')
//                 .set('x-auth-token', testData.Token)
//                 .send({ email: testData.createNewUser.email })
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     done();
//                 })

//         }).timeout(10000);


//         it('Admin deletion with authorization', (done) => {
//             chai.request(server)
//                 .delete('/api/user/delete')
//                 .set('Content-Type', 'application/json')
//                 .set('x-auth-token', testData.Token)
//                 .send({ email: testData.addAdmin.email })
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     done();
//                 })

//         }).timeout(10000);

//         it('Unexisting user email deletion', (done) => {
//             chai.request(server)
//                 .delete('/api/user/delete')
//                 .set('Content-Type', 'application/json')
//                 .set('x-auth-token', testData.Token)
//                 .send({ email: 'randomemailtest22@test.com' })
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     done();
//                 })

//         }).timeout(10000);

//     });

//     describe('Testing routes validation', () => {

//         it('It should not fetch products', (done) => {
//             chai.request(server)
//                 .post('/api/product/')
//                 .set('Content-Type', 'application/json')
//                 .end((err, response) => {
//                     response.should.have.status(404);
//                     done();
//                 })

//         }).timeout(10000);

//         it('It should list of all blog', (done) => {
//             chai.request(server)
//                 .get(`/api/blogs/`)
//                 .set('Content-Type', 'application/json')
//                 .end((err, response) => {
//                     response.should.have.status(404);
//                     done();
//                 });
//         }).timeout(10000);

//         it('It should not work without token auth header', (done) => {
//             chai.request(server)
//                 .get(`/api/product/${testData.listOneProduct}`)
//                 .set('Content-Type', 'application/json')
//                 .set('token', testData.AdminToken)
//                 .end((err, response) => {
//                     response.should.have.status(401);
//                     done();
//                 })

//         }).timeout(10000);

//         it('It should close database connection', (done) => {
//             mongoose.connection.close();
//             done();
//         });

//         it('It should not give all products', (done) => {
//             chai.request(server)
//                 .get('/api/product/')
//                 .set('Content-Type', 'application/json')
//                 .timeout(4000)
//                 .catch(err => {
//                     done();
//                 })

//         }).timeout(10000);

//     });


// });