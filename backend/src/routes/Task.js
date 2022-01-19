const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/Task.controller');

router.post('/todolist/:id/task', TaskController.store);

module.exports = router;