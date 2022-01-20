const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/Task.controller');

router.post('/todolist/:id/task', TaskController.store);
router.delete('/task/:id', TaskController.delete);
router.put('/task/:id/status', TaskController.updateStatus);

module.exports = router;