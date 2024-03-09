const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware  = require('./src/config/errorMiddleware');

// Importando as rotas definidas
const customerRoutes = require('./src/routes/customerRoutes');
const indexRoutes = require('./src/routes/index');

// Criando a aplicação Express
const app = express();

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições JSON
app.use(bodyParser.json());

// Configurações de rotas
app.use('/api', customerRoutes);
app.use('/', indexRoutes);

// Middleware de erro
app.use(errorMiddleware);

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
