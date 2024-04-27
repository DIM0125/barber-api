const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');

/**
 * Middleware de autenticação que verifica o token JWT no cabeçalho 'Authorization'.
 * @returns {Function} - Um middleware Express.
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return sendError(res, 401, 'No token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return sendError(res, 403, 'Token is invalid');
        }

        req.user = user;  // Adiciona os dados do usuário ao objeto de solicitação
        next();
    });
}

module.exports = authenticateToken;
