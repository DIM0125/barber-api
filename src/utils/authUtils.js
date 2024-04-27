const jwt = require('jsonwebtoken');

/**
 * Gera um token JWT para um usuário.
 * @param {Object} user - O objeto do usuário para quem o token será gerado.
 * @returns {string} - Um token JWT.
 */
function generateToken(user) {
    const payload = {id: user.id, username: user.username};
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'});
}

module.exports = {generateToken};
