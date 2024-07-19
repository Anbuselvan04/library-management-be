require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const bookRoute = require('./routes/bookRoute')
const cors = require('cors')
const mongoose = require('mongoose')

app.get('/', (request, response)=>{
    response.status(200).json({message:"Library Books"})
})

app.use(express.json())
app.use(cors())

app.use('/api/v1/book',bookRoute)

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error',(error)=> console.log(error.message))
db.once('open',()=> console.log(`Connected to DB Successfully...`))

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})