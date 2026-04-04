const express = require('express') 
const {  
    getUsuarios,
    crearUsuario,
    login
} = require('../controllers/users.controllers')
const {checkAdmin} = require('../middlewares/secure')
const validatorHandler = require('../middlewares/validator.handler')
const { crearUsuarioSchema, loginSchema} = require('../schemas/users.schemas')

const userRouter = express.Router() 
userRouter.use(express.json()) 

userRouter.get('/', getUsuarios) 

userRouter.post('/auth/login',
    validatorHandler(loginSchema, 'body'), 
    checkAdmin(),
    login)

userRouter.post('/create',
    validatorHandler(crearUsuarioSchema, 'body'), 
    crearUsuario) 

module.exports= userRouter