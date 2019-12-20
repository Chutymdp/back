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
//NO SÉ PARA QUÉ ES ESTA CONSULTA, CUANDO YO EMPECÉ A TRABAJAR AQUÍ YA ESTABA XDXD
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

//CONSULTA DE LOGIN SQL
// con.login = (val) => {
//     return new Promise((resolve, reject ) => {
//         pool.query('SELECT * FROM usuarios WHERE Correo_electronico = ? and Contraseña = ?', [val.Correo, val.Contraseña], (err,results) => {
//             if(err){
//                 return reject(err);
//             }
//             return resolve(results[0]);
//         });
//     });
// };

con.login = (Correo, Contraseña) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT * FROM usuarios WHERE Correo_electronico = ? AND Contraseña = ?', [Correo, Contraseña], (err,results) => {
            if(err){
                return reject(err);
            }
            console.log(results);
            return resolve(results[0]);
        });
    });
};

con.getID = (Correo) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT id_usuario FROM usuarios WHERE Correo_electronico = ?', [Correo], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

//Query que obtiene la contraseña a través del correo electrónico - Aun no he podido hacerla funcionar.
con.getPassword = (Correo) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT Contraseña FROM usuarios WHERE Contraseña = ?', [Correo], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

//Query que compara el email del formulario con el email de la base de datos - PD: la hija de perra no quiere hacerlo.
con.getEmail = (Correo) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT Correo_electronico FROM usuarios WHERE Correo_electronico = ?', [Correo], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.getID = (Correo) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT id_usuario FROM usuarios WHERE Correo_electronico = ?', [Correo], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.confirmID = (id) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT id_usuario FROM usuarios WHERE id_usuario = ?', [id], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};
   
//CONSULTA DE REGISTRO DE USUARIOS SQL
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

//CONSULTA DE REGISTRO DE CURRICULUM SQL
con.cv = (val) => {
    return new Promise((resolve, reject) => {
        pool.query('insert into cv (Nombre,Apellido_Paterno,Apellido_Materno,Tel,Fecha_Nac,Pais,Estado,Municipio,CP,Facebook, Twitter,Perfil_Profesional,Idioma_Principal,Idioma_1,Idioma_Nivel_1,Idioma_2,Idioma_Nivel_2, Idioma_3,Idioma_Nivel_3, Titulo_Estudios,Cedula,Centro_Estudios, Estudio_Ciudad,Estudio_Estado,Estudio_Pais,Estudio_Fecha,Exp_Empresa,Exp_Puesto,Exp_Salario,Exp_Fecha_Inicio,Exp_Fecha_Salida, Exp_Tel_Contacto,Exp_Funcion, Exp_Funcion,Curso_Tipo_1,Curso_Titulo_1,Curso_Fecha_1,Curso_Medio_1,Curso_Tipo_2,Curso_Titulo_2,Curso_Fecha_2,Curso_Medio_2,Curso_Tipo_3,Curso_Titulo_3,Curso_Fecha_3,Curso_Medio_3,Sector_1,Sector_2,Sector_3,Area_1,Area_2,Area_3,Software1,Software2,Software3,Habilidad1,Habilidad2,Habilidad3,Plantilla) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[val.Nombre,val.Apellido_Paterno,val.Apellido_Materno,val.Tel,val.Fecha_Nac,val.Curp,val.Pais,val.Estado,val.Municipio,val.CP,val.Facebook,val.Linkedin,val.Perfil_Profesional,val.Idioma_Principal,val.Idioma_1,val.Idioma_Nivel_1,val.Idioma_2,val.Idioma_Nivel_2,val.Idioma_3,val.Idioma_Nivel_3,val.Titulo_Estudios,val.Centro_Estudios,val.Estudio_Ciudad,val.Estudio_Estado,val.Estudio_Pais,val.Estudio_Fecha,val.Exp_Empresa,val.Exp_Puesto,val.Exp_Salario,val.Exp_Fecha_Inicio,val.Exp_Fecha_Salida,val.Exp_Tel_Contacto,val.Exp_Funcion,val.Curso_Tipo,val.Curso_Titulo,val.Curso_Fecha,val.Curso_Medio,val.Curso_Tipo_2,val.Curso_Titulo_2,val.Curso_Fecha_2,val.Curso_Medio_2,val.Curso_Tipo_3,val.Curso_Titulo_3,val.Curso_Fecha_3,val.Curso_Medio_3,val.Sector_1,val.Sector_2,val.Sector_3,val.Area_1,val.Area_2,val.Area_3,val.Software_1,val.Software_2,val.Software_3,val.Habilidad_1,val.Habilidad_2,val.Habilidad_3,val.Plantilla], (err,results) => {
            if(err){    
                return reject(err);
            }
            return resolve(results[0]);
        });     
    });
};


//CONSULTA DE BUSQUEDA POR "ID" DE CURRICULUM SQL
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

//CONSULTA DE BUSQUEDA POR CP SQL
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