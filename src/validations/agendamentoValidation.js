function validateCreateAgendamento(data) {
    const errors = [];

    if (!data.id_cliente) {
        errors.push('ID do cliente é obrigatório.');
    }
    if (!data.id_barbeiro) {
        errors.push('ID do barbeiro é obrigatório.');
    }
    if (!data.id_servico) {
        errors.push('ID do serviço é obrigatório.');
    } else if (!Array.isArray(data.id_servico) && typeof data.id_servico !== 'number') {
        errors.push('ID do serviço deve ser um número ou uma lista de números.');
    }
    if (!data.horario_agendamento) {
        errors.push('Data e hora são obrigatórias.');
    }

    return errors;
}

module.exports = {
    validateCreateAgendamento
};
