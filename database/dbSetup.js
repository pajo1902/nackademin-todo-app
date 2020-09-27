const Datastore = require('nedb-promises');
const mongoose = require('mongoose')
require('dotenv').config();
let mongoDatabase;

switch (process.env.ENVIRONMENT) {
  case 'production':
  case 'staging':
    mongoDatabase = {
      getUri: async () => 
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
      };
    break;
  case 'development':
  case 'test':
    const {MongoMemoryServer} = require('mongodb-memory-server');
    mongoDatabase = new MongoMemoryServer();
    break;
};

async function connect(){
    
  let uri = await mongoDatabase.getUri();

  await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  });
};

async function disconnect(){
  await mongoose.disconnect();
	if(process.env.ENVIRONMENT == 'test'){
		await mongoDatabase.stop()
	}
};


module.exports = {
  connect, disconnect
};