const express = require('express');
const router = express.Router();
const orcamentoController = require('../controllers/orcamentoController');

// Rotas para /api/orcamentos
router.post('/', orcamentoController.criarOrcamento);
router.get('/', orcamentoController.listarOrcamentos);

// Rotas para /api/orcamentos/:id
router.get('/:id', orcamentoController.buscarOrcamentoPorId);
router.put('/:id', orcamentoController.atualizarOrcamento);
router.delete('/:id', orcamentoController.deletarOrcamento);

module.exports = router;