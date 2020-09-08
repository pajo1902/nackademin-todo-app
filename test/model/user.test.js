const chai = require("chai");
chai.should();

const userModel = require("../../models/userModel");
const todoModel = require("../../models/todoModel");

describe("userModel", () => {
  beforeEach(async function() {
    // await userModel.clearTestUsers();
    const user = await userModel.register("kurt", "pass", "writer");
    // console.log("user:", user);
    this.currentTest.userId = user._id;
    this.currentTest.password = user.password;
    this.currentTest.user = user;
    // console.log(this.test.userId);
  });
  
  it("Check if user object has correct keys", async function() {
    await this.test.user.should.deep.equal({
      username: "kurt",
      password: this.test.password,
      role: "writer",
      _id: this.test.userId
    });
    this.test.user.should.be.an("object");
  });
});

// describe("todoModel", () => {
//     beforeEach(() => {
//         todoModel.clearTestItems();
//     });
//     // Inserts post
//     it("Should insert a post with title, content, userId and _id", async () => {
//         const user = await userModel.register("patrik", "pass", "writer");
//         const result = await todoModel.postTodoItem(
//         "Nya titeln", //title:
//         "Ny content", //content:
//       );
  
//       result.should.be.an("object");
//     });
  
//     //isOwner of post
//     it("Should check if user is owner of the post and return true/false", async () => {
//         const user = await userModel.register("patrik", "pass", "writer");
  
//         const createItem = await todoModel.postTodoItem(
//             "Nya titeln",
//             "Ny content",
//         user._id
//       );
  
//       const result = await todoModel.isOwner(createItem._id, user._id);
//       result.should.be.equal(true);
//     })
// });