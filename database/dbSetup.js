const Datastore = require("nedb-promises");
require("dotenv").config();

let db = {};

// let postCollection, userCollection, testDb;
switch (process.env.ENVIRONMENT) {
  case "development":
    db.lists = Datastore.create('database/lists');
    db.items = Datastore.create('database/items');
    db.users = Datastore.create('database/users');

    db.lists.load();
    db.items.load();
    db.users.load();
    break;

  case "test":
    db.todoTests = Datastore.create('database/todo_test');
    db.userTests = Datastore.create('database/user_test');

    db.todoTests.load();
    db.userTests.load();

    db.todoTests.remove({});
    db.userTests.remove({});
}

module.exports = db;

//gamla versionen
// const Datastore = require('nedb-promises');
// let db = {};
// db.lists = Datastore.create('database/lists');
// db.items = Datastore.create('database/items');
// db.users = Datastore.create('database/users');
// db.todoTests = Datastore.create('database/todo_test');
// db.userTests = Datastore.create('database/user_test');
// // db.items = Datastore.create('database/items');
// db.lists.load();
// db.items.load();
// db.users.load();
// db.todoTests.load();
// db.userTests.load();
// // db.comments.load()

// module.exports = db;
