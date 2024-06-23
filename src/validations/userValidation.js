const userRepository = require('../repositories/userRepository');

async function validateCreateUser(userData) {
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

    if(userData.telefone && !checkTelefoneMask(userData.telefone)) {
        errors.push('O telefone deve ter o formato (xx) xxxxx-xxxx.');
    }

    if (!userData.senha) {
        errors.push('Uma senha deve ser informada.');
    }

    switch (userData.role) {
        case "CLIENT": return errors;
            break;
        case "BARBER": return validateCreateEmployee(userData, errors);
            break;
        case "RECEPT": return validateCreateEmployee(userData, errors);
            break;
        case "MANAGER": return validateCreateEmployee(userData, errors);
            break;
        default:
            return errors.push("Forneça um tipo de usuário válido.");
    }
}

async function validateCreateEmployee(userData, errors) {
    if(userData.cpf && !checkCpfMask(userData.cpf)) {
        errors.push('O CPF deve ter o formato 999.999.999-99.');
    }

    if(userData.cpf && await userRepository.existsByCpf(userData.cpf)) {
        errors.push('O CPF informado já foi cadastrado.');
    }

    if(userData.data_contratacao && !Date(userData.data_contratacao)) {
        errors.push('A data de contratação deve ser uma data válida.');
    }

    if(userData.role === "BARBER" && !userData.percentual_comissao) {
        errors.push('O percentual de comissão deve ser informado.');
    }

    if(userData.role === "BARBER" && userData.percentual_comissao > 1 || userData.percentual_comissao < 0) {
        errors.push('O percentual de comissão deve ser um número entre 0 e 1.');
    }

    return errors;
}

const checkCpfMask = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    return regex.test(cpf);
}

function checkTelefoneMask(telefone) {
    const regex = /^(\(\d{2}\))\s*\d{5}-\d{4}$/;

    return regex.test(telefone);
}

module.exports = {
    validateCreateUser
};
