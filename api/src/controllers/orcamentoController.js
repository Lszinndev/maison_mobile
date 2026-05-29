const Orcamento = require('../models/Orcamento');

// C - CREATE
exports.criarOrcamento = async (req, res) => {
  try {
    const novoOrcamento = new Orcamento(req.body);
    await novoOrcamento.save();

    res.status(201).json({ message: 'Orçamento enviado com sucesso!', id: novoOrcamento._id, data: novoOrcamento });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao salvar orçamento', detalhes: error.message });
  }
};

// R - READ ALL
exports.listarOrcamentos = async (req, res) => {
  try {
    const orcamentos = await Orcamento.find().sort({ criado_em: -1 });
    res.status(200).json(orcamentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar orçamentos', detalhes: error.message });
  }
};

// R - READ ONE
exports.buscarOrcamentoPorId = async (req, res) => {
  try {
    const orcamento = await Orcamento.findById(req.params.id);
    if (!orcamento) {
      return res.status(404).json({ error: 'Orçamento não encontrado' });
    }
    res.status(200).json(orcamento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o orçamento', detalhes: error.message });
  }
};

// U - UPDATE
exports.atualizarOrcamento = async (req, res) => {
  try {
    const orcamentoAtualizado = await Orcamento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!orcamentoAtualizado) {
      return res.status(404).json({ error: 'Orçamento não encontrado para atualização' });
    }
    res.status(200).json({ message: 'Orçamento atualizado com sucesso!', data: orcamentoAtualizado });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar orçamento', detalhes: error.message });
  }
};

// D - DELETE
exports.deletarOrcamento = async (req, res) => {
  try {
    const orcamentoDeletado = await Orcamento.findByIdAndDelete(req.params.id);
    if (!orcamentoDeletado) {
      return res.status(404).json({ error: 'Orçamento não encontrado para exclusão' });
    }
    res.status(200).json({ message: 'Orçamento removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar orçamento', detalhes: error.message });
  }
};