require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');

const TodoListRoutes = require('./routes/TodoList');
const TaskRoutes = require('./routes/Task');

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas
app.use(TodoListRoutes);
app.use(TaskRoutes);

// servidor online
app.listen(process.env.API_PORT || 3000, () => {
    console.log('Servidor online na porta', process.env.API_PORT || 3000);
});

module.exports = app;
