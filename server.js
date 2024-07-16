const express = require('express')
const app = express()

//app.use('/', (req, res)=>{
//res.send('Hello World')
//})

app.get('/', (req,res) => {
    res.send('Hai aku method GET')
})
app.post('/', (req,res) => {
    res.send('Hai aku method POST')
})
app.put('/', (req,res) => {
    res.send('Hai aku method PUT')
})
app.delete('/', (req,res) => {
    res.send('Hai aku method DELETE')
})

app.listen(3000, ()=> {
  console.log("Server running on port: 3000")  
})