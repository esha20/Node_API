// console.log('Hello');

const express = require('express')
const app = express()

//routes
app.get('/',(req,res)=>{
    res.send('Hello node API')
})

app.listen(5000, ()=>{
    console.log('Node API Oneshot is running on port 5000');
})