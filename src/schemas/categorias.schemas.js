const joi = require('joi') 


const id = joi.number().min(1)
const descripcion = joi.string().alphanum()

const getCategoriaIdPorSchema = joi.object({ 
    id: id 
})

const crearCategoriaPorSchema = joi.object({ 
    id: id, 
    descripcion: descripcion.required()
})

const eliminarCategoriaSchema = joi.object({ 
    id: id.required() 
})

const actualizarCategoriaSchema = joi.object({ 
    id: id.required(), 
    descripcion: descripcion  
})

module.exports = {getCategoriaIdPorSchema,
    crearCategoriaPorSchema,
    eliminarCategoriaSchema,
    actualizarCategoriaSchema}

