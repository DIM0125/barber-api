const barberService = require("../services/barberService");
const {sendSuccess, sendError} = require("../utils/response");
const {authenticateToken} = require("../middlewares/authMiddleware");

async function addToWorkSchedule(req, res) {
    const result = await barberService.addToWorkSchedule(req.body);
    if (result.success) {
        sendSuccess(res, 201, result.result);
    } else {
        sendError(res, 400, result.errors);
    }
}

async function getWorkSchedule(req, res) {
    const result = await barberService.getWorkSchedule(req.params.id);
    if (result.success) {
        sendSuccess(res, 200, result.result);
    } else {
        sendError(res, 404, result.message);
    }
}

async function removeWorkSchedule(req, res) {
    const result = await barberService.removeWorkSchedule(req.params.id, req.params.workScheduleId);
    if (result.success) {
        sendSuccess(res, 200, result.message);
    } else {
        sendError(res, 404, result.message);
    }
}

async function getHorarios(req, res) {
    const result = await barberService.getHorarios(req.params.id);
    if (result.success) {
        sendSuccess(res, 200, result.result);
    } else {
        sendError(res, 404, result.message);
    }
}

module.exports = {
    addToWorkSchedule,
    getWorkSchedule,
    removeWorkSchedule,
    getHorarios
};
