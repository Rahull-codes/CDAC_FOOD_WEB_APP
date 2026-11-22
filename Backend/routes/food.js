const express = require('express')
const multer = require('multer')
const fs = require('fs/promises')
const router = express.Router()
const pool = require('../db/db')
const {successResult , errorResult} = require('../utils/result')

const upload = multer({
    dest : 'FoodImage'
})

router.get('/' , async (req , res) => { 
    const sql = 'SELECT * FROM food'
    try{
        const data = await pool.query(sql);
        res.send(successResult(data[0]))
    }catch(error){
        res.send(errorResult(error))
    }
})

router.post('/add' , upload.single('image') , async (req , res) => {
    const {name , desc , price} = req.body;
    const {originalname , path , destination} = req.file

    await fs.rename(path , `${destination}/${originalname}`)
    const sql = 'INSERT INTO food(name , price , description , image) VALUES(? , ? , ? , ?)'

    try{
    const data = await pool.query(sql , [name , price , desc , originalname])
    res.send(successResult(data[0]))
    }catch(error){
        res.send(errorResult(error))
    }
    
})


module.exports = router