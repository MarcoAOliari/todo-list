const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/Task.controller');

// Cadastra uma task em uma to-do list
router.post('/todolist/:id/task', TaskController.store);

// Apaga uma task do banco de dados
router.delete('/task/:id', TaskController.delete);

// Atualiza o status de uma task
router.put('/task/:id/status', TaskController.updateStatus);

// Atualiza o texto de uma task
router.put('/task/:id/title', TaskController.updateTitle);

module.exports = router;