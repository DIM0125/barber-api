const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/:id', function (req, res) {
    agendamentoController.getAgendamentoById(req, res);
});

router.post('/', agendamentoController.createAgendamento);

module.exports = router;

