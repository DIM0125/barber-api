const produtoService = require('../services/produtoService');
const {sendSuccess, sendError} = require('../utils/response');

const createProduct = async (req, res, next) => {
    try {
        const {nome, descricao, quantidade_estoque, quantidade_minima} = req.body;
        const existingProduct = await produtoService.getProductByName(nome);

        if (!existingProduct) {
            const productId = await produtoService.createProduct({
                nome,
                descricao,
                quantidade_estoque,
                quantidade_minima
            });
            return sendSuccess(res, 200, {id_produto: productId});
        } else {
            const updatedQuantity = existingProduct.quantidade_estoque + quantidade_estoque;
            await produtoService.updateProduct(existingProduct.id_produto, {quantidade_estoque: updatedQuantity});
            return sendSuccess(res, 201, 'Quantidade do produto atualizada com sucesso');
        }
    } catch (error) {
        next(error);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const products = await produtoService.getAllProducts();
        return sendSuccess(res, 200, products); // 200 OK
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await produtoService.getProductById(req.params.id);
        if (!product) {
            return sendError(res, 404, 'Produto não encontrado'); // 404 Not Found
        }
        return sendSuccess(res, 200, product); // 200 OK
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const updated = await produtoService.updateProduct(req.params.id, req.body);
        if (updated === 0) {
            return sendError(res, 404, 'Produto não encontrado'); // 404 Not Found
        }
        return sendSuccess(res, 200, 'Produto atualizado com sucesso'); // 200 OK
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const deleted = await produtoService.deleteProduct(req.params.id);
        if (!deleted) {
            return sendError(res, 404, 'Produto não encontrado'); // 404 Not Found
        }
        return sendSuccess(res, 200, 'Produto deletado com sucesso'); // 200 OK
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
