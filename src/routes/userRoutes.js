const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Rota para criar um novo usuário
router.post('/usuarios/novo', userController.createUser);

module.exports = router;
