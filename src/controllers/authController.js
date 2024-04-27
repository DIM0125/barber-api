const {loginUser} = require('../services/authService');
const {sendSuccess, sendError} = require('../utils/response');

/**
 * Handle login requests.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function login(req, res) {
    const {username, password} = req.body;
    const result = await loginUser(username, password);

    if (result.success) {
        sendSuccess(res, 200, {token: result.token});
    } else {
        sendError(res, 401, result.message);
    }
}

module.exports = {login};
