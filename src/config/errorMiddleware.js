const errorMiddleware = (err, req, res, next) => {
    // Aqui você pode adicionar logs de erro com mais detalhes, como:
    console.error(err.stack);

    // Define o status do erro ou usa o status 500 como fallback
    const status = err.status || 500;

    res.status(status).json({
        status: 'error',
        message: err.message,
    });
};

module.exports = errorMiddleware;
