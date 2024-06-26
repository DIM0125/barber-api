const userRepository = require('../repositories/userRepository');
const {validateWorkSchedule} = require("../validations/workScheduleValidation");

async function addToWorkSchedule(timeData) {
    const validationErrors = await validateWorkSchedule(timeData);
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }

    try {
        const result = await userRepository.saveWorkSchedule(timeData);
        return {
            success: true,
            result
        };
    } catch (error) {
        console.error('Error adding to work schedule:', error);
        return {
            success: false,
            error: 'Failed to add work schedule'
        };
    }
}

async function getWorkSchedule(barberId) {
    const workSchedule = await userRepository.getWorkScheduleByBarberID(barberId);
    if (workSchedule) {
        return {
            success: true,
            result: workSchedule
        };
    } else {
        return {
            success: false,
            message: 'Barber not found'
        };
    }
}

async function removeWorkSchedule(barberId, workScheduleId) {
    const result = await userRepository.removeWorkSchedule(barberId, workScheduleId);
    if (result) {
        return {
            success: true,
            message: 'Work schedule removed'
        };
    } else {
        return {
            success: false,
            message: 'Work schedule not found'
        };
    }
}

async function getHorarios(barberId) {
    const horarios = await userRepository.getHorarios(barberId);
    if (horarios) {
        return {
            success: true,
            result: horarios
        };
    } else {
        return {
            success: false,
            message: 'Horarios not found'
        };
    }
}

module.exports = {
    addToWorkSchedule,
    getWorkSchedule,
    removeWorkSchedule,
    getHorarios
};
