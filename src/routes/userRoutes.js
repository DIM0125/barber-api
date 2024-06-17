const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/cliente', (req, res) => {
    userController.createCliente(req, res);
});

router.post('/barbeiro', (req, res) => {
    userController.createBarbeiro(req, res);
});

router.post('/recepcionista', (req, res) => {
    userController.createRecepcionista(req, res);
});

router.post('/gerente', (req, res) => {
    userController.createGerente(req, res);
});

router.get('/:id', (req, res) => {
    userController.getUserById(req, res);
})

router.delete('/:id', (req, res) => {
    userController.deleteUserById(req, res);
})

module.exports = router;
