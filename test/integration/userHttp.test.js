const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const database = require('../../database/dbSetup');

const { expect, request } = chai;

chai.should();

describe("INTEGRATION TEST: For testing if API is RESTful", () => {
    before( async () => {
        await database.connect();
    });

    after( async () => {
        await database.disconnect();
    });

    it('Should create a user with a post request and then a get request to get it', async function() {
        const user = {
            username: "karl",
            password: "pass",
            role: "admin"
        };

        request(app)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(user)
        .then((err, res) => {
            expect(res).to.have.status(200)
        });

        // request(app)
        // .get(`/todos/${todoId}`)
        // .set('Authorization', `Bearer ${this.test.token}`)
        // .set('Content-Tyoe', 'application/json')
        // .then((err, res) => {
        //     expect(res).to.be.json
        //     expect(res).to.have.status(200)
        //     expect(res.body).to.include({
        //         title: postedTodo.title,
        //     })
        // });
    });
});