const pagamentoRepository = require('../repositories/pagamentoRepository');

async function createPagamento(id_agendamento, id_cliente, id_recepcionista, status, valor, forma_pagamento) {
    const errors = [];

    const clienteExists = await pagamentoRepository.checkClienteExists(id_cliente);
    if (!clienteExists) {
        errors.push('Cliente não encontrado.');
    }

    const agendamentoExists = await pagamentoRepository.checkAgendamentoExists(id_agendamento);
    if (!agendamentoExists) {
        errors.push('Agendamento não encontrado.');
    }

    const recepcionistaExists = await pagamentoRepository.checkRecepcionistaExists(id_recepcionista);
    if (!recepcionistaExists) {
        errors.push('Recepcionista não encontrado.');
    }

    if (errors.length > 0) {
        throw new Error(errors.join(' '));
    }

    await pagamentoRepository.createPagamento(id_agendamento, id_cliente, id_recepcionista, status, valor, forma_pagamento);
}

async function getAllPagamentos() {
    return await pagamentoRepository.getAllPagamentos();
}

async function getPagamentoById(id_pagamento) {
    return await pagamentoRepository.getPagamentoById(id_pagamento);
}

async function updatePagamento(id_pagamento, status, valor, forma_pagamento) {
    await pagamentoRepository.updatePagamento(id_pagamento, status, valor, forma_pagamento);
}

async function deletePagamento(id_pagamento) {
    await pagamentoRepository.deletePagamento(id_pagamento);
}

module.exports = {
    createPagamento,
    getAllPagamentos,
    getPagamentoById,
    updatePagamento,
    deletePagamento
};
