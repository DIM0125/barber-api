const userService = require('../services/userService');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * Controlador para criar um usuário.
 * @param {Request} req - O objeto de requisição do Express.
 * @param {Response} res - O objeto de resposta do Express.
 */
async function createUser(req, res) {
    const result = await userService.createUser(req.body);
    if (result.success) {
        sendSuccess(res, 201, { message: 'Usuário criado com sucesso.', userId: result.userId });
    } else {
        sendError(res, 400, result.errors.join(', '));
    }
}

module.exports = {
    createUser
};
