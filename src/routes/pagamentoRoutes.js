const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Pagamento
 *   descrição: APIs para gerenciamento de pagamentos
 */

/**
 * @swagger
 * /pagamentos:
 *   post:
 *     sumário: Cria um novo pagamento
 *     tags: [Pagamento]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_agendamento:
 *                 type: integer
 *                 description: ID do agendamento
 *               id_cliente:
 *                 type: integer
 *                 description: ID do cliente
 *               id_recepcionista:
 *                 type: integer
 *                 description: ID do recepcionista
 *               status:
 *                 type: string
 *                 description: Status do pagamento
 *               valor:
 *                 type: number
 *                 description: Valor do pagamento
 *               forma_pagamento:
 *                 type: string
 *                 description: Forma de pagamento
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso
 *       400:
 *         description: Erro na criação do pagamento
 */
router.post('/', authenticateToken, pagamentoController.createPagamento);

/**
 * @swagger
 * /pagamentos:
 *   get:
 *     summary: Retorna todos os pagamentos
 *     tags: [Pagamento]
 *     responses:
 *       200:
 *         description: Lista de pagamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pagamento'
 *       404:
 *         description: Nenhum pagamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nenhum pagamento encontrado.
 */
router.get('/', authenticateToken, pagamentoController.getAllPagamentos);

/**
 * @swagger
 * /pagamentos/{id}:
 *   get:
 *     summary: Retorna um pagamento pelo ID
 *     tags: [Pagamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pagamento encontrado
 *       404:
 *         description: Pagamento não encontrado
 */
router.get('/:id', authenticateToken, pagamentoController.getPagamentoById);

/**
 * @swagger
 * /pagamentos/{id}:
 *   put:
 *     summary: Atualiza um pagamento pelo ID
 *     tags: [Pagamento]
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
 *               status:
 *                 type: string
 *               valor:
 *                 type: number
 *               forma_pagamento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pagamento atualizado com sucesso
 *       400:
 *         description: Erro na atualização do pagamento
 *       404:
 *         description: Pagamento não encontrado
 */
router.put('/:id', authenticateToken, pagamentoController.updatePagamento);

/**
 * @swagger
 * /pagamentos/{id}:
 *   delete:
 *     summary: Deleta um pagamento pelo ID
 *     tags: [Pagamento]
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
 *         description: Pagamento deletado com sucesso
 *       400:
 *         description: Erro na deleção do pagamento
 *       404:
 *         description: Pagamento não encontrado
 */
router.delete('/:id', authenticateToken, pagamentoController.deletePagamento);

module.exports = router;
