const bcrypt = require('bcrypt');
const {validateCreateUser} = require('../validations/userValidation');
const userRepository = require('../repositories/userRepository');

/**
 * Serviço para criar um usuário.
 *
 * @param {Object} userData - Dados do usuário para criar.
 * @returns {Object} - O resultado do processo de criação, incluindo erros de validação ou sucesso.
 */
async function createUser(userData) {
    const validationErrors = validateCreateUser(userData);
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }

    try {
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);

        const userId = await userRepository.create(userData);
        return {
            success: true,
            userId
        };
    } catch (error) {
        return {
            success: false,
            errors: ['Aconteceu um erro durante a criação do usuário.']
        };
    }
}

module.exports = {
    createUser
};
