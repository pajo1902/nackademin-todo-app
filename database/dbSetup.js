const Datastore = require('nedb-promises');
let db = {};
db.items = Datastore.create('database/items');;
db.users = Datastore.create('database/users');;
// db.items = Datastore.create('database/items');
db.items.load();
db.users.load();
// db.comments.load()

module.exports = db;
