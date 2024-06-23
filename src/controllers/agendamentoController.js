const agendamentoService = require('../services/agendamentoService');
const { sendSuccess, sendError } = require('../utils/response');

async function getAllAgendamentos(req, res) {
    try {
        const agendamentos = await agendamentoService.getAllAgendamentos();
        if (agendamentos.length > 0) {
            sendSuccess(res, 200, agendamentos);
        } else {
            sendError(res, 404, 'Nenhum agendamento encontrado.');
        }
    } catch (error) {
        sendError(res, 500, error.message);
    }
}

async function getAgendamentoById(req, res) {
    try {
        const agendamento = await agendamentoService.getAgendamentoById(req.params.id);
        if (agendamento) {
            sendSuccess(res, 200, agendamento);
        } else {
            sendError(res, 404, 'Agendamento não encontrado.');
        }
    } catch (error) {
        sendError(res, 500, error.message);
    }
}

async function createAgendamento(req, res) {
    try {
        const agendamentoId = await agendamentoService.createAgendamento(req.body);
        sendSuccess(res, 201, { message: 'Agendamento criado com sucesso.', agendamentoId });
    } catch (error) {
        sendError(res, 400, error.message);
    }
}

async function updateAgendamento(req, res) {
    try {
        const agendamentoId = req.params.id;
        const updatedAgendamento = await agendamentoService.updateAgendamento(agendamentoId, req.body);
        sendSuccess(res, 200, updatedAgendamento);
    } catch (error) {
        sendError(res, 500, error.message);
    }
}

async function deleteAgendamento(req, res) {
    try {
        const agendamentoId = req.params.id;
        await agendamentoService.deleteAgendamento(agendamentoId);
        sendSuccess(res, 200, { message: 'Agendamento excluído com sucesso.' });
    } catch (error) {
        sendError(res, 500, error.message);
    }
}

module.exports = {
    getAllAgendamentos,
    getAgendamentoById,
    createAgendamento,
    updateAgendamento,
    deleteAgendamento
};
