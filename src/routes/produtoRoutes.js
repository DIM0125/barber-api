const express = require('express');
const router = express.Router();
const productController = require('../controllers/produtoController');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API para gerenciamento de produtos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     description: Nome do produto
 *                     example: "Produto Exemplo"
 *                   descricao:
 *                     type: string
 *                     description: Descrição do produto
 *                     example: "Descrição do produto exemplo"
 *                   quantidade_estoque:
 *                     type: integer
 *                     description: Quantidade em estoque
 *                     example: 100
 *                   quantidade_minima:
 *                     type: integer
 *                     description: Quantidade mínima
 *                     example: 10
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *                 example: "Produto Exemplo"
 *               descricao:
 *                 type: string
 *                 description: Descrição do produto
 *                 example: "Descrição do produto exemplo"
 *               quantidade_estoque:
 *                 type: integer
 *                 description: Quantidade em estoque
 *                 example: 100
 *               quantidade_minima:
 *                 type: integer
 *                 description: Quantidade mínima
 *                 example: 10
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto criado com sucesso.
 *                 productId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Erro ao criar produto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Nome do produto já existe"]
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna um produto por ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   description: Nome do produto
 *                   example: "Produto Exemplo"
 *                 descricao:
 *                   type: string
 *                   description: Descrição do produto
 *                   example: "Descrição do produto exemplo"
 *                 quantidade_estoque:
 *                   type: integer
 *                   description: Quantidade em estoque
 *                   example: 100
 *                 quantidade_minima:
 *                   type: integer
 *                   description: Quantidade mínima
 *                   example: 10
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto não encontrado.
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto por ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *               descricao:
 *                 type: string
 *                 description: Descrição do produto
 *               quantidade_estoque:
 *                 type: integer
 *                 description: Quantidade em estoque
 *               quantidade_minima:
 *                 type: integer
 *                 description: Quantidade mínima
 *             example:
 *               nome: "Produto Atualizado"
 *               descricao: "Descrição do produto atualizado"
 *               quantidade_estoque: 150
 *               quantidade_minima: 20
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar produto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Quantidade mínima não pode ser maior que a quantidade em estoque"]
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto não encontrado.
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Exclui um produto por ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto excluído com sucesso.
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto não encontrado.
 */

router.get('/', authenticateToken, productController.getAllProducts);
router.post('/', authenticateToken, productController.createProduct);
router.get('/:id', authenticateToken, productController.getProductById);
router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
