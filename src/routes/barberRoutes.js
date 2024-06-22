const express = require('express');
const router = express.Router();
const barberController = require('../controllers/barberController');
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/:id/add-work-schedule', authenticateToken, barberController.addToWorkSchedule);

module.exports = router;
