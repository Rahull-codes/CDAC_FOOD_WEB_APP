const express = require('express')
const cors = require('cors')

const authuser = require('./utils/authuser')

const userRouter = require('./routes/user')
const foodRouter = require('./routes/food')
const orderRouter = require('./routes/order')

const app = express()

app.use(cors())
app.use(express.static('FoodImage'))
app.use(express.json())

app.use(authuser)

app.use('/user' ,userRouter)
app.use('/food' , foodRouter)
app.use('/order' , orderRouter)


app.listen(4000 , 'localhost' , () => {
    console.log('Server running on port 4000');
    
})