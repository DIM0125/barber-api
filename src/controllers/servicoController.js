const servicoService = require('../services/servicoService');
const { sendSuccess, sendError } = require('../utils/response');

const createServico = async (req, res, next) => {
  try {
    const { nome, descricao, duracao_estimada, preco } = req.body;
    const servicoData = {
      nome,
      descricao,
      duracao_estimada,
      preco
    };
    const servicoId = await servicoService.createServico(servicoData);
    return sendSuccess(res, 201, { id_servico: servicoId });
  } catch (error) {
    next(error);
  }
};

const getAllServicos = async (req, res, next) => {
  try {
    const servicos = await servicoService.getAllServicos();
    return sendSuccess(res, 200, servicos);
  } catch (error) {
    next(error);
  }
};

const getAllServicosByBarbeiroId = async (req, res, next) => {
  try {
    const servicos = await servicoService.getAllServicosByBarbeiroId(req.params.id);
    return sendSuccess(res, 200, servicos);
  } catch (error) {
    next(error);
  }
};

const getServicoById = async (req, res, next) => {
  try {
    const servicoId = req.params.id;
    const servico = await servicoService.getServicoById(servicoId);
    if (!servico) {
      return sendError(res, 404, 'Serviço não encontrado');
    }
    return sendSuccess(res, 200, servico);
  } catch (error) {
    next(error);
  }
};

const updateServico = async (req, res, next) => {
  try {
    const servicoId = req.params.id;
    const updated = await servicoService.updateServico(servicoId, req.body);
    if (updated === 0) {
      return sendError(res, 404, 'Serviço não encontrado');
    }
    return sendSuccess(res, 200, 'Serviço atualizado com sucesso');
  } catch (error) {
    next(error);
  }
};

const deleteServico = async (req, res, next) => {
  try {
    const servicoId = req.params.id;
    const deleted = await servicoService.deleteServico(servicoId);
    if (!deleted) {
      return sendError(res, 404, 'Serviço não encontrado');
    }
    return sendSuccess(res, 200, 'Serviço deletado com sucesso');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createServico,
  getAllServicos,
  getAllServicosByBarbeiroId,
  getServicoById,
  updateServico,
  deleteServico
};
