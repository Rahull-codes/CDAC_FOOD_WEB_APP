const express = require('express')
const router = express.Router()
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const pool = require('../db/db')
const {successResult , errorResult} = require('../utils/result')

router.post('/signup' , async (req , res)=> {
    const { name , email , password, mobile } = req.body;
    const hashPassword = crypto.SHA256(password);
    const sql = 'INSERT INTO user (name , email , password , mobile) VALUES(? , ? , ? , ?)'

    try{
        const data = await pool.query(sql , [name , email , hashPassword , mobile] )
        res.send(successResult(data[0]))
    }catch(error){
        res.send(errorResult(error))
    }
})

router.post('/signin' , async (req , res) => {
    const {email , password} = req.body
    console.log(email , password);
    
    const hashPassword = crypto.SHA256(password);

    const sql = "SELECT * FROM user WHERE email = ? AND password = ?" 

    try{
        const data = await pool.query(sql , [email , hashPassword]);
        // console.log(data);
        
        const dbdata = data[0][0]
        const payload = { uid : dbdata.uid}
        // console.log(payload);
        
        const token =  jwt.sign(payload , config.SECRET)
        // console.log(token);

        delete dbdata.password
        delete dbdata.uid
        dbdata.token = token 
        // console.log(dbdata);
        
        res.send(successResult(dbdata))
    }catch(error){
        res.send(errorResult(error))
    }
})

router.get('/' , async (req , res) => {
    const uid = req.headers.uid
    // console.log(uid);
    const sql = 'SELECT * from user where uid = ? '

    try{
        const data = await pool.query(sql , [uid])
        const dbdata = data[0][0]
        // console.log(dbdata);
        
        const user = {
            name : dbdata.name,
            email : dbdata.email,
            mobile : dbdata.mobile
        }

        res.send(successResult(user))
    }catch(error){
        res.send(errorResult(error))
    }
})

router.put('/' , async (req , res) => {
    const uid = req.headers.uid
    console.log(uid);
    
    const sql = 'UPDATE user SET mobile = ? where uid = ?'

    try{
        const data = await pool.query(sql , [ req.body.mobile , uid])

        res.send(successResult(data[0]))
    }catch(error){
        res.send(errorResult(error))
    }
})


module.exports = router