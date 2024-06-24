const prestaServicoService = require('../services/prestaServicoService');
const { sendSuccess, sendError } = require('../utils/response');

async function createPrestaServico(req, res) {
    try {
        const { id_barbeiro, id_servico } = req.body;
        await prestaServicoService.createPrestaServico(id_barbeiro, id_servico);
        sendSuccess(res, 201, { message: 'Serviço associado com sucesso.' });
    } catch (error) {
        sendError(res, 400, error.message);
    }
}

async function getAllPrestaServico(req, res) {
    try {
        const prestaServico = await prestaServicoService.getAllPrestaServico();
        sendSuccess(res, 200, prestaServico);
    } catch (error) {
        sendError(res, 500, error.message);
    }
}

async function deletePrestaServico(req, res) {
    try {
        const { id_barbeiro, id_servico } = req.params;
        await prestaServicoService.deletePrestaServico(id_barbeiro, id_servico);
        sendSuccess(res, 200, { message: 'Associação deletada com sucesso.' });
    } catch (error) {
        sendError(res, 400, error.message);
    }
}

module.exports = {
    createPrestaServico,
    getAllPrestaServico,
    deletePrestaServico
};
