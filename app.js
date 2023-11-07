const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))

app.listen(3500, () => {
    console.log("servidor corriendo en puerto 3500")
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
})