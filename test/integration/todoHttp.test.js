const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect, request } = chai;
chai.should();
const userModel = require('../.././models/userModel');
const todoModel = require('../.././models/todoModel');
const database = require('../../database/dbSetup');

describe("INTEGRATION TEST: For testing if API is RESTful", () => {
    before( async () => {
        await database.connect();
    });

    after( async () => {
        await database.disconnect();
    });

    beforeEach(async function() {
        await userModel.clearTestUsers();
        await todoModel.clearTestItems();

        await userModel.register("patrik", "pass");

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
            listId: "EpDqHRt6E28PKNJc",
            createdBy: this.test.userId,
        };

        request(app)
        .post('/todos/')
        .set('Authorization', `Bearer ${this.test.token}`)
        .set('Content-Type', 'application/json')
        .send(todo)
        .then((res) => {
            expect(res).to.have.status(200)
            expect(res.body.toString()).to.include({
                _id: res.body._id.toString(),
                title: todo.title.toString(),
                done: false,
                urgent: false,
                listId: todo.listId.toString(),
                createdBy: todo.createdBy.toString(),
            });
        });
    });
});