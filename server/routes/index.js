const express = require('express');
const db = require ('../database');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/trabajos', async (req,res,next) =>{
    try{
        let results = await db.trabajos();
        res.json(results);      
     }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Página de prueba donde se valida que tienes un token - Funciona
router.get('/me', verifyToken, async (req, res, next) =>{
    const user = await db.getEmail(req.user);
    if(!user){
        return res.status(404).send('No user found');
    }
    res.json('me');

});
    
//LOGIN -
router.post('/login', async (req, res, next) =>{
    let user = await db.login(req.body.correo, req.body.pass);
    if (!user)
    {
        return res.status(404).send("The email doesn't exist");
    }
        //NO FUNCIONA
       //const passIsValid = await user.validatePassword(req.body.pass, req.body.correo); - Utiliza la contraseña del formulario y la compara con la hash
       //console.log(passIsValid); - Muestra si la contraseña fue comprada con éxito o no

       const token = jwt.sign({user: req.body.correo}, 'mysecretkey',{ expiresIn: 60*60*24})    //Crea un token a partir del correo electrónico
       res.json({auth: true, token});   //Muestra la autorización y si el token es correcto
});

//REGISTRO
router.post('/registro', async (req, res, next) => {
    try{
        const{nombre, apellido_p, apellido_m, pass} = req.body;
        req.body.pass = await encryptPassword(req.body.pass);
        console.log (req.body);
        //res.json({message: 'recibido'});
        let results = await db.registro(req.body);
        const token = jwt.sign({user: req.body.correo}, 'mysecretkey',{ expiresIn: 60*60*24})
        res.json({auth: true, token});
    }catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
 
//REGISTRO DE CURRICULUM
router.post('/registroCV', async(req, res, next) => {
    try{
        let results = await db.cv(req.body);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//SELECCIÓN DE CURRICULUM A TRAVÉS DEL ID
router.get('/CV/:id', async(req, res, next) => {
    try{
        let results = await db.cv_select(req.params.id);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/CP', async(req, res, next) => {
    try{
        let results = await db.geo(req.body.params); 
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//FUNCIÓN QUE ENCRIPTA LA CONTRASEÑA - FUNCIONA
async function encryptPassword(pass) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass, salt);
}
//FUNCIÓN QUE VALIDA LA CONTRASEÑA - NO FUNCIONA
async function validatePassword(pass, correo){
   return bcrypt.compare(pass, db.getPassword(correo));
}

//FUNCIÓN QUE VERIFICA EL TOKEN EN CADA RUTA
function verifyToken (req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'no token provided'
        }); 
    }
    const decoded = jwt.verify(token, 'mysecretkey');
    //console.log(decoded);
    req.user=decoded.user;
    next();
}

module.exports = router;    