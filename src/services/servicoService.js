const servicoRepository = require('../repositories/servicoRepository');

const createServico = async (servicoData) => {
  return await servicoRepository.create(servicoData);
};

const getAllServicos = async () => {
  return await servicoRepository.findAll();
};

const getAllServicosByBarbeiroId = async (barbeiroId) => {
  return await servicoRepository.findAllServicesByBarbeiroId(barbeiroId);
};

const getServicoById = async (id) => {
  return await servicoRepository.findById(id);
};

const updateServico = async (id, servicoData) => {
  return await servicoRepository.update(id, servicoData);
};

const deleteServico = async (id) => {
  return await servicoRepository.delete(id);
};

module.exports = {
  createServico,
  getAllServicos,
  getAllServicosByBarbeiroId,
  getServicoById,
  updateServico,
  deleteServico
};
