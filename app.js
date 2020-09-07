const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const todoLists = require('./routes/todoLists');
const todoItems = require('./routes/todoItems');
const todoUsers = require('./routes/todoUsers');

app.use('/lists', todoLists);
app.use('/items', todoItems);
app.use('/users', todoUsers);

module.exports = app;