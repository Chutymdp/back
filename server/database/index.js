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

//NO SÉ PARA QUÉ ES ESTA CONSULTA, CUANDO YO EMPECÉ A TRABAJAR AQUÍ YA ESTABA XDXDxD

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
        pool.query('SELECT * FROM usuarios WHERE Correo_electronico = ?', [Correo], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.getCVInfo = (idUsuario, idCV) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT * FROM cv WHERE fk_usuario = ? & plantilla = ?', [idUsuario],[idCV], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};
//CVS de usuarios 
con.getCVs = (idUsuario) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT * FROM cv WHERE fk_usuario = ?', [idUsuario], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

//Insert DE REGISTRO DE CURRICULUM SQL
con.cv = (val) => {
    return new Promise((resolve, reject) => {
        pool.query('insert into cv (Nombre,Apellido_Paterno,Apellido_Materno,Tel,Fecha_Nac,Pais,Estado,Municipio,CP,Facebook,Twitter,Perfil_Profesional,Idioma_Principal,Idioma_1,Idioma_Nivel_1,Idioma_2,Idioma_Nivel_2,Idioma_3,Idioma_Nivel_3, Titulo_Estudios,Cedula,Centro_Estudios,Estudio_Ciudad,Estudio_Estado,Estudio_Pais,Estudio_Fecha,Exp_Empresa,Exp_Puesto,Exp_Salario,Exp_Fecha_Inicio,Exp_Fecha_Salida,Exp_Tel_Contacto,Exp_Funcion,Curso_Tipo_1,Curso_Titulo_1,Curso_Fecha_1,Curso_Medio_1,Curso_Tipo_2,Curso_Titulo_2,Curso_Fecha_2,Curso_Medio_2,Curso_Tipo_3,Curso_Titulo_3,Curso_Fecha_3,Curso_Medio_3,Sector_1,Sector_2,Sector_3,Area_1,Area_2,Area_3,Software1,Software2,Software3,Habilidad1,Habilidad2,Habilidad3,Plantilla,FK_Usuario) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',[val.Nombre,val.Apellido_Paterno,val.Apellido_Materno,val.Tel,val.Fecha_Nac,val.Pais,val.Estado,val.Municipio,val.CP,val.Facebook,val.Twitter,val.Perfil_Profesional,val.Idioma_Principal,val.Idioma_1,val.Idioma_Nivel_1,val.Idioma_2,val.Idioma_Nivel_2,val.Idioma_3,val.Idioma_Nivel_3,val.Titulo_Estudios,val.Cedula,val.Centro_Estudios,val.Estudio_Ciudad,val.Estudio_Estado,val.Estudio_Pais,val.Estudio_Fecha,val.Exp_Empresa,val.Exp_Puesto,val.Exp_Salario,val.Exp_Fecha_Inicio,val.Exp_Fecha_Salida,val.Exp_Tel_Contacto,val.Exp_Funcion,val.Curso_Tipo,val.Curso_Titulo,val.Curso_Fecha,val.Curso_Medio,val.Curso_Tipo_2,val.Curso_Titulo_2,val.Curso_Fecha_2,val.Curso_Medio_2,val.Curso_Tipo_3,val.Curso_Titulo_3,val.Curso_Fecha_3,val.Curso_Medio_3,val.Sector_1,val.Sector_2,val.Sector_3,val.Area_1,val.Area_2,val.Area_3,val.Software_1,val.Software_2,val.Software_3,val.Habilidad_1,val.Habilidad_2,val.Habilidad_3,val.Plantilla, val.FK_Usuario], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
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

//CONSULTA DE BUSQUEDA POR CP SQL
con.getCP = (val) => {
    return new Promise((resolve, reject ) => {
        pool.query('SELECT CONCAT(c_estado, "-", c_mnpio, "-", d_codigo) as C_CP, d_estado, D_mnpio, d_codigo FROM cp_mex WHERE d_codigo = ?', [val.cp], (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

//Consulta de tabla de detalles de usuario y cv
con.det_usr_cv = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('select * from cv where FK_USUARIO = ?', [id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });            
    });
};

// INSERT A DETALLES Areas
con.detArea1 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_areas_usr_cv(fk_areas,fk_usuario,fk_cv) values ((SELECT id_area FROM areas_conocimiento WHERE NOMBRE_AREA =  (select Area_1 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detArea2 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_areas_usr_cv(fk_areas,fk_usuario,fk_cv) values ((SELECT id_area FROM areas_conocimiento WHERE NOMBRE_AREA =  (select Area_2 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detArea3 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_areas_usr_cv(fk_areas,fk_usuario,fk_cv) values ((SELECT id_area FROM areas_conocimiento WHERE NOMBRE_AREA =  (select Area_3 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// INSERT A DETALLES Cursos
con.detCurso1 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_curso_Usr_CV(FK_curso,fk_usuario,fk_cv) values ((SELECT id_curso FROM cursos WHERE curso =   (select Curso_Tipo_1 from cv where id_cva = ?)),11,? );', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detCurso2 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_curso_Usr_CV(FK_curso,fk_usuario,fk_cv) values ((SELECT id_curso FROM cursos WHERE curso =   (select Curso_Tipo_2 from cv where id_cva = ?)),11,? );', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detCurso3 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_curso_Usr_CV(FK_curso,fk_usuario,fk_cv) values ((SELECT id_curso FROM cursos WHERE curso =   (select Curso_Tipo_3 from cv where id_cva = ?)),11,? );', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// INSERT A DETALLES HABILIDADES
con.detHabilidad1 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_hab_Usr_CV(fk_habilidad,fk_usuario,fk_cv) values ((SELECT id_habilidad FROM habilidades WHERE nombre_habilidad = (select habilidad1 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detHabilidad2 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_hab_Usr_CV(fk_habilidad,fk_usuario,fk_cv) values ((SELECT id_habilidad FROM habilidades WHERE nombre_habilidad = (select habilidad2 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detHabilidad3 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_hab_Usr_CV(fk_habilidad,fk_usuario,fk_cv) values ((SELECT id_habilidad FROM habilidades WHERE nombre_habilidad = (select habilidad3 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// INSERT A DETALLES Idioma Principal e Idiomas con Niveles
con.detIdiomPrinc = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_idioma_Usr_CV(fk_idioma,fk_usuario,fk_cv) values ((SELECT id_idioma FROM idiomas WHERE idioma = (select idioma_principal from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detIdioma_Nivel1 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_idioma_nivel_Usr_CV(fk_idioma,fk_nivel,fk_usuario,fk_cv) values ((SELECT id_idioma FROM idiomas WHERE idioma = (select idioma_1 from cv where id_cva = ?)),(SELECT id_nivel FROM nivel_idioma WHERE nivel = (select idioma_nivel_1 from cv where id_cva = ?)),11,?);', [cv_id,cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detIdioma_Nivel2 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_idioma_nivel_Usr_CV(fk_idioma,fk_nivel,fk_usuario,fk_cv) values ((SELECT id_idioma FROM idiomas WHERE idioma = (select idioma_2 from cv where id_cva = ?)),(SELECT id_nivel FROM nivel_idioma WHERE nivel = (select idioma_nivel_2 from cv where id_cva = ?)),11,?);', [cv_id,cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detIdioma_Nivel3 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_idioma_nivel_Usr_CV(fk_idioma,fk_nivel,fk_usuario,fk_cv) values ((SELECT id_idioma FROM idiomas WHERE idioma = (select idioma_3 from cv where id_cva = ?)),(SELECT id_nivel FROM nivel_idioma WHERE nivel = (select idioma_nivel_3 from cv where id_cva = ?)),11,?);', [cv_id,cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// INSERT A DETALLES Plantillas
con.detPlantilla = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_plant_Usr_CV(FK_plantilla,fk_usuario,fk_cv) values ((SELECT id_plantilla FROM catalog_plantillas WHERE nombre_plantilla = (select plantilla from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// INSERT A DETALLES Redes Sociales, ¡Quitar el catalogo y solo añadir lo que se encuentre dentro del cv?
con.detRedSoc1 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_redsoc_Usr_CV(FK_redsoc,fk_usuario,fk_cv) values ((SELECT Facebook from cv where id_cva = ?),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detRedSoc2 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_redsoc_Usr_CV(FK_redsoc,fk_usuario,fk_cv) values ((SELECT Twitter from cv where id_cva = ?),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// INSERT A DETALLES Sectores
con.detSector1 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_sec_Usr_CV(FK_Sector,fk_usuario,fk_cv) values ((SELECT id_sec FROM sectores WHERE sector = (select sector_1 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detSector2 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_sec_Usr_CV(FK_Sector,fk_usuario,fk_cv) values ((SELECT id_sec FROM sectores WHERE sector = (select sector_2 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detSector3 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_sec_Usr_CV(FK_Sector,fk_usuario,fk_cv) values ((SELECT id_sec FROM sectores WHERE sector = (select sector_3 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// INSERT A DETALLES Software
con.detSoftware1 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_soft_Usr_CV(FK_software,fk_usuario,fk_cv) values ((SELECT id_sec FROM sectores WHERE sector = (select software1 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detSoftware2 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_soft_Usr_CV(FK_software,fk_usuario,fk_cv) values ((SELECT id_sec FROM sectores WHERE sector = (select software2 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

con.detSoftware3 = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_soft_Usr_CV(FK_software,fk_usuario,fk_cv) values ((SELECT id_sec FROM sectores WHERE sector = (select software3 from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// INSERT A DETALLES CP
con.detCP = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_cp_usr_cv(FK_CP,fk_usuario,fk_cv) values ((SELECT id_cp FROM catalog_cp WHERE Codigo_Postal = (select CP from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// INSERT A DETALLES municipio
con.detMunic = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_estado_usr_cv(FK_Estado,fk_usuario,fk_cv) values ((SELECT id_Estados FROM ent_fed WHERE ENTIDAD_FEDERATIVA = (select Estado from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// INSERT A DETALLES Estados
con.detEst_Fed = (cv_id) => {
    return new Promise((resolve, reject ) => {
        pool.query('INSERT INTO det_municipio_usr_cv(FK_Municipio,fk_usuario,fk_cv) values ((SELECT id_Municipio FROM municipio WHERE MUNICIPIO = (select Municipio from cv where id_cva = ?)),11,?);', [cv_id,cv_id] , (err,results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

module.exports = con;