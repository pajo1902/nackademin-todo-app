const Datastore = require('nedb-promises');
let db = Datastore.create('database/items');;
// db.items = Datastore.create('database/items');
// db.comments = Datastore.create('database/comments')
db.load();
// db.comments.load()

module.exports = db;
