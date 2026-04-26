import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/leadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {

  res.json({ message: 'API Maison Mobile funcionando!' });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
