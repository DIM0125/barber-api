const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./src/middlewares/errorHandler.js');

// Configuração das variáveis de ambiente
require('dotenv').config();

// Importando as rotas definidas
const userRoutes = require('./src/routes/userRoutes');
const agendamentoRoutes = require('./src/routes/agendamentoRoutes');
const servicoRoutes = require('./src/routes/servicoRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');
const indexRoutes = require('./src/routes/index');
const authRoutes = require('./src/routes/authRoutes');

// Criando a aplicação Express
const app = express();

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições JSON
app.use(bodyParser.json());

// Configurações de rotas
app.use('/', indexRoutes);
app.use('/usuarios', userRoutes);
app.use('/agendamentos', agendamentoRoutes);
// app.use('/servicos', servicoRoutes);
// app.use('/produtos', produtosRoutes);
app.use('/auth', authRoutes);

// Middleware de erro
app.use(errorHandler);

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
