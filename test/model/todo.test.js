const chai = require("chai");
chai.should();
const { expect } = chai;


const userModel = require("../../models/userModel");
const todoModel = require("../../models/todoModel");
const database = require('../../database/dbSetup')

describe("UNIT TEST: todoModel", () => {
    before( async () => {
        await database.connect();
    });

    after( async () => {
        await database.disconnect();
    });
    
    beforeEach(async function() {
      await userModel.clearTestUsers();
      await todoModel.clearTestItems();

      const user = await userModel.register("kurt", "pass", "user");
      this.currentTest.userId = user._id;
      this.currentTest.password = user.password;
      this.currentTest.user = user;
    });
    
    it("Should create a complete todo item", async function() {
        const todo = {
            title: "titel på en todo",
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.userId,
        }
        const resTodo = await todoModel.postTodoItem(todo);
        
        expect(
            resTodo.title, 
            resTodo.listId, 
            resTodo.createdBy
        )
        .to.be.equal(
            todo.title, 
            todo.listId, 
            todo.createdBy
        );

        resTodo.should.be.an("object");
    });

    it("Should get all todo items", async function() {
        const todo1 = {
            title: "titel på en todo1",
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.user._id,
        }

        const todo2 = {
            title: "titel på en todo2",
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.user._id,
        }
        await todoModel.postTodoItem(todo1);
        await todoModel.postTodoItem(todo2);

        const resTodos = await todoModel.getAllTodoItems(this.test.user._id);
        expect(
            resTodos[0].title, resTodos[0].listId, resTodos[0].createdBy,
            resTodos[1].title, resTodos[1].listId, resTodos[1].createdBy,
            )
            .to.be.equal(
                todo1.title, todo1.listId, todo1.createdBy,
                todo2.title, todo2.listId, todo2.createdBy, 
            );
    });

    it("Should update a todo item", async function() {
        const todo1 = {
            title: "titel på en todo",
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.user._id,
        }
        const todo = await todoModel.postTodoItem(todo1);
        const todoId = todo._id;

        const todo2 = {
            title: "ny titel på en todo"
        }
        const resTodo = await todoModel.updateTodoItem(todoId, todo2);

        resTodo.nModified.should.deep.equal(1);
    });

    it("Should delete a todo item", async function() {
        const todo = {
            title: "titel på en todo",
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.user._id,
        }
        const resTodo = await todoModel.postTodoItem(todo);

        const resDelete = await todoModel.removeTodoItem({_id: resTodo._id});

        resDelete.deletedCount.should.equal(1);
    });
});