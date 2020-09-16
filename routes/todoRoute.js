const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');
const { authMiddleware, admin, user } = require('../middlewares/auth');

//hämta alla todos
router.get('/', authMiddleware, todoController.getAll);

//hämta en todo
router.get('/:id', authMiddleware, todoController.get);

//skapa en ny todo
router.post('/', authMiddleware, todoController.post);

//ta bort en todo
router.delete('/:id', authMiddleware, admin, todoController.remove);

//uppdatera en todo
router.put('/:id', authMiddleware, user, todoController.put);

module.exports = router;