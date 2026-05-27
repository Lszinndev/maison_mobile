const mongoose = require('mongoose');

const orcamentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  status: { type: String, default: 'Novo' },
  criado_em: { type: Date, default: Date.now },
  budget: {
    ambiente: { type: String },
    mdf: { type: String },
    estilo: { type: String },
    ferragens: { type: String },
    puxadores: { type: String },
    medidas: { type: String },
    whatsapp: { type: String },
    acessorios: [String],
    descricao: { type: String },
    fotos: [String]
  }
});

module.exports = mongoose.model('Orcamento', orcamentoSchema);