const express = require('express');
const connectDB = require('./config/database');
const orcamentoRoutes = require('./routes/orcamentoRoutes');

const app = express();

// Conecta ao banco de dados
connectDB();

// Middlewares
app.use(express.json());

// Rotas da API
app.use('/api/orcamentos', orcamentoRoutes);

// Rota de fallback para caminhos não encontrados
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

module.exports = app;