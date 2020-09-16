const chai = require("chai");
chai.should();

const userModel = require("../../models/userModel");

describe("userModel", () => {
  beforeEach(async function() {
    const user = await userModel.register("kurt", "pass", "user");
    this.currentTest.userId = user._id;
    this.currentTest.password = user.password;
    this.currentTest.user = user;
  });
  
  it("Check if user object has correct keys", async function() {
    await this.test.user.should.deep.equal({
      username: "kurt",
      password: this.test.password,
      role: "user",
      _id: this.test.userId
    });
    this.test.user.should.be.an("object");
  });
});