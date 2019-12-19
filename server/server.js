const express = require('express');
const session = require('express-session');
const ApiRouter = require('./routes');
const Cors = require('cors');
const passport = require('passport');

const app = express();
app.use(Cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api', ApiRouter);

//Configuraciones puertos 
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
  console.log('Servidor corriendo en puerto: '+ app.get('puerto'));
});