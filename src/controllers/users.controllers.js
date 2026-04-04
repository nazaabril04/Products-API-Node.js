const UsuariosService = require ('../services/usuarios.service')
const serviceUsu = new UsuariosService() 

async function getUsuarios (req, res, next){
    try {
        const usuarios = await serviceUsu.get() 
        resultado = res.send(JSON.stringify(usuarios)) 
    } catch(error) {
        next(error) 
    }
}    

async function login (req, res, next){
    try {
        const usuario = await serviceUsu.login(req.body) 
        res.send(JSON.stringify(usuario)) 
    } catch (error) {
        next(error) 
    }        
}

async function crearUsuario(req,res,next){
    try {
        const usuarioNuevo= req.body 
        const usuarioCreado= await serviceUsu.crear(usuarioNuevo) 
        return res.send(JSON.stringify(usuarioCreado)) 
    } catch(error) {
        next(error) 
    }
}

module.exports = {
        getUsuarios,
        crearUsuario,
        login
    }   