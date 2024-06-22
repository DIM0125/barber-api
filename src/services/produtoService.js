const produtoRepository = require('../repositories/produtoRepository');

const createProduct = async (productData) => {
  const existingProduct = await produtoRepository.findByName(productData.nome);
  
  if (existingProduct) {
    const updatedQuantity = existingProduct.quantidade_estoque + productData.quantidade_estoque;
    await produtoRepository.update(existingProduct.id_produto, { quantidade_estoque: updatedQuantity });
    return existingProduct.id_produto;
  } else {
    productData.data_ultima_modificacao = new Date();
    return await produtoRepository.create(productData);
  }
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

const getProductByName = async (name) => {
  return await produtoRepository.findByName(name);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByName
};
