// src/services/authService.js
const { generateToken } = require('../utils/authUtils');
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

/**
 * Valida as credenciais do usuário e gera um token JWT se forem válidas.
 * @param {string} username - Nome de usuário.
 * @param {string} password - Senha.
 * @returns {Object} - Um objeto contendo o resultado da operação.
 */
async function loginUser(username, password) {
    const user = await userRepository.findByUsername(username);

    if (!user) {
        return { success: false, message: 'Invalid credentials' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return { success: false, message: 'Invalid credentials' };
    }

    const token = generateToken(user);
    return { success: true, token };
}

module.exports = { loginUser };