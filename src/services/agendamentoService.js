const agendamentoRepository = require('../repositories/agendamentoRepository');

async function getAgendamentoById(id) {
    const agendamento = await agendamentoRepository.findById(id);
    return agendamento;
}

module.exports = {
    getAgendamentoById
}