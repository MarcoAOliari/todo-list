require('dotenv').config({ path: __dirname + '/.env' });

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

// servidor online
app.listen(process.env.API_PORT || 3001, () => {
    console.log('Servidor online na porta', process.env.API_PORT || 3001);
});

module.exports = app;
