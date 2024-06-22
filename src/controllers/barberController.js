const barberService = require("../services/barberService");
const {sendSuccess, sendError} = require("../utils/response");

async function addToWorkSchedule(req, res) {
    const result = await barberService.addToWorkSchedule(req.body);
    if (result.success) {
        sendSuccess(res, 201, {message: 'Horário adicionado à agenda.', userId: result.userId});
    } else {
        sendError(res, 400, result.errors);
    }
}

module.exports = {
    addToWorkSchedule
};
