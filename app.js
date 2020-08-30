const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const todoItems = require('./routes/todoItems');
const todoUsers = require('./routes/todoUsers');

app.use('/items', todoItems);
app.use('/users', todoUsers);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});