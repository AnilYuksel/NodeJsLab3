const express = require('express')
const parser = require('body-parser')
const routes = require('./routes/routers')


//setups
const app = express()
app.set('view engine', 'ejs')

//middleware
app.use(parser.urlencoded({extended:false}))
app.use(express.static('./public'))
app.use(routes)

//server starts
app.listen(8000)