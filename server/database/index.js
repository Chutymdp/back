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
        pool.query('INSERT INTO usuarios(Nombre,Apellido_Paterno,Apellido_Materno,Contraseña,Correro) values(?,?,?,?,?)', [val.nombre, val.apellido_p, val.apellido_m, val.pass,val.correo] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.cv = (val) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO cv(Nombre,Apellido_Paterno,Apellido_Materno,Tel,Fecha_Nac,Pais,Estado,Municipio,CP,Facebook,Twitter,Perfil_Profesional,Idioma_Principal,Idioma_1,Idioma_Nivel_1,Idioma_2,Idioma_Nivel_2,Idioma_3,Idioma_Nivel_3,Titulo_Estudios,Cedula,Centro_Estudios,Estudio_Ciudad,Estudio_Estado,Estudio_Pais,Estudio_Fecha,Exp_Empresa,Exp_Puesto,Exp_Salario,Exp_Fecha_Inicio,Exp_Fecha_Salida,Exp_Tel_Contacto,Exp_Funcion,Curso_Tipo_1,Curso_Titulo_1,Curso_Fecha_1,Curso_Medio_1,Curso_Tipo_2,Curso_Titulo_2,Curso_Fecha_2,Curso_Medio_2,Curso_Tipo_3,Curso_Titulo_3,Curso_Fecha_3,Curso_Medio_3,Sector_1,Sector_2,Sector_3,Area_1,Area_2,Area_3,Software1,Software2,Software3,Habilidad1,Habilidad2,Habilidad3,Plantilla) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[val.Nombre,val.Apellido_Paterno,val.Apellido_Materno,val.Tel,val.Fecha_Nac,val.Ciudad,val.Pais,val.Estado,val.Municipio,val.CP,val.Facebook,val.Twitter,val.Perfil_Profesional,val.Idioma_Principal,val.Idioma_1,val.Idioma_Nivel_1,val.Idioma_2,val.Idioma_Nivel_2,val.Idioma_3,val.Idioma_Nivel_3,val.Titulo_Estudios,val.Cedula,val.Centro_Estudios,val.Estudio_Ciudad,val.Estudio_Estado,val.Estudio_Pais,val.Estudio_Fecha,val.Exp_Empresa,val.Exp_Puesto,val.Exp_Salario,val.Exp_Fecha_Inicio,val.Exp_Fecha_Salida,val.Exp_Tel_Contacto,val.Exp_Funcion,val.Curso_Tipo,val.Curso_Titulo,val.Curso_Fecha,val.Curso_Medio,val.Curso_Tipo_2,val.Curso_Titulo_2,val.Curso_Fecha_2,val.Curso_Medio_2,val.Curso_Tipo_3,val.Curso_Titulo_3,val.Curso_Fecha_3,val.Curso_Medio_3,val.Sector_1,val.Sector_2,val.Sector_3,val.Area_1,val.Area_2,val.Area_3,val.Software_1,val.Software_2,val.Software_3,val.Habilidad_1,val.Habilidad_2,val.Habilidad_3,val.Plantilla], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });     
    });
};

con.area_con = (val) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO det_areas_usr_cv(fk_areas,fk_usuario,fk_cv) values ((SELECT id_area FROM areas_conocimiento WHERE nombre_area = (select Area_1 from cv where id_cva = ?)),?,? );',[val.cva,val.Estado,val.Pais,val.CP], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });     
    });
};

con.redsc = (val) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO redes_sociales (facebook,twitter) values (?,?)',[val.Facebook,val.Linkedin], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });     
    });
};

con.cursos = (val) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO cursos (tipo,titulo,fecha_graduacion,centro_estudios) values (?,?,?,?)',[val.Curso_Tipo,val.Curso_Titulo,val.Curso_Fecha,val.Centro_Estudios], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });     
    });
};

con.idiomas = (val) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO idiomas (idioma1,idioma2,idioma3,lengua_materna,Idioma_Nivel_1,Idioma_Nivel_2,Idioma_Nivel_3) values (?,?,?,?)',[val.Idioma_1,val.Idioma_2,val.Idioma_3,val.Idioma_Principal,val.Idioma_Nivel_1,val.Idioma_Nivel_2,val.Idioma_Nivel_3], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });     
    });
};

con.expLaboral = (val) => {
    return new Promise((resolve, reject) => {
        pool.exp('INSERT INTO historial_laboral (Nombre,Puesto,Salario,Funcion,Referencia,Fecha_Ingreso,Fecha_Salida) values (?,?,?,?,?,?,?)',[val.Exp_Empresa,val.Exp_Puesto,val.Exp_Salario,val.Exp_Funcion,val.Exp_Tel_Contacto,val.Exp_Fecha_Inicio,val.Exp_Fecha_Salida], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });     
    });
};

con.formAcad = (val) => {
    return new Promise((resolve, reject) => {
        pool.exp('INSERT INTO formacion_academica (Cedula_Profesional,Titulo_Estudios,Fecha_Graduacion,Centro_Estudios,Ciudad_localidad,Estado_Provincia,Pais) values (?,?,?,?,?,?,?)',[val.Cedula_Profesional,val.Titulo_Estudios,val.Estudio_Fecha,val.Centro_Estudios,val.Estudio_Ciudad,val.Estudio_Ciudad,val.Estudio_Estado,val.Estudio_Pais], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });     
    });
};

con.compUsr = (val) => {
    return new Promise((resolve, reject) => {
        pool.exp('INSERT INTO competencia_usuario (Sector1,Sector2,Sector3,Area1,Area2,Area3,Software1,Software2,Software3,Habilidad1,Habilidad2,Habilidad3) values (?,?,?,?,?,?,?,?,?,?,?,?)',[val.Sector_1,val.Sector_2,val.Sector_3,val.Area_1,val.Area_2,val.Area_3,val.Software_1,val.Software_2,val.Software_3,val.Habilidad_1,val.Habilidad_2,val.Habilidad_3], (err,results) => {
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

con.sector_select = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('select sector from sectores;' , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });            
    });
};

con.habilidad_select = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('select nombre_habilidad from habilidades;' , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });            
    });
};

con.area_select = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('select nombre_area from areas_conocimiento;' , (err,results) => {
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