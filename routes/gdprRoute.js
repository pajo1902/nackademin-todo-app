const express = require('express');
const router = express.Router();

//skapa en ny lista
router.get('/', gdprController.privacypolicy);

module.exports = router;