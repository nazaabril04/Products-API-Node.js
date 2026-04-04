const joi = require('joi') 

const id = joi.number().min(1)
const precio = joi.number()
const nombre = joi.string().min(2)
const descripcion = joi.string()
const idcateg = joi.number().min(1)

const getProductoPorIdSchema = joi.object({
    id: id,   
})

const crearProductoSchema = joi.object({ 
    id: id,
    nombre: nombre.required(),   
    descripcion: descripcion.required(),
    precio: precio.required(),
    idcateg: idcateg.required()
})

const eliminiarProductoSchema = joi.object({ 
    id: id.required() 
})

const actualizarProductoSchema = joi.object({ 
    id: id.required(), 
    nombre: nombre,              
    descripcion: descripcion,
    precio: precio,
    idcateg: idcateg
})

module.exports = {getProductoPorIdSchema,
    crearProductoSchema,
    eliminiarProductoSchema,
    actualizarProductoSchema}