const mongoose = require('mongoose');

const orcamentoSchema = new mongoose.Schema({
  categoria: { 
    type: String, 
    required: true, 
    enum: ['COZINHA', 'BANHEIRO', 'CLOSET', 'LAVANDERIA'] 
  },
  cliente: {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true }
  },
  dimensoes: {
    largura: Number,
    altura: Number
  },
  especificacoes: {
    estetica: String,    // LISO, PROVENÇAL, etc.
    acabamento: String,  // MDF, LACA, etc.
    ferragens: String,   // BLUM, HAFAELE, etc.
    toque_final: String
  },
  funcionalidades_extras: [String], 
  status: { type: String, default: 'Pendente' },
  criado_em: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orcamento', orcamentoSchema);