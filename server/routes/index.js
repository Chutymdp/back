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

//LOGIN ORIGINAL
// router.post('/login', async (req, res, next) => {
//     try{
//         let results = await db.login(req.body);
//     }catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

//Página de prueba donde se valida que tienes un token - Medio funciona / La haré funcionar cuando a la puta función que está debajo se le ocurra comparar los correos >:v
router.get('/me', async (req, res, next) =>{
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'no token provided'
        }); 
    }
    const decoded = jwt.verify(token, 'mysecretkey');
    const user = await db.login(decoded.user);
    if(!user){
        return res.status(404).send('No user found');
    }
    console.log(decoded);

});
    
//LOGIN DE PRUEBA - No he logrado que la base de datos compare los correos. (Si se llegan a comparar los correos, significa que existe el usuario en la base de datos) PD:No pude lograr obtener el ID por eso lo hago con correo, después se podría modificar para intentarlo con ID
router.post('/login', async (req, res, next) =>{
    const {correo, pass} = req.body;
    console.log(req.body.correo);
    const user = await db.getEmail(req.body.correo);
    console.log(user, 'puto no te sale aún'); //Hasta aquí llega.
    if (!user){
        return res.status(404).send("The email doesn't exist");
    }
    //Código que debería validar al contraseña normal con la hash (encriptada).
       const passIsValid = await user.validatePassword(req.body);
       console.log(passIsValid);
       res.json('ingresó con éxito');
 
});


//REGISTRO ORIGINAL
// router.post('/registro', async (req, res, next) => {
//     try{
//         let results = await db.registro(req.body);
//         res.json({id:'true'});
//     }catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

//REGISTRO DE PRUEBA - FUNCIONANDO
router.post('/registro', async (req, res, next) => {
    try{
        const{nombre, apellido_p, apellido_m, correo, pass} = req.body;
        req.body.pass = await encryptPassword(req.body.pass);
        console.log (req.body);
        //res.json({message: 'recibido'});
        let results = await db.registro(req.body);
        const token = jwt.sign({user: req.body.pass}, 'mysecretkey',{ expiresIn: 60*60*24})
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
//FUNCIÓN QUE VALIDA LA CONTRASEÑA - NO HE PODIDO PROBARLO BIEN
async function validatePassword(pass, correo ){
   return bcrypt.compare(pass, db.getPassword(correo));
}

module.exports = router;    