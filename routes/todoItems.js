const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');

// const db = require('../database/dbSetup');

//hämta alla items
router.get('/all', todoController.getAll);

//hämta ett item
router.get('/:id', todoController.get);

//skapa ett nytt item
router.post('/create', todoController.post);

//ta bort ett item
router.delete('/remove/:id', todoController.remove);

//uppdatera ett item
router.put('/update/:id', todoController.put);

module.exports = router;