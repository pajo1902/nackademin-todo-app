const chai = require("chai");
chai.should();
const { expect } = chai;

const userModel = require("../../models/userModel");
const database = require('../../database/dbSetup')

describe("UNIT TEST: userModel", () => {
  before( async () => {
    await database.connect();
  });

  after( async () => {
    await userModel.clearTestUsers();
    await database.disconnect();
  });

  it("Check if user object has correct keys", async function() {
    const resUser = await userModel.register("janne", "pass", "user");
    
    const user = {
      username: "janne",
      password: this.test.password,
      role: "user",
      _id: resUser._id
    }
    expect(
      resUser.username, 
      resUser.password, 
      resUser.role, 
      resUser._id
    )
    .to.be.equal(
        user.username, 
        user.password, 
        user.role, 
        user._id
    );

    resUser.should.be.an("object");
  });
});