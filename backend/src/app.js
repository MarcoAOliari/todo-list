const env = process.env.NODE_ENV === 'test' ? '/.env.test' : '/.env';

require('dotenv').config({ path: __dirname + env });

const express = require('express');
const cors = require('cors');

const TodoListRoutes = require('./routes/TodoList');
const TaskRoutes = require('./routes/Task');

const app = express();

app.use(cors());

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas
app.use(TodoListRoutes);
app.use(TaskRoutes);

module.exports = app;
