const agendamentoRepository = require('../repositories/agendamentoRepository');

const getAllAgendamentos = async () => {
    return await agendamentoRepository.findAll();
};

const getAgendamentoById = async (id) => {
    return await agendamentoRepository.findById(id);
};

const createAgendamento = async (agendamentoData) => {
    return await agendamentoRepository.createAgendamento(agendamentoData);
};

const associateServices = async (agendamentoId, id_servicos) => {
    return await agendamentoRepository.associateServices(agendamentoId, id_servicos);
};

const checkServicoExists = async (id_servico) => {
    return await agendamentoRepository.checkServicoExists(id_servico);
};

const updateAgendamento = async (agendamentoId, newData) => {
    return await agendamentoRepository.updateAgendamento(agendamentoId, newData);
};

const deleteAgendamento = async (agendamentoId) => {
    return await agendamentoRepository.deleteAgendamento(agendamentoId);
};

const getAgendamentosByBarbeiro = async (id) => {
    return await agendamentoRepository.getAgendamentosByBarbeiro(id);
}

module.exports = {
    getAllAgendamentos,
    getAgendamentoById,
    createAgendamento,
    associateServices,
    checkServicoExists,
    updateAgendamento,
    deleteAgendamento,
    getAgendamentosByBarbeiro
};
