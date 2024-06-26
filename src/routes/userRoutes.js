const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateToken} = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gerenciamento de usuários
 */


router.get('/clients', authenticateToken, userController.getClients);
router.get('/managers', authenticateToken, userController.getManagers);
router.get('/barbers', authenticateToken, userController.getBarbers);
router.get('/barbers/service/:id', authenticateToken, userController.getBarbersByService);
router.get('/receptionists', authenticateToken, userController.getReceptionists);

/**
 * @swagger
 * /users/client:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Users]
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
 *                 description: Nome do cliente
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 description: Email do cliente
 *                 example: joao.silva@example.com
 *               senha:
 *                 type: string
 *                 description: Senha do cliente
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário criado com sucesso.
 *                 userId:
 *                   type: string
 *                   example: 12345
 *       400:
 *         description: Erro na criação do cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Email já está em uso
 */
router.post('/client', userController.createClient);

router.post('/barber', authenticateToken, userController.createBarber);
router.post('/receptionist', authenticateToken, userController.createReceptionist);
router.post('/manager', authenticateToken, userController.createManager);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUserById);

module.exports = router;
