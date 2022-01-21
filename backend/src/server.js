const app = require('./app');

require('dotenv').config({ path: __dirname + '/.env' });

// servidor online
app.listen(process.env.API_PORT || 3001, () => {
    console.log('Servidor online na porta', process.env.API_PORT || 3001);
});
