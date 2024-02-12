
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')
var bodyParser = require('body-parser')
const contactRoutes = require('./routes/contactRoutes')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.options('*',cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/',contactRoutes)

// app.get("/",(req,res) => {
//     res.send(`hii welcome to express home route`)
// })

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log(`Database is connected`)
}).catch((err) => {
    console.log(`Database got some error ${err}`)
})

const PORT_NO = process.env.PORT_NO

app.listen(`${PORT_NO}`,() => {
    console.log(`server is running on port ${PORT_NO}`)
})