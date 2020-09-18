const express = require('express');
const router = express.Router();
const gdprController = require('../controllers/gdprController.js');

//skapa en ny lista
router.get('/', gdprController.privacypolicy);

module.exports = router;