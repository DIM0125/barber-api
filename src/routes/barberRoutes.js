const express = require('express');
const router = express.Router();
const barberController = require('../controllers/barberController');
const {authenticateToken} = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Barber
 *   description: API para gerenciamento de barbeiros
 */

/**
 * @swagger
 * /barber/:id/add-work-schedule:
 *   post:
 *     summary: Adicionar horário de trabalho à agenda do barbeiro
 *     description: Adiciona um novo horário de trabalho à agenda de um barbeiro específico.
 *     tags: [Barber]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do barbeiro
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
 *                 example: 1
 *               dia_da_semana:
 *                 type: string
 *                 format: date
 *                 description: Dia da semana (AAAA-MM-DD)
 *                 example: "2023-06-22"
 *               horario_inicio:
 *                 type: string
 *                 format: time
 *                 description: Horário de início (HH:MM:SS)
 *                 example: "09:00:00"
 *               horario_fim:
 *                 type: string
 *                 format: time
 *                 description: Horário de fim (HH:MM:SS)
 *                 example: "17:00:00"
 *     responses:
 *       201:
 *         description: Horário adicionado à agenda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Horário adicionado à agenda.
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Erro ao adicionar horário à agenda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Horário em conflito com horário já cadastrado"]
 */
router.post('/:id/add-work-schedule', authenticateToken, barberController.addToWorkSchedule);

/**
 * @swagger
 * /barber/{id}/work-schedule:
 *   get:
 *     summary: Retorna os horários de trabalho de um barbeiro
 *     tags: [Barber]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do barbeiro
 *     responses:
 *       200:
 *         description: Horários de trabalho do barbeiro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 workSchedule:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       id_barbeiro:
 *                         type: integer
 *                         example: 1
 *                       dia_da_semana:
 *                         type: string
 *                         format: date
 *                         example: "2023-06-22"
 *                       horario_inicio:
 *                         type: string
 *                         format: time
 *                         example: "09:00:00"
 *                       horario_fim:
 *                         type: string
 *                         format: time
 *                         example: "17:00:00"
 *       404:
 *         description: Barbeiro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Barbeiro não encontrado.
 */
router.get('/:id/work-schedule', authenticateToken, barberController.getWorkSchedule);

/**
 * @swagger
 * /barber/{id}/work-schedule/{workScheduleId}:
 *   delete:
 *     summary: Remove um horário de trabalho do barbeiro
 *     tags: [Barber]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do barbeiro
 *       - in: path
 *         name: workScheduleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do horário de trabalho
 *     responses:
 *       200:
 *         description: Horário removido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Horário removido.
 *       404:
 *         description: Horário de trabalho não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Horário de trabalho não encontrado.
 */
router.delete('/:id/work-schedule/:workScheduleId', authenticateToken, barberController.removeWorkSchedule);

router.get('/:id/horarios', authenticateToken, barberController.getHorarios);

module.exports = router;
