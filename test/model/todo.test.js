const chai = require("chai");
chai.should();

const userModel = require("../../models/userModel");
const todoModel = require("../../models/todoModel");

describe("todoModel", () => {
    beforeEach(async function() {
      await userModel.clearTestUsers();
      await todoModel.clearTestItems();

      const user = await userModel.register("kurt", "pass", "writer");
      this.currentTest.userId = user._id;
      this.currentTest.password = user.password;
      this.currentTest.user = user;

    //   const todo = await todoModel.postTodoItem("titel på en todo", "lite innehåll", false, false, "EpDqHRt6E28PKNJc");
    //   this.currentTest.todoId = todo._id;
    //   this.currentTest.createdBy = todo.createdBy;
    //   this.currentTest.todo = todo;
    });
    
    it("Should create a complete todo item", async function() {
        const todo = {
            title: "titel på en todo",
            content: "lite innehåll",
            done: false,
            urgent: false,
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.user._id,
            _id: "1"
        }
        const postTodo = await todoModel.postTodoItem(todo);
        
        postTodo.should.deep.equal({
            title: "titel på en todo",
            content: "lite innehåll",
            done: false,
            urgent: false,
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.userId,
            _id: "1"
        });
        todo.should.be.an("object");
    });

    it("Should get all todo items", async function() {
        const todo1 = {
            title: "titel på en todo",
            content: "lite innehåll",
            done: false,
            urgent: false,
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.user._id,
            _id: "1"
        }

        const todo2 = {
            title: "titel på en todo2",
            content: "lite innehåll2",
            done: false,
            urgent: false,
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.user._id,
            _id: "2"
        }
        await todoModel.postTodoItem(todo1);
        await todoModel.postTodoItem(todo2);

        const getTodos = await todoModel.getAllTodoItems(this.test.user._id);
        getTodos.should.deep.equal([
            {
                title: "titel på en todo",
                content: "lite innehåll",
                done: false,
                urgent: false,
                listId: "EpDqHRt6E28PKNJc",
                createdBy: this.test.user._id,
                _id: "1"
            },
            {
                title: "titel på en todo2",
                content: "lite innehåll2",
                done: false,
                urgent: false,
                listId: "EpDqHRt6E28PKNJc",
                createdBy: this.test.user._id,
                _id: "2"
            } 
        ]);
    });

    it("Should update a todo item", async function() {
        const todo1 = {
            title: "titel på en todo",
            content: "lite innehåll",
            done: false,
            urgent: false,
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.user._id,
            _id: "3"
        }
        await todoModel.postTodoItem(todo1);

        const todo2 = {
            title: "ny titel på en todo",
            content: "lite mer innehåll"
        }
        const updatedTodo = await todoModel.updateTodoItem("3", todo2);

        updatedTodo.should.deep.equal(1);
    });

    it("Should update a todo item", async function() {
        const todo1 = {
            title: "titel på en todo",
            content: "lite innehåll",
            done: false,
            urgent: false,
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.user._id,
            _id: "3"
        }
        await todoModel.postTodoItem(todo1);

        const todo2 = {
            title: "ny titel på en todo",
            content: "lite mer innehåll"
        }
        const updatedTodo = await todoModel.updateTodoItem("3", todo2);

        updatedTodo.should.equal(1);
    });

    it("Should delete a todo item", async function() {
        const todo = {
            title: "titel på en todo",
            content: "lite innehåll",
            done: false,
            urgent: false,
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.user._id,
            _id: "5"
        }
        await todoModel.postTodoItem(todo);

        const deletedTodo = await todoModel.removeTodoItem({_id: "5"});

        deletedTodo.should.equal(1);
    });
});