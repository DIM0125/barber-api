const userRepository = require('../repositories/userRepository');

async function validateCreateUser(userData, tipoUsuario) {
    const errors = [];

    if (userData.email && await userRepository.existsByEmail(userData.email)) {
        errors.push('O email informado já foi cadastrado.');
    }

    if (userData.telefone && await userRepository.existsByTelefone(userData.telefone)) {
        errors.push('O telefone informado já foi cadastrado.');
    }

    if (!userData.nome) {
        errors.push('Um nome deve ser informado.');
    }

    if (userData.nome && userData.nome.length < 3) {
        errors.push('O nome deve ter pelo menos 3 caracteres.');
    }

    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
        errors.push('O email deve ser um endereço válido.');
    }

    if(!userData.telefone || !checkTelefoneMask(userData.telefone)) {
        errors.push('O telefone deve ter o formato (xx) xxxxx-xxxx.');
    }

    if (!userData.senha) {
        errors.push('Uma senha deve ser informada.');
    }

    return errors;
}



function checkTelefoneMask(telefone) {
    const regex = /^(\(\d{2}\))\s*\d{5}-\d{4}$/;
    
    return regex.test(telefone);
}

module.exports = {
    validateCreateUser
};
