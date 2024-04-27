/**
 * Valida os dados de entrada para criar um usuário.
 *
 * @param {Object} userData - Dados do usuário para validação.
 * @returns {string[]} - Lista de mensagens de erro, vazia se não houver erros.
 */
function validateCreateUser(userData) {
    const errors = [];
    if (!userData.name) {
        errors.push('Name is required.');
    }
    if (userData.name && userData.name.length < 3) {
        errors.push('Name must be at least 3 characters long.');
    }
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
        errors.push('Email must be a valid email address.');
    }
    return errors;
}

module.exports = {
    validateCreateUser
};
