const express = require('express');
const session = require('express-session');
const ApiRouter = require('./routes');

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/api', ApiRouter);

//Configuraciones puertos 
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
  console.log('Servidor corriendo en puerto: '+ app.get('puerto'));
});
