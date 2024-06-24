const express = require('express');
const cors = require('cors');
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
const barberRoutes = require('./src/routes/barberRoutes');
const precoRoutes = require('./src/routes/precoRoutes');
const prestaServicoRoutes = require('./src/routes/prestaServicoRoutes');
const { setupSwagger } = require("./src/config/swagger");

// Criando a aplicação Express
const app = express();

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Configurações do CORS
const corsOptions = {
    origin: '*',
    methods: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware para analisar o corpo das requisições JSON
app.use(bodyParser.json());

// Configurações de rotas
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/products', produtoRoutes);
app.use('/auth', authRoutes);
app.use('/barber', barberRoutes);
app.use('/servicos', servicoRoutes);
app.use('/presta-servico', prestaServicoRoutes);  // Ajustando a rota para kebab-case

// Configura o Swagger
setupSwagger(app);

// Middleware de erro
app.use(errorHandler);

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
