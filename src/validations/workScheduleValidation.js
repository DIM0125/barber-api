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

    // verificar se já existe um horário cadastrado para o mesmo dia, barbeiro e horário
    const existingWorkSchedule = await userRepository.getWorkScheduleByBarberAndDay(workScheduleItem.id_barbeiro, workScheduleItem.dia_da_semana);

    return errors;
}

module.exports = {
    validateWorkSchedule
};
