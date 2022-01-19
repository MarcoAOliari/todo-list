const express = require('express');
const router = express.Router();

const TodoListController = require('../controllers/TodoList.controller');

router.get('/todolist', TodoListController.index);
router.post('/todolist', TodoListController.store);

module.exports = router;