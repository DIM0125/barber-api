/**
 * Valida os dados de entrada para criar um usuário.
 *
 * @param {Object} userData - Dados do usuário para validação.
 * @returns {string[]} - Lista de mensagens de erro, vazia se não houver erros.
 */
function validateCreateUser(userData) {
    const errors = [];
    if (!userData.name) {
        errors.push('Um nome deve ser informado.');
    }
    if (userData.name && userData.name.length < 3) {
        errors.push('O nome deve ter pelo menos 3 caracteres.');
    }
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
        errors.push('O email deve ser um endereço válido.');
    }
    return errors;
}

module.exports = {
    validateCreateUser
};
