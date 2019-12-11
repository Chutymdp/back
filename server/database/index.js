const mysql = require ('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: '6e4a09b61c67e1f',
    user: 'be21fb80c6a2dc',
    database: 'heroku_dcb235d094c2b3e',
    host: 'us-cdbr-iron-east-05.cleardb.net',
    port: '3306'
});

let con = {};

con.trabajos = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM usuarios', (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


con.login = (val) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT * FROM usuarios WHERE Correo_electronico = ? and Contraseña = ?', [val.Correo, val.Contraseña], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};


con.registro = (val) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO usuarios(Nombre,Apellido_Paterno,Apellido_Materno,Correo_electronico,Contraseña) values(?,?,?,?,?)', [val.nombre, val.apellido_p, val.apellido_m, val.correo, val.pass] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.cv = (val) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO cv(Nombre,Apellido_Paterno,Apellido_Materno,Tel,Fecha_Nac,Estado,Municipio,CP,Facebook,Linkedin,Perfil_Profesional,Idioma_Principal,Idioma_1,Idioma_Nivel_1,Idioma_2,Idioma_Nivel_2,Idioma_3,Idioma_Nivel_3,Titulo_Estudios,Centro_Estudios,Estudio_Ciudad,Estudio_Estado,Estudio_Pais,Estudio_Fecha,Exp_Empresa,Exp_Puesto,Exp_Salario,Exp_Fecha_Inicio,Exp_Fecha_Salida,Exp_Tel_Contacto,Exp_Funcion,Curso_Tipo,Curso_Titulo,Curso_Fecha,Curso_Medio,Sector_1,Sector_2,Sector_3,Area_1,Area_2,Area_3,Software1,Software2,Software3,Habilidad1,Habilidad2,Habilidad3) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[val.Nombre,val.Apellido_Paterno,val.Apellido_Materno,val.Tel,val.Fecha_Nacimiento,val.Estado,val.Municipio,val.CP,val.Facebook,val.Linkedin,val.Perfil_Profesional,val.Idioma_Principal,val.Idioma_1,val.Idioma_Nivel_1,val.Idioma_2,val.Idioma_Nivel_2,val.Idioma_3,val.Idioma_Nivel_3,val.Titulo_Estudios,val.Centro_Estudios,val.Estudio_Ciudad,val.Estudio_Estado,val.Estudio_Pais,val.Estudio_Fecha,val.Exp_Empresa,val.Exp_Puesto,val.Exp_Salario,val.Exp_Fecha_Inicio,val.Exp_Fecha_Salida,val.Exp_Tel_Contacto,val.Exp_Funcion,val.Curso_Tipo,val.Curso_Titulo,val.Curso_Fecha,val.Curso_Medio,val.Sector_1,val.Sector_2,val.Sector_3,val.Area_1,val.Area_2,val.Area_3,val.Software_1,val.Software_2,val.Software_3,val.Habilidad_1,val.Habilidad_2,val.Habilidad_3], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });     
    });
};

con.cv_select = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM cv WHERE id_cva = ?', [id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });            
    });
};

con.geo = (val) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT CONCAT(c_estado, "-", c_mnpio, "-", d_codigo) as C_CP, d_estado, D_mnpio, d_codigo FROM cp_mex WHERE d_codigo = ?', [val.cp], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

module.exports = con;