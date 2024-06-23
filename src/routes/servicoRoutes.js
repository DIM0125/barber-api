const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');
const {authenticateToken} = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Servicos
 *   description: API para gerenciamento de serviços
 */

/**
 * @swagger
 * /servicos:
 *   get:
 *     summary: Retorna todos os serviços
 *     tags: [Servicos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servico'
 */
router.get('/', servicoController.getAllServicos);

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cria um novo serviço
 *     tags: [Servicos]
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
 *                 description: Nome do serviço
 *                 example: Corte de cabelo
 *               descricao:
 *                 type: string
 *                 description: Descrição do serviço
 *                 example: Corte de cabelo masculino
 *               duracao_estimada:
 *                 type: integer
 *                 description: Duração estimada do serviço em minutos
 *                 example: 60
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serviço criado com sucesso.
 *                 id_servico:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Erro na criação do serviço
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Nome do serviço já existe
 */
router.post('/', authenticateToken, servicoController.createServico);

/**
 * @swagger
 * /servicos/{id}:
 *   get:
 *     summary: Retorna um serviço por ID
 *     tags: [Servicos]
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
 *         description: Serviço encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servico'
 *       404:
 *         description: Serviço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serviço não encontrado.
 */
router.get('/:id', authenticateToken, servicoController.getServicoById);

/**
 * @swagger
 * /servicos/{id}:
 *   put:
 *     summary: Atualiza um serviço por ID
 *     tags: [Servicos]
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
 *                 description: Nome do serviço
 *                 example: Corte de cabelo
 *               descricao:
 *                 type: string
 *                 description: Descrição do serviço
 *                 example: Corte de cabelo masculino atualizado
 *               duracao_estimada:
 *                 type: integer
 *                 description: Duração estimada do serviço em minutos
 *                 example: 60
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serviço atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar serviço
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Nome do serviço já existe
 *       404:
 *         description: Serviço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serviço não encontrado.
 */
router.put('/:id', authenticateToken, servicoController.updateServico);

/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     summary: Exclui um serviço por ID
 *     tags: [Servicos]
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
 *         description: Serviço excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serviço excluído com sucesso.
 *       404:
 *         description: Serviço não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serviço não encontrado.
 */
router.delete('/:id', authenticateToken, servicoController.deleteServico);

module.exports = router;
