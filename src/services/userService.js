const bcrypt = require('bcrypt');
const {validateCreateUser} = require('../validations/userValidation');
const userRepository = require('../repositories/userRepository');

/**
 * Serviço para criar um usuário.
 *
 * @param {Object} userData - Dados do usuário para criar.
 * @returns {Object} - O resultado do processo de criação, incluindo erros de validação ou sucesso.
 */
async function createClient(userData) {
    const validationErrors = await validateCreateUser(userData);
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }

    try {
        const saltRounds = 10;
        userData.senha = await bcrypt.hash(userData.senha, saltRounds);
        const userId = await userRepository.createClient(userData);
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

async function createBarber(userData) {
    const validationErrors = await validateCreateUser(userData);
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }

    try {
        const saltRounds = 10;
        userData.senha = await bcrypt.hash(userData.senha, saltRounds);
        const userId = await userRepository.createBarber(userData);
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

async function createReceptionist(userData) {
    const validationErrors = await validateCreateUser(userData);
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }

    try {
        const saltRounds = 10;
        userData.senha = await bcrypt.hash(userData.senha, saltRounds);
        const userId = await userRepository.createReceptionist(userData);
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

async function createManager(userData) {
    const validationErrors = await validateCreateUser(userData);
    if (validationErrors.length > 0) {
        return {
            success: false,
            errors: validationErrors
        };
    }

    try {
        const saltRounds = 10;
        userData.senha = await bcrypt.hash(userData.senha, saltRounds);
        const userId = await userRepository.createManager(userData);
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

async function updateUser(id, userData) {
    try{
        const user = await userRepository.updateUser(id, userData);
        return {
            success: true,
            user
        }
    }
    catch(error){
        return {
            success: false,
            errors: ['Aconteceu um erro durante a edição do usuário.']
        }
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

async function getClients() {
    try{
        const clients = await userRepository.findClients();
        return {
            success: true,
            clients
        }
    }
    catch(error){
        return {
            success: false,
            errors: ['Aconteceu um erro durante a busca dos clientes.']
        }
    }
}

async function getBarbers() {
    try{
        const barbers = await userRepository.findBarbers();
        return {
            success: true,
            barbers
        }
    }
    catch(error){
        return {
            success: false,
            errors: ['Aconteceu um erro durante a busca dos barbeiros.']
        }
    }
}

async function getReceptionists() {
    try{
        const receptionists = await userRepository.findReceptionists();
        return {
            success: true,
            receptionists
        }
    }
    catch(error){
        return {
            success: false,
            errors: ['Aconteceu um erro durante a busca dos recepcionistas.']
        }
    }
}

async function getManagers() {
    try{
        const managers = await userRepository.findManagers();
        return {
            success: true,
            managers
        }
    }
    catch(error){
        return {
            success: false,
            errors: ['Aconteceu um erro durante a busca dos gerentes.']
        }
    }
}

module.exports = {
    createClient,
    createBarber,
    createReceptionist,
    createManager,
    updateUser,
    getUserById,
    deleteUserById,
    getClients,
    getBarbers,
    getReceptionists,
    getManagers
};
