const express = require('express');
const router = express.Router();

const TodoListController = require('../controllers/TodoList.controller');

// Retorna todas as to-do lists cadastradas
router.get('/todolist', TodoListController.index);

// Cadastra uma nova to-do list
router.post('/todolist', TodoListController.store);

// Retorna todas as tasks de uma to-do list
router.get('/todolist/:id', TodoListController.show);

// Atualiza o título de uma to-do list
router.put('/todolist/:id', TodoListController.update);

// Apaga uma to-do list do banco de dados
router.delete('/todolist/:id', TodoListController.delete);

module.exports = router;