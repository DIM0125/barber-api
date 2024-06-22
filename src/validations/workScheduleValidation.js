const userRepository = require("../repositories/userRepository");

async function validateWorkSchedule(workScheduleItem) {
    const errors = [];

    if (!workScheduleItem.id_barbeiro) {
        errors.push('O barbeiro deve ser informado.');
    }

    if (!workScheduleItem.dia_da_semana) {
        errors.push('O dia é obrigatório.');
    }

    if (!workScheduleItem.horario_inicio) {
        errors.push('O horário de início é obrigatório.');
    }

    if (!workScheduleItem.horario_fim) {
        errors.push('O horário de fim é obrigatório.');
    }

    return errors;
}

module.exports = {
    validateWorkSchedule
};
