const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const todoItems = require('./routes/todoItems');

app.use('/items', todoItems);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});