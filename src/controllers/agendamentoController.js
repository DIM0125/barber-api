const agendamentoService = require('../services/agendamentoService');
const { sendSuccess, sendError } = require('../utils/response');

async function getAgendamentoById(req, res) {
    const result = await agendamentoService.getAgendamentoById(req.params.id);
    if (result.success) {
        sendSuccess(res, 200, result.agendamento);
    } else {
        sendError(res, 404, result.errors.join(', '));
    }
}

async function createAgendamento(req, res) {
    const result = await agendamentoService.createAgendamento(req.body);
    if (result.success) {
        sendSuccess(res, 201, { message: 'Agendamento criado com sucesso.', userId: result.userId });
    } else {
        sendError(res, 400, result.errors.join(', '));
    }
}

module.exports = {
    getAgendamentoById,
    createAgendamento
};
