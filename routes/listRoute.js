const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController.js');
const { authMiddleware } = require('../middlewares/auth');

//skapa en ny lista
router.post('/', authMiddleware, listController.postList);

//ta bort en lista
router.delete('/', authMiddleware, listController.removeList);

module.exports = router;