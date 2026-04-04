const Joi = require('joi') 

const id = Joi.number().min(1)
const user = Joi.string().alphanum().min(3).max(15)
const pass = Joi.string().alphanum().min(3).max(15)
const nombre = Joi.string().min(3).max(30)
const esadmin = Joi.number().max(1)

const crearUsuarioSchema = Joi.object({ 
    id:id,  
    user: user.required(),
    pass: pass.required(),  
    nombre: nombre.required(),
    esadmin : esadmin.required()
})

const loginSchema = Joi.object({ 
    user: user.required(),
    pass: pass.required(),  
})


module.exports = {crearUsuarioSchema,loginSchema}