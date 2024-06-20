const bcrypt = require('bcrypt');
const {validateCreateUser} = require('../validations/userValidation');
const userRepository = require('../repositories/userRepository');

/**
 * Serviço para criar um usuário.
 *
 * @param {Object} userData - Dados do usuário para criar.
 * @returns {Object} - O resultado do processo de criação, incluindo erros de validação ou sucesso.
 */
async function createCliente(userData) {
    const validationErrors = await validateCreateUser(userData, 'Cliente');
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }

    try {
        const saltRounds = 10;
        userData.senha = await bcrypt.hash(userData.senha, saltRounds);
        const userId = await userRepository.createCliente(userData);
        return {
            success: true,
            userId
        };
    } catch (error) {
        return {
            success: false,
            errors: error
        };
    }
}

async function createBarbeiro(userData) {
    const validationErrors = await validateCreateUser(userData, 'Barbeiro');
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }

    try {
        const saltRounds = 10;
        userData.senha = await bcrypt.hash(userData.senha, saltRounds);
        const userId = await userRepository.createBarbeiro(userData);
        return {
            success: true,
            userId
        };
    } catch (error) {
        return {
            success: false,
            errors: error
        };
    }
}

async function createRecepcionista(userData) {
    const validationErrors = await validateCreateUser(userData, 'Recepcionista');
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }

    try {
        const saltRounds = 10;
        userData.senha = await bcrypt.hash(userData.senha, saltRounds);
        const userId = await userRepository.createRecepcionista(userData);
        return {
            success: true,
            userId
        };
    } catch (error) {
        return {
            success: false,
            errors: error
        };
    }
}

async function createGerente(userData) {
    const validationErrors = await validateCreateUser(userData, 'Gerente');
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }

    try {
        const saltRounds = 10;
        userData.senha = await bcrypt.hash(userData.senha, saltRounds);
        const userId = await userRepository.createGerente(userData);
        return {
            success: true,
            userId
        };
    } catch (error) {
        return {
            success: false,
            errors: error
        };
    }
}

async function getUserById(id) {
    try{
        const user = await userRepository.findById(id);
        return {
            success: true,
            user
        }
    }
    catch(error){
        return {
            success: false,
            errors: ['Aconteceu um erro durante a busca do usuário.']
        }
    }
}

async function deleteUserById(id) {
    try{
        const user = await userRepository.deleteById(id);
        return {
            success: true,
            user
        }
    }
    catch(error){
        return {
            success: false,
            errors: ['Aconteceu um erro durante a busca do usuário.']
        }
    }
}

module.exports = {
    createCliente,
    createBarbeiro,
    createRecepcionista,
    createGerente,
    getUserById,
    deleteUserById
};
