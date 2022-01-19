require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');

const TodoListRoutes = require('./routes/TodoList');

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas
app.use(TodoListRoutes);

// servidor online
app.listen(process.env.API_PORT || 3000, () => {
    console.log('Servidor online na porta', process.env.API_PORT || 3000);
});

module.exports = app;
