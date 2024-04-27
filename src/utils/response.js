/**
 * Envia uma resposta de sucesso ao cliente.
 *
 * @param {Response} res - O objeto de resposta Express.
 * @param {number} statusCode - O código de status HTTP.
 * @param {Object} data - O payload de dados a ser enviado.
 */
function sendSuccess(res, statusCode, data) {
    res.status(statusCode).json({
        success: true,
        data,
    });
}

/**
 * Envia uma resposta de erro ao cliente.
 *
 * @param {Response} res - O objeto de resposta Express.
 * @param {number} statusCode - O código de status HTTP.
 * @param {string} message - A mensagem de erro.
 */
function sendError(res, statusCode, message) {
    res.status(statusCode).json({
        success: false,
        error: message,
    });
}

module.exports = {
    sendSuccess,
    sendError,
};
