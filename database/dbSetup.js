const Datastore = require("nedb-promises");
const mongoose = require('mongoose')
require("dotenv").config();

console.log("ENV: ", process.env.ENVIRONMENT)

switch (process.env.ENVIRONMENT) {
  case 'development':
  case 'test':
    const {MongoMemoryServer} = require('mongodb-memory-server')
    mongoDatabase = new MongoMemoryServer()
    console.log("PRecis innan connect!");
    connect();
    break;
  case 'production':
  case 'staging':
    mongoDatabase = {
      getUri: async () => 
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        // mongodb+srv://dbUser:<password>@cluster0.o0z1n.mongodb.net/<dbname>?retryWrites=true&w=majority
      }
    break;
}

async function connect(){
    
  let uri = await mongoDatabase.getUri()

  await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  })
}

async function disconnect(){
  await mongoDatabase.stop()
  await mongoose.disconnect()
}


module.exports = {
  connect, disconnect
}