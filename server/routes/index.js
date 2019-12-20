
const express = require('express');
const db = require ('../database');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/trabajos', async (req,res,next) =>{
    try{
        let results = await db.trabajos();
        res.json(results);      
     }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.post('/login', async (req, res, next) => {
    try{
        let results = await db.login(req.body);
    }catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


function ensureToken(req, res, next){
    const bearerHeader = req.headers['Authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(" ");
    }
};

router.post('/registro', async (req, res, next) => {
    try{
        let results = await db.registro(req.body);
        res.json({id:'true'});
    }catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/registroCV', async(req, res, next) => {
    try{
        let results = await db.cv(req.body);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/registroUbic', async(req, res, next) => {
    try{
        let results = await db.ubc(req.body);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/registroSocial', async(req, res, next) => {
    try{
        let results = await db.redsc(req.body);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/registroCursos', async(req, res, next) => {
    try{
        let results = await db.cursos(req.body);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/registroIdiomas', async(req, res, next) => {
    try{
        let results = await db.idiomas(req.body);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/registroExpLaboral', async(req, res, next) => {
    try{
        let results = await db.expLaboral(req.body);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/registroAcademico', async(req, res, next) => {
    try{
        let results = await db.formAcad(req.body);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/CompetenciaUsr', async(req, res, next) => {
    try{
        let results = await db.compUsr(req.body);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/CV/:id', async(req, res, next) => {
    try{
        let results = await db.cv_select(req.params.id);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/sector', async(req, res, next) => {
    try{
        let results = await db.sector_select(req.params.id);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/area', async(req, res, next) => {
    try{
        let results = await db.area_select(req.params.id);
        res.json(results);
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/habilidad', async(req, res, next) => {
    try{
        let results = await db.habilidad_select(req.params.id);
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

module.exports = router;    