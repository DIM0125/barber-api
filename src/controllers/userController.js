const userService = require('../services/userService');
const {sendSuccess, sendError} = require('../utils/response');

/**
 * Controlador para criar um usuário.
 * @param {Request} req - O objeto de requisição do Express.
 * @param {Response} res - O objeto de resposta do Express.
 */
async function createClient(req, res) {
    const result = await userService.createClient(req.body);
    if (result.success) {
        sendSuccess(res, 201, {message: 'Usuário criado com sucesso.', userId: result.userId});
    } else {
        sendError(res, 400, result.errors);
    }
}

async function getClients(req, res) {
    const result = await userService.getClients();
    if (result.success) {
        sendSuccess(res, 200, result.clients);
    } else {
        sendError(res, 404, result.errors);
    }
}

async function getBarbers(req, res) {
    const result = await userService.getBarbers();
    if (result.success) {
        sendSuccess(res, 200, result.barbers);
    } else {
        sendError(res, 404, result.errors);
    }
}

async function getBarbersByService(req, res) {
    const result = await userService.getBarbersByService(req.params.id);
    if (result.success) {
        sendSuccess(res, 200, result.barbers);
    } else {
        sendError(res, 404, result.errors);
    }
}

async function getReceptionists(req, res) {
    const result = await userService.getReceptionists();
    if (result.success) {
        sendSuccess(res, 200, result.receptionists);
    } else {
        sendError(res, 404, result.errors);
    }
}

async function getManagers(req, res) {
    const result = await userService.getManagers();
    if (result.success) {
        sendSuccess(res, 200, result.managers);
    } else {
        sendError(res, 404, result.errors);
    }
}

async function createBarber(req, res) {
    const result = await userService.createBarber(req.body);
    if (result.success) {
        sendSuccess(res, 201, {message: 'Usuário criado com sucesso.', userId: result.userId});
    } else {
        sendError(res, 400, result.errors);
    }
}

async function createReceptionist(req, res) {
    const result = await userService.createReceptionist(req.body);
    if (result.success) {
        sendSuccess(res, 201, {message: 'Usuário criado com sucesso.', userId: result.userId});
    } else {
        sendError(res, 400, result.errors);
    }
}

async function createManager(req, res) {
    const result = await userService.createManager(req.body);
    if (result.success) {
        sendSuccess(res, 201, {message: 'Usuário criado com sucesso.', userId: result.userId});
    } else {
        sendError(res, 400, result.errors);
    }
}

async function updateUser(req, res) {
    const result = await userService.updateUser(req.params.id, req.body);
    if (result.success) {
        const user = result.user;
        sendSuccess(res, 200, {message: 'Usuário atualizado com sucesso.', user});
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
        sendSuccess(res, 200, {message: 'Usuário excluído com sucesso.'});
    } else {
        sendError(res, 404, result.errors);
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
    getManagers,
    getBarbersByService
};
