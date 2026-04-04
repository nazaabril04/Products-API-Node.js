const express = require('express') 
const {getProductos,     
    getProductosPorId,
    crearProducto,
    eliminarProducto,
    actualizarProducto} = require('../controllers/productos.controller')
const {checkAdmin, isEmpty} = require('../middlewares/secure')
const {getProductoPorIdSchema,
    crearProductoSchema,
    eliminiarProductoSchema,
    actualizarProductoSchema} = require('../schemas/productos.schemas')
const validatorHandler = require('../middlewares/validator.handler')

const ProductRouter = express.Router() 
ProductRouter.use(express.json()) 

ProductRouter.get('/', 
    isEmpty(),
    getProductos)

ProductRouter.get('/:id', 
    validatorHandler(getProductoPorIdSchema, 'params'),
    isEmpty(),
    getProductosPorId)

ProductRouter.post('/',
    validatorHandler(crearProductoSchema, 'body'),
    checkAdmin(),
    crearProducto) 

ProductRouter.delete('/:id',
    validatorHandler(eliminiarProductoSchema, 'params'),
    checkAdmin(),
    eliminarProducto) 

ProductRouter.put('/', 
    validatorHandler(actualizarProductoSchema, 'body'),
    checkAdmin(),
    actualizarProducto) 

module.exports = ProductRouter