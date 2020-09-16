const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const gdprController = require('../controllers/gdprController');
const { authMiddleware } = require('../middlewares/auth');

//register
router.post('/register', userController.register);

//login
router.post('/auth/login', userController.login); //ska jag ta bort även "login"?

//remove
router.delete('/:id', authMiddleware, gdprController.remove);

//hämta all data för användaren
router.get('/getdata/:id', authMiddleware, gdprController.getAllUserContent);

module.exports = router;