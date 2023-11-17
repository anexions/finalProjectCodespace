const express = require('express');
const router = express.Router();
const saveEmail = require('../controllers/email'); 
router.post('/save-email', saveEmail);

module.exports = router;
