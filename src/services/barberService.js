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

module.exports = {
    addToWorkSchedule,
    getWorkSchedule
};
