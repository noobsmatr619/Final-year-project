//test data for tests 
const createNewUser = {
    "_id": "5ff49215073e021e54403cc9",
    "email": "testUser1@test4.com",
    "password": "Test1234!",
    "actualName": "testssz"
}

const loginUser = {
    "email": "testUser1@test4.com",
    "password": "Test1234!"
}
const addProduct = {
    "name": "testName",
    "image": "#",
    "star": 4,
    "category": "pet",
    "size": "m",
    "quantity": "2",
    "description": "testLorem",
    "price": "2"
}
const addBlog = {
    "title": "test123456",
    "category": "Pet"
}

const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZmNDlkNWQ4NTJmYTAzODM0OTgzMGJiIiwiYWRtaW4iOmZhbHNlfSwiaWF0IjoxNjA5ODY2NzE5LCJleHAiOjE2NDEzMTYzMTl9.CEabw4xtaLa0R0yBzY6wC4js-1f09yRxsJGeFUtvkvk';

const AdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZmNGExOTFkOTA5M2QwOGU0MGU0MDYzIiwiYWRtaW4iOnRydWV9LCJpYXQiOjE2MDk4NjgzMzQsImV4cCI6MTY0MTMxNzkzNH0.46TI7F5V-vab6WU7NZ9E5MwiUQowX_JNdbkWUB0gl2k';
const addAdmin = {
    "email": "test12@g.com",
    "password": "Test1234!",
    "admin": "true"

}
const listOneProduct = '5ff4d6fed6f4f023d4740e10';
const deleteProduct = '5ff4a9e708a1a32320edb330';
const resetPasswordEmail = { "email": "juni@test1.com" };
const DeleteBlogId = '5ff4a9e708a1a32320edb330';
const addToCart = {
    "name": "asdasd",
    "size": 654,
    "quantity": "asd",
    "category": "asd",
    "star": 64,
    "price": 354,
    "description": "asds"
}
module.exports = { createNewUser, loginUser, addBlog, Token, addAdmin, AdminToken, listOneProduct, addProduct, deleteProduct, resetPasswordEmail, addToCart, DeleteBlogId }