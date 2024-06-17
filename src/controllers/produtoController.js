const produtoService = require('../services/produtoService');
const { sendSuccess, sendError } = require('../utils/response');

const createProduct = async (req, res) => {
  try {
    const productId = await produtoService.createProduct(req.body);
    return sendSuccess(res, 201, { id_produto: productId }); // 201 Created
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Erro ao criar o produto'); // 500 Internal Server Error
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await produtoService.getAllProducts();
    return sendSuccess(res, 200, products); // 200 OK
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Erro ao buscar os produtos'); // 500 Internal Server Error
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await produtoService.getProductById(req.params.id);
    if (!product) {
      return sendError(res, 404, 'Produto não encontrado'); // 404 Not Found
    }
    return sendSuccess(res, 200, product); // 200 OK
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Erro ao buscar o produto'); // 500 Internal Server Error
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await produtoService.updateProduct(req.params.id, req.body);
    if (updated === 0) {
      return sendError(res, 404, 'Produto não encontrado'); // 404 Not Found
    }
    return sendSuccess(res, 200, 'Produto atualizado com sucesso'); // 200 OK
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Erro ao atualizar o produto'); // 500 Internal Server Error
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await produtoService.deleteProduct(req.params.id);
    if (!deleted) {
      return sendError(res, 404, 'Produto não encontrado'); // 404 Not Found
    }
    return sendSuccess(res, 200, 'Produto deletado com sucesso'); // 200 OK
  } catch (error) {
    console.error(error);
    return sendError(res, 500, 'Erro ao deletar o produto'); // 500 Internal Server Error
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
