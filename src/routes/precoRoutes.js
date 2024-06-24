const express = require('express');
const router = express.Router();
const precoController = require('../controllers/precoController');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Precos
 *   description: APIs para gerenciamento de preços dos serviços
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Preco:
 *       type: object
 *       properties:
 *         id_preco:
 *           type: integer
 *           description: ID do preço
 *         id_servico:
 *           type: integer
 *           description: ID do serviço associado ao preço
 *         atual:
 *           type: boolean
 *           description: Indica se o preço é o atual ou não
 *         valor:
 *           type: number
 *           format: float
 *           description: Valor do serviço
 *         data:
 *           type: string
 *           format: date
 *           description: Data de vigência do preço
 *       required:
 *         - id_preco
 *         - id_servico
 *         - atual
 *         - valor
 *         - data
 */

/**
 * @swagger
 * /precos:
 *   get:
 *     summary: Retorna todos os preços dos serviços
 *     tags: [Precos]
 *     responses:
 *       200:
 *         description: Lista de preços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Preco'
 *       404:
 *         description: Nenhum preço encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nenhum preço encontrado.
 */
router.get('/', authenticateToken, precoController.getAllPrecos);

/**
 * @swagger
 * /precos:
 *   post:
 *     summary: Cria um novo preço para um serviço
 *     tags: [Precos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_servico:
 *                 type: integer
 *                 description: ID do serviço
 *               preco:
 *                 type: number
 *                 format: float
 *                 description: Preço do serviço
 *     responses:
 *       201:
 *         description: Preço criado com sucesso
 *       400:
 *         description: Erro na criação do preço
 */
router.post('/', authenticateToken, precoController.createPreco);

/**
 * @swagger
 * /precos/{id}:
 *   put:
 *     summary: Atualiza o preço de um serviço
 *     tags: [Precos]
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
 *               preco:
 *                 type: number
 *                 format: float
 *                 description: Novo preço do serviço
 *     responses:
 *       200:
 *         description: Preço atualizado com sucesso
 *       400:
 *         description: Erro na atualização do preço
 *       404:
 *         description: Preço não encontrado
 */
router.put('/:id', authenticateToken, precoController.updatePreco);

/**
 * @swagger
 * /precos/{id}:
 *   delete:
 *     summary: Remove um preço de um serviço pelo ID do preço
 *     tags: [Precos]
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
 *         description: Preço removido com sucesso
 *       400:
 *         description: Erro na remoção do preço
 *       404:
 *         description: Preço não encontrado
 */
router.delete('/:id', authenticateToken, precoController.deletePreco);

module.exports = router;
