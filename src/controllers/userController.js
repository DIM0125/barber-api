const userService = require('../services/userService');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * Controlador para criar um usuário.
 * @param {Request} req - O objeto de requisição do Express.
 * @param {Response} res - O objeto de resposta do Express.
 */
async function createCliente(req, res) {
    const result = await userService.createCliente(req.body);
    if (result.success) {
        sendSuccess(res, 201, { message: 'Usuário criado com sucesso.', userId: result.userId });
    } else {
        sendError(res, 400, result.errors);
    }
}

async function createBarbeiro(req, res) {
    const result = await userService.createBarbeiro(req.body);
    if (result.success) {
        sendSuccess(res, 201, { message: 'Usuário criado com sucesso.', userId: result.userId });
    } else {
        sendError(res, 400, result.errors);
    }
}

async function createRecepcionista(req, res) {
    const result = await userService.createRecepcionista(req.body);
    if (result.success) {
        sendSuccess(res, 201, { message: 'Usuário criado com sucesso.', userId: result.userId });
    } else {
        sendError(res, 400, result.errors);
    }
}

async function createGerente(req, res) {
    const result = await userService.createGerente(req.body);
    if (result.success) {
        sendSuccess(res, 201, { message: 'Usuário criado com sucesso.', userId: result.userId });
    } else {
        sendError(res, 400, result.errors);
    }
}

async function getUserById(req, res) {
    
    const result = await userService.getUserById(req.params.id);
    if (result.success) {
        sendSuccess(res, 200, result.user);
    } else {
        sendError(res, 404, result.errors.join(', '));
    }
}

async function deleteUserById(req, res) {
    const result = await userService.deleteUserById(req.params.id);
    if (result.success) {
        sendSuccess(res, 200, { message: 'Usuário excluído com sucesso.' });
    } else {
        sendError(res, 404, result.errors);
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
