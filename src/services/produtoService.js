const produtoRepository = require('../repositories/produtoRepository');

const createProduct = async (productData) => {
  productData.data_ultima_modificacao = new Date();
  return await produtoRepository.create(productData);
};

const getAllProducts = async () => {
  return await produtoRepository.findAll();
};

const getProductById = async (id) => {
  return await produtoRepository.findById(id);
};

const updateProduct = async (id, productData) => {
  productData.data_ultima_modificacao = new Date();
  return await produtoRepository.update(id, productData);
};

const deleteProduct = async (id) => {
  return await produtoRepository.delete(id);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};