const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const {successResult , errorResult} = require('../utils/result')

router.post('/' , async  (req , res ) => {

    const {total_amount , cartitems} = req.body
    const sql1 = 'INSERT INTO orders (uid , total_amount) values(? , ? )'
    const sql2 = 'INSERT INTO orderdetails values(? , ? ,? )'
    
    try{
        const data = await pool.query(sql1 , [req.headers.uid , total_amount] )
        for(food of cartitems){
            const orderdetails = await pool.query(sql2 , [data[0].insertId , food.fid , food.qty])
        }

        res.send(successResult(data[0]))
    }catch(error){
        res.send(errorResult(error))
    }
})

router.get('/' , async (req , res) => {
    const sql = "SELECT oid,odate,deldate,total_amount FROM orders WHERE uid = ?"

    try{
        const data = await pool.query(sql , [req.headers.uid]);
        res.send(successResult(data[0]))
    }catch(error){
        res.send(errorResult(error))
    }
})

module.exports = router