require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// Apenas inicia o servidor se não estiver no ambiente de serverless da Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;