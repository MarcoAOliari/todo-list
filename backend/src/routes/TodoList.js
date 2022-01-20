const express = require('express');
const router = express.Router();

const TodoListController = require('../controllers/TodoList.controller');

router.get('/todolist', TodoListController.index);
router.post('/todolist', TodoListController.store);
router.get('/todolist/:id', TodoListController.show);
router.put('/todolist/:id', TodoListController.update);

module.exports = router;