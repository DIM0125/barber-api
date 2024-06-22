const barberService = require("../services/barberService");
const {sendSuccess, sendError} = require("../utils/response");

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

module.exports = {
    addToWorkSchedule,
    getWorkSchedule
};
