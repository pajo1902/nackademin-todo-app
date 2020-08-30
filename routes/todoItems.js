const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');
const {authMiddleware, admin, writer} = require('../middlewares/auth');

//TODOS

//hämta alla todos
router.get('/all', authMiddleware, todoController.getAll);

//hämta en todo
router.get('/:id', authMiddleware, todoController.get);

//skapa en ny todo
router.post('/create', authMiddleware, todoController.post);

//ta bort en todo
router.delete('/remove/:id', authMiddleware, admin, todoController.remove);

//uppdatera en todo
router.put('/update/:id', authMiddleware, writer, todoController.put);

module.exports = router;