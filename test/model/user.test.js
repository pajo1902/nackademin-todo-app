const chai = require("chai");
chai.should();

const User = require("../../models/userModel");
const Todo = require("../../models/todoModel");
// const Comment = require("../../models/comments");

describe("userModel", () => {
  beforeEach(() => {
    User.clearTestUsers();
  });
  // Insert user
  it("Should insert a new user with username, password and role", async () => {
    const result = await User.register("patrik", "pass", "writer");
    console.log('ny användare: ', result);
    result.should.deep.equal({
      _id: result._id,
      username: "patrik",
      password: result.password,
      role: "writer",
    });
    result.should.be.an("object");
  });
  
});

describe("todoModel", () => {
    beforeEach(() => {
        Todo.clearTestItems();
    });
    // Inserts post
    it("Should insert a post with title, content, userId and _id", async () => {
        const user = await User.register("patrik", "pass", "writer");
        const result = await Todo.postTodoItem(
        "Nya titeln", //title:
        "Ny content", //content:
      );
  
      result.should.be.an("object");
    });
  
    //isOwner of post
    it("Should check if user is owner of the post and return true/false", async () => {
        const user = await User.register("patrik", "pass", "writer");
  
        const createItem = await Todo.postTodoItem(
            "Nya titeln",
            "Ny content",
        user._id
      );
  
      const result = await Todo.isOwner(createItem._id, user._id);
      result.should.be.equal(true);
    })
});