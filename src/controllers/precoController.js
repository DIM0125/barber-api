const precoService = require('../services/precoService');
const { sendSuccess, sendError } = require('../utils/response');

async function createPreco(req, res) {
    try {
        const { id_servico, preco } = req.body;
        await precoService.createPreco(id_servico, preco);
        sendSuccess(res, 201, { message: 'Preço criado com sucesso.' });
    } catch (error) {
        sendError(res, 400, error.message);
    }
}

async function updatePreco(req, res) {
    try {
        const precoId = req.params.id;
        const novoPreco = req.body.preco;
        await precoService.updatePreco(precoId, novoPreco);
        sendSuccess(res, 200, { message: 'Preço atualizado com sucesso.' });
    } catch (error) {
        sendError(res, 400, error.message);
    }
}

async function getAllPrecos(req, res) {
    try {
        const precos = await precoService.getAllPrecos();
        sendSuccess(res, 200, precos);
    } catch (error) {
        sendError(res, 500, error.message);
    }
}

async function deletePreco(req, res) {
    try {
        const precoId = req.params.id;
        await precoService.deletePreco(precoId);
        sendSuccess(res, 200, { message: 'Preço removido com sucesso.' });
    } catch (error) {
        sendError(res, 400, error.message);
    }
}

module.exports = {
    createPreco,
    updatePreco,
    getAllPrecos,
    deletePreco
};
