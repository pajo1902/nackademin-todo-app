const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect, request } = chai;

chai.should();

describe("For testing if API is RESTful", () => {
    it('Should create a user with a post request and then a get request to get it', async function() {
        const user = {
            username: "karl",
            password: "pass",
            role: "admin"
        };

        request(app)
        .post('/users/register')
        // .set('Authorization', `Bearer ${this.test.token}`)
        .send(user)
        .end((err, res) => {
            // console.log(res.status);
            // console.log("RES: ", res);
            expect(res.status)
            .to.equal(200)
        });
    });
});