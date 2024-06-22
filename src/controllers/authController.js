const {loginUser} = require('../services/authService');
const {sendSuccess, sendError} = require('../utils/response');

/**
 * Handle login requests.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
async function login(req, res, next) {
    try {
        const {username, password} = req.body;
        const result = await loginUser(username, password);

        if (result.success) {
            sendSuccess(res, 200, {token: result.token});
        } else {
            sendError(res, 401, result.message);
        }
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
}

module.exports = {login};
