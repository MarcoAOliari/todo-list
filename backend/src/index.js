require('dotenv').config();

const express = require('express');

const testRoute = require('./routes/hello');

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas
app.use(testRoute);

// servidor online
app.listen(process.env.API_PORT || 3000, () => {
    console.log('Servidor online na porta', process.env.API_PORT || 3000);
});

module.exports = app;
