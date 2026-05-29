const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('\n⚠️  ALERTA: A variável MONGODB_URI não está definida no arquivo .env!');
    console.error('👉 Crie um arquivo chamado ".env" dentro da pasta "api" e adicione: MONGODB_URI=sua_string_de_conexao\n');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔌 Conectado ao MongoDB Atlas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
  }
};

module.exports = connectDB;