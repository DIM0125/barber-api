const logger = require('../utils/logger');
const {sendError} = require('../utils/response');

/**
 * Middleware de tratamento de erros para aplicações Express.
 * Captura qualquer erro lançado nas rotas ou middlewares anteriores e loga o erro automaticamente.
 * Retorna uma resposta de erro padronizada para o cliente.
 *
 * @param {Error} err - O erro capturado durante a requisição.
 * @param {Request} req - O objeto de requisição do Express.
 * @param {Response} res - O objeto de resposta do Express.
 * @param {NextFunction} next - A função de callback para passar o controle para o próximo middleware.
 */
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    if (statusCode === 500) {
        logger.error('Internal Server Error: %o', err);
    } else {
        logger.warn('Handled Error: %s - Status: %d', err.message, statusCode);
    }

    const message = statusCode === 500 ? 'Internal Server Error' : err.message;

    sendError(res, statusCode, message);
}

module.exports = errorHandler;
