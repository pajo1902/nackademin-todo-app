// const app = require('../../app');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);

// const { expect, request } = chai;

// chai.should();

// const userModel = require('../.././models/userModel');
// const todoModel = require('../.././models/todoModel');
// const { items } = require('../../database/dbSetup');

// describe("For testing if API is RESTful", () => {
//     beforeEach(async function() {
//         await userModel.clearTestUsers();
//         await todoModel.clearTestItems();

//         const user = await userModel.register("kurt", "pass", "writer");
//         const login = await userModel.login("kurt", "pass");
//         const token = login.token;
//         this.currentTest.userId = user._id;
//         // this.currentTest.password = user.password;
//         // this.currentTest.user = user;

//         it('Should create a todo item with a post request', async function() {
//             const todo = {
//                 title: "titel på en todo",
//                 content: "lite innehåll",
//                 done: false,
//                 urgent: false,
//                 listId: "EpDqHRt6E28PKNJc",
//                 createdBy: this.test.userId,
//             };

//             await todoModel.postTodoItem(todo);

//             request(app)
//             .get('/todos')
//             .set('Authorization', `Bearer ${this.test.token}`)
//             .send(body)
//             .end((err, res) => {
//                 console.log(res.body);
//             }
//         });
//     });








// });