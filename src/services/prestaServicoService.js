const prestaServicoRepository = require('../repositories/prestaServicoRepository');

async function createPrestaServico(id_barbeiro, id_servico) {
    await prestaServicoRepository.createPrestaServico(id_barbeiro, id_servico);
}

async function getAllPrestaServico() {
    return await prestaServicoRepository.getAllPrestaServico();
}

async function deletePrestaServico(id_barbeiro, id_servico) {
    await prestaServicoRepository.deletePrestaServico(id_barbeiro, id_servico);
}

module.exports = {
    createPrestaServico,
    getAllPrestaServico,
    deletePrestaServico
};
