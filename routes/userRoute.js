const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const gdprController = require('../controllers/gdprController');
const { authMiddleware } = require('../middlewares/auth');

router.post('/register', userController.register);

router.post('/auth/login', userController.login);

router.delete('/:id', authMiddleware, gdprController.remove);

router.get('/getdata/:id', authMiddleware, gdprController.getAllUserContent);

module.exports = router;