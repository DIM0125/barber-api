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

module.exports = {
    addToWorkSchedule
};
