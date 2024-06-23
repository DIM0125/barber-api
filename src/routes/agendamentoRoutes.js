const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: APIs para gerenciamento de agendamentos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Agendamento:
 *       type: object
 *       properties:
 *         id_barbeiro:
 *           type: integer
 *           description: ID do barbeiro associado ao agendamento
 *         id_cliente:
 *           type: integer
 *           description: ID do cliente associado ao agendamento
 *         id_servico:
 *           type: integer
 *           description: ID do serviço
 *         horario_agendamento:
 *           type: string
 *           description: "Horário do agendamento, formato: YYYY-MM-DD HH:MM:SS"
 *         status:
 *           type: string
 *           description: Status do agendamento (Agendado)
 *         avaliacao_comentario:
 *           type: string
 *           maxLength: 200
 *           nullable: true
 *           description: Comentário de avaliação do agendamento
 *         avaliacao_nota:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           nullable: true
 *           description: Nota de avaliação do agendamento (1 a 5)
 *       required:
 *         - id_barbeiro
 *         - id_cliente
 *         - horario_agendamento
 *         - status
 */

/**
 * @swagger
 * /agendamentos:
 *   get:
 *     summary: Retorna todos os agendamentos
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: Nenhum agendamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nenhum agendamento encontrado.
 */
router.get('/', authenticateToken, agendamentoController.getAllAgendamentos);

/**
 * @swagger
 * /agendamentos/{id}:
 *   get:
 *     summary: Retorna um agendamento por ID
 *     tags: [Agendamentos]
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
 *         description: Agendamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Agendamento não encontrado.
 */
router.get('/:id', authenticateToken, agendamentoController.getAgendamentoById);

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agendamento'
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Agendamento criado com sucesso.
 *                 agendamentoId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Erro na criação do agendamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Descrição do erro.
 */
router.post('/', authenticateToken, agendamentoController.createAgendamento);

/**
 * @swagger
 * /agendamentos/{id}:
 *   put:
 *     summary: Atualiza um agendamento por ID
 *     tags: [Agendamentos]
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
 *             $ref: '#/components/schemas/Agendamento'
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       400:
 *         description: Erro na atualização do agendamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Descrição do erro.
 *       404:
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Agendamento não encontrado.
 */
router.put('/:id', authenticateToken, agendamentoController.updateAgendamento);

/**
 * @swagger
 * /agendamentos/{id}:
 *   delete:
 *     summary: Deleta um agendamento por ID
 *     tags: [Agendamentos]
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
 *         description: Agendamento excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Agendamento excluído com sucesso.
 *       404:
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Agendamento não encontrado.
 */
router.delete('/:id', authenticateToken, agendamentoController.deleteAgendamento);

/**
 * @swagger
 * /agendamentos/barbeiro/{id}:
 *   get:
 *     summary: Retorna todos os agendamentos de um barbeiro
 *     tags: [Agendamentos]
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
 *         description: Lista de agendamentos do barbeiro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: Nenhum agendamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nenhum agendamento encontrado.
 */
router.get('/barbeiro/:id', authenticateToken, agendamentoController.getAgendamentosByBarbeiro);

module.exports = router;
