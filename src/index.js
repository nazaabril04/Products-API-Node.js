require('dotenv').config()

const express = require('express') 
const productRouter = require('./routers/productos.router')
const CategRouter = require('./routers/categorias.router')
const UsersRouter = require('./routers/users.router')
const {logError, errorHandler} = require('./middlewares/error.handler')

const app = express()

app.use('/api/productos', productRouter)
app.use('/api/categorias', CategRouter)
app.use('/api/users', UsersRouter)

app.use(logError)
app.use(errorHandler)

const PORT = process.env.PORT  
app.listen(PORT, () => { 
    console.log('servidor escuchando en el puerto ' + PORT)
})