const chai = require("chai");
chai.should();
const { expect } = chai;

const userModel = require("../../models/userModel");
const database = require('../../database/dbSetup')

describe("userModel", () => {
  before( async () => {
    await database.connect();
  });

  after( async () => {
      await database.disconnect();
  });

  beforeEach(async function() {
    const user = await userModel.register("kurt", "pass", "user");
    this.currentTest.userId = user._id;
    this.currentTest.username = user.username;
    this.currentTest.password = user.password;
    this.currentTest.role = user.role;
    this.currentTest.user = user;
  });
  
  it("Check if user object has correct keys", async function() {
    const user = {
      username: "kurt",
      password: this.test.password,
      role: "user",
      _id: this.test.userId
    }
    expect(
      this.test.username, 
      this.test.password, 
      this.test.role, 
      this.test.userId
    )
    .to.be.equal(
        user.username, 
        user.password, 
        user.role, 
        user._id
    );

    this.test.user.should.be.an("object");
  });
});