const servicoRepository = require('../repositories/servicoRepository');

const createServico = async (servicoData) => {
  return await servicoRepository.create(servicoData);
};

const getAllServicos = async () => {
  return await servicoRepository.findAll();
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
  getServicoById,
  updateServico,
  deleteServico
};
