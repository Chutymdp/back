const express = require("express");
const db = require("../database");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/trabajos", async (req, res, next) => {
  try {
    let results = await db.trabajos();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});



//LOGIN -
router.post('/login', async (req, res, next) => {
    const todoUsuario = await db.getID(req.body.correo);
    let user = await db.login(req.body.correo, req.body.pass);
    //console.log(todoUsuario, "Este es el bueno");
    
    if (!user) {
        return res.status(404).send("The email doesn't exist");
    } else {
        const token = jwt.sign({user: todoUsuario}, 'mysecretkey',{ expiresIn: 60*60*24})     //Crea un token a partir del correo electrónico
        //res.json({ auth: true, token });//Muestra la autorización y si el token es correcto
        
        let tok = verifyToken(token)
        console.log("Token verificado",tok.Nombre,tok.id_usuario);
        res.send(tok)
    }
});


//FUNCIÓN QUE VERIFICA EL TOKEN EN CADA RUTA
function verifyToken(token) {
    // Verifica si recibe un token (puede servir más tarde)
    // const token = req.headers['x-access-token'];
    // if (!token) { 
    //     return res.status(401).json({
    //         auth: false,
    //         message: 'no token provided'
    //     });
    // }
    const tokenVerificado = jwt.verify(token, 'mysecretkey');
    
    
    return tokenVerificado
}

//REGISTRO
router.post("/registro", async (req, res) => {
  try {
    const { nombre, apellido_p, apellido_m, correo, pass } = req.body;
    // req.body.pass = await encryptPassword(req.body.pass);
    //console.log(req.body);
    //res.json({message: 'recibido'});
    let results = await db.registro(req.body);
    //const token = jwt.sign({ user: req.body.correo }, "mysecretkey", {expiresIn: 60});
    console.log(results);
    
    res.json(results)

  } catch (e) {
    console.log(e);
    return res.status(500).send("El email ya existe");
    
  }
});


//REGISTRO DE CURRICULUM
router.post("/registroCV", async (req, res, next) => {
  try {
    let results = await db.cv(req.body);
    res.json(results);
    //funcion a la tabla de detalles
    datosTablaDetalles(results);
    console.log(results);
    //res.send(results);   
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//SELECCIÓN DE CURRICULUM A TRAVÉS DEL ID
router.get("/CV/:id", async (req, res, next) => {
  try {
    let results = await db.cv_select(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/Det_Usr/:id", async (req, res, next) => {
  try {
    let results = await db.det_usr_cv(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/CP", async (req, res, next) => {
  try {
    let results = await db.getCP(req.body.params);
    res.json(results);
  } catch (e) {
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
async function validatePassword(pass, correo) {
  return bcrypt.compare(pass, db.getPassword(correo));
}


//Funcion que inserta a las tablas de detalles
async function datosTablaDetalles (cv_id){
  try {
    await db.detArea1(cv_id);
    await db.detArea2(cv_id);
    await db.detArea3(cv_id);
    await db.detCurso1(cv_id);
    await db.detCurso2(cv_id);
    await db.detCurso3(cv_id);
    await db.detHabilidad1(cv_id);
    await db.detHabilidad2(cv_id);
    await db.detHabilidad3(cv_id);
    await db.detIdiomPrinc(cv_id);
    await db.detIdioma_Nivel1(cv_id);
    await db.detIdioma_Nivel2(cv_id);
    await db.detIdioma_Nivel3(cv_id);
    await db.detPlantilla(cv_id);
    await db.detRedSoc1(cv_id);
    await db.detRedSoc2(cv_id);
    await db.detSector1(cv_id);
    await db.detSector2(cv_id);
    await db.detSector3(cv_id);
    await db.detSoftware1(cv_id);
    await db.detSoftware2(cv_id);
    await db.detSoftware3(cv_id);
    await db.detCP(cv_id);
    await db.detEst_Fed(cv_id);
    await db.detMunic(cv_id);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = router;

