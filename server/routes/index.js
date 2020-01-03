const express = require("express");
const db = require("../database");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/informacion_cv", async (req, res, next) => {
  // console.log(req.body.userID," Este es el token en body");
  let idUsuario = verifyToken(req.body.user.idChido).idUsuario
  console.log("ID CV",req.body.user.cvID);  
  try {
    let cvInfo = await db.getCVInfo(idUsuario,req.body.user.cvID)
    res.send(cvInfo)
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/listar_cvs", async (req, res, next) => {
  
  let idUsuario = verifyToken(req.body.userID.idChido).idUsuario
  //let tokenVerificado = verifyToken(req.body)
  try {
    let cvs = await db.getCVs(idUsuario)
    res.send(cvs)
    console.log(cvs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
    const usuarioQuery = await db.getID(req.body.correo);
    let user = await db.login(req.body.correo, validatePassword(req.body.pass, req.body.correo)); //Primero compara la contraseña normal con la encriptada y despues hace la consulta de login.
    //console.log(todoUsuario, "Este es el bueno");
    //console.log(id.id_usuario,"Este es el id");
    
    if (!user) {

        return res.status(404).send("The email doesn't exist");

    } else {
        const token = jwt.sign({idUsuario:usuarioQuery.id_usuario}, 'mysecretkey',{ expiresIn: 60*60*24})     //Crea un token a partir del id del usuario
        //res.json({ auth: true, token });//Muestra la autorización y si el token es correcto
        //let tokenVerificado = verifyToken(token)
        console.log(token);
        res.send(token)
    }
});
//REGISTRO
router.post("/registro", async (req, res) => {
  try {
    req.body.pass = await encryptPassword(req.body.pass); //Encripta la contraseña
    console.log(req.body);
    //res.json({message: 'recibido'});
    let results = await db.registro(req.body);
    const token = jwt.sign({idUsuario:results}, 'mysecretkey',{ expiresIn: 60*60*24}) 
    res.send(token);

  } catch (e) {
    console.log(e);
    return res.status(500).send("El email ya existe");
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

//REGISTRO DE CURRICULUM
router.post("/registroCV", async (req, res, next) => {
  req.body.FK_Usuario=verifyToken(req.body.FK_Usuario).idUsuario
  console.log(req.body.FK_Usuario,"ID Usuario de token");
  
  try {
    let results = await db.cv(req.body);
    res.json(results);
    //let results2 = await db.det_usr_cv(results);
    //funcion a la tabla de detalles
    //datosTablaDetalles(results);
    //res.send(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//SELECCIÓN DE CURRICULUM A TRAVÉS DEL ID
// router.get("/CV/:id", async (req, res, next) => {
//   try {
//     let results = await db.cv_select(req.params.id);
//     res.json(results);
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// });

router.post("/Det_Usr/:id", async (req, res, next) => {
  try {
    let results = await db.det_usr_cv(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/CP", async (req, res, next) => {
  console.log(req.body.params,"CP");
  
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
//FUNCIÓN QUE VALIDA LA CONTRASEÑA - FUNCIONA
async function validatePassword(pass, correo) {
  return bcrypt.compare(pass, db.getID(correo));
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

