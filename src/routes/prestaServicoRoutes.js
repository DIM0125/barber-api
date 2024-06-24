const express = require('express');
const router = express.Router();
const prestaServicoController = require('../controllers/prestaServicoController');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: PrestaServico
 *   description: APIs para gerenciamento dos serviços prestados pelos barbeiros
 */

/**
 * @swagger
 * /presta-servico:
 *   post:
 *     summary: Associa um serviço a um barbeiro
 *     tags: [PrestaServico]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_barbeiro:
 *                 type: integer
 *                 description: ID do barbeiro
 *               id_servico:
 *                 type: integer
 *                 description: ID do serviço
 *     responses:
 *       201:
 *         description: Serviço associado com sucesso
 *       400:
 *         description: Erro na associação do serviço
 */
router.post('/', authenticateToken, prestaServicoController.createPrestaServico);

/**
 * @swagger
 * /presta-servico:
 *   get:
 *     summary: Retorna todos os serviços prestados pelos barbeiros
 *     tags: [PrestaServico]
 *     responses:
 *       200:
 *         description: Lista de serviços prestados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_barbeiro:
 *                     type: integer
 *                   id_servico:
 *                     type: integer
 *       404:
 *         description: Nenhum serviço prestado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nenhum serviço prestado encontrado.
 */
router.get('/', authenticateToken, prestaServicoController.getAllPrestaServico);

/**
 * @swagger
 * /presta-servico/{id_barbeiro}/{id_servico}:
 *   delete:
 *     summary: Remove a associação de um serviço a um barbeiro
 *     tags: [PrestaServico]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_barbeiro
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_servico
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Associação deletada com sucesso
 *       400:
 *         description: Erro ao deletar a associação
 *       404:
 *         description: Associação não encontrada
 */
router.delete('/:id_barbeiro/:id_servico', authenticateToken, prestaServicoController.deletePrestaServico);

module.exports = router;
