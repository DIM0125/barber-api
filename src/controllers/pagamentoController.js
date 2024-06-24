const pagamentoService = require('../services/pagamentoService');
const { sendSuccess, sendError } = require('../utils/response');

async function createPagamento(req, res) {
    try {
        const { id_agendamento, id_cliente, id_recepcionista, status, valor, forma_pagamento } = req.body;
        await pagamentoService.createPagamento(id_agendamento, id_cliente, id_recepcionista, status, valor, forma_pagamento);
        sendSuccess(res, 201, { message: 'Pagamento criado com sucesso.' });
    } catch (error) {
        sendError(res, 400, error.message);
    }
}

async function getAllPagamentos(req, res) {
    try {
        const pagamentos = await pagamentoService.getAllPagamentos();
        sendSuccess(res, 200, pagamentos);
    } catch (error) {
        sendError(res, 500, error.message);
    }
}

async function getPagamentoById(req, res) {
    try {
        const id_pagamento = req.params.id;
        const pagamento = await pagamentoService.getPagamentoById(id_pagamento);
        if (pagamento) {
            sendSuccess(res, 200, pagamento);
        } else {
            sendError(res, 404, 'Pagamento não encontrado.');
        }
    } catch (error) {
        sendError(res, 500, error.message);
    }
}

async function updatePagamento(req, res) {
    try {
        const id_pagamento = req.params.id;
        const { status, valor, forma_pagamento } = req.body;
        await pagamentoService.updatePagamento(id_pagamento, status, valor, forma_pagamento);
        sendSuccess(res, 200, { message: 'Pagamento atualizado com sucesso.' });
    } catch (error) {
        sendError(res, 400, error.message);
    }
}

async function deletePagamento(req, res) {
    try {
        const id_pagamento = req.params.id;
        await pagamentoService.deletePagamento(id_pagamento);
        sendSuccess(res, 200, { message: 'Pagamento deletado com sucesso.' });
    } catch (error) {
        sendError(res, 400, error.message);
    }
}

module.exports = {
    createPagamento,
    getAllPagamentos,
    getPagamentoById,
    updatePagamento,
    deletePagamento
};
