
const express = require('express');
const db = require ('../database');
const router = express.Router();

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
        res.json(results);
    }catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/registro', async (req, res, next) => {
    try{
        let results = await db.registro(req.body);
        res.json(results);
    }catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/CV', async(req, res, next) => {
    try{
        let results = await db.cv(req.body);
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

module.exports = router;    