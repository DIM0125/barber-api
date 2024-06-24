const precoRepository = require('../repositories/precoRepository');

async function createPreco(id_servico, preco) {
    const servicoExists = await precoRepository.servicoExists(id_servico);
    if (!servicoExists) {
        throw new Error(`Serviço com id ${id_servico} não encontrado.`);
    }
    const precoExists = await precoRepository.precoExists(id_servico, preco);
    if (precoExists) {
        throw new Error(`Já existe um preço de ${preco} para o serviço com id ${id_servico}.`);
    }
    await precoRepository.createPreco(id_servico, preco);
}

async function updatePreco(precoId, novoPreco) {
    await precoRepository.updatePreco(precoId, novoPreco);
}

async function getAllPrecos() {
    return await precoRepository.getAllPrecos();
}

async function deletePreco(precoId) {
    const precoExists = await precoRepository.precoExistsById(precoId);
    if (!precoExists) {
        throw new Error(`Preço com id ${precoId} não encontrado.`);
    }
    await precoRepository.deletePreco(precoId);
}

module.exports = {
    createPreco,
    updatePreco,
    getAllPrecos,
    deletePreco
};
