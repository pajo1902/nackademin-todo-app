const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth');

//REGISTER and LOGIN

//register
router.post('/register', userController.register);

//login
router.post('/auth/login', userController.login); //ska jag ta bort även "login"?

//remove
router.delete('/remove/:id', authMiddleware, userController.remove);

//hämta all data för användaren
router.get('/getdata/:id', authMiddleware, userController.getAllUserContent);

//hämta all data för användaren
router.get('/getdata/:id', authMiddleware, userController.getAllUserContent);

module.exports = router;