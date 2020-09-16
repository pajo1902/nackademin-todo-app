const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors()); //detta aktiverar middleware som sätter headers

//routes
const listRoute = require('./routes/listRoute');
const todoRoute = require('./routes/todoRoute');
const userRoute = require('./routes/userRoute');

app.use('/lists', listRoute);
app.use('/todos', todoRoute);
app.use('/users', userRoute);
// app.use('/privacypolicy', userRoute);

module.exports = app;