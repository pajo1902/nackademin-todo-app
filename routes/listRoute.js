const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController.js');
const { authMiddleware } = require('../middlewares/auth');

router.post('/', authMiddleware, listController.postList);

router.delete('/', authMiddleware, listController.removeList);

module.exports = router;