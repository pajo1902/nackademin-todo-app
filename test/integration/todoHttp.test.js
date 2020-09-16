const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect, request } = chai;

chai.should();

const userModel = require('../.././models/userModel');
const todoModel = require('../.././models/todoModel');

describe("For testing if API is RESTful", () => {
    beforeEach(async function() {
        await userModel.clearTestUsers();
        await todoModel.clearTestItems();

        await userModel.register("patrik", "pass", "user");

        const login = await userModel.login({
            login: {
                username: "patrik",
                password: "pass"
            }
        });

        this.currentTest.token = login.token;
        this.currentTest.userId = login.user._id;
        this.currentTest.password = login.user.password;
        this.currentTest.user = login.user;
    });

    it('Should create a todo item with a post request', async function() {
        const todo = {
            title: "titel på en todo",
            done: false,
            urgent: false,
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.userId
        };

        const postedTodo = await todoModel.postTodoItem(todo);

        const todoId = postedTodo._id;

        request(app)
        .get(`/todos/${todoId}`)
        .set('Authorization', `Bearer ${this.test.token}`)
        .end((err, res) => {
            console.log("Här:")
            console.log(res.status);
            console.log("Slut")
        });
    });
});