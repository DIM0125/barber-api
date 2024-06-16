const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { authenticateToken } = require('../middlewares/authMiddleware');