const express = require('express') 
const {getCategorias,  
    getCategoriasPorId, 
    crearCategoria, 
    eliminarCategoria, 
    actualizarCategoria} = require('../controllers/categorias.controller')
const {checkAdmin, isEmpty} = require('../middlewares/secure')
const {getCategoriaIdPorSchema, 
    crearCategoriaPorSchema, 
    eliminarCategoriaSchema, 
    actualizarCategoriaSchema} = require('../schemas/categorias.schemas')
const validatorHandler = require('../middlewares/validator.handler')

const CategRouter = express.Router() 
CategRouter.use(express.json()) 

CategRouter.get('/',
    isEmpty(),
    getCategorias) 

CategRouter.get('/:id',
    validatorHandler(getCategoriaIdPorSchema,'params'),
    isEmpty(), 
    getCategoriasPorId) 
    
CategRouter.post('/',
    validatorHandler(crearCategoriaPorSchema,'body'),
    checkAdmin(),
    crearCategoria) 

CategRouter.delete('/:id', 
    validatorHandler(eliminarCategoriaSchema, 'params'),
    checkAdmin(),
    eliminarCategoria) 

CategRouter.put('/', 
    validatorHandler(actualizarCategoriaSchema, 'body'),
     checkAdmin(), 
     actualizarCategoria) 

module.exports = CategRouter
