const CategoriasService = require('../services/categorias.service')
const serviceCateg = new CategoriasService()  

async function getCategorias(req, res, next){
    try {
        const categorias = await serviceCateg.getCateg() 
        res.send(JSON.stringify(categorias)) 
    } catch(error) {
        next(error) 
    }
}

async function getCategoriasPorId(req, res, next){
    try {
        const id = req.params.id 
        const categorias = await serviceCateg.getCategPorId(id) 
        return res.send(JSON.stringify(categorias)) 
    } catch(error) {
        next(error) 
    }
}

async function crearCategoria(req, res, next){
    try {
        const categoriaNueva = req.body 
        const categoriaCreada = await serviceCateg.postCateg(categoriaNueva) 
        return res.send(JSON.stringify(categoriaCreada)) 
    } catch(error) {
        next(error) 
    }
}

async function actualizarCategoria(req, res, next){
    try {
        const idcat = req.body.id 
        const descripcion = req.body 
        const categoriaActualizada = await serviceCateg.putCateg(descripcion, idcat) 
        return res.send(JSON.stringify(categoriaActualizada)) 
    } catch (error) {
        next(error) 
    }
}

async function eliminarCategoria(req, res, next){
    try {
        const idcat = req.params.id 
        const idusuaccion = req.body.idusuaccion
        const categoriaEliminada = await serviceCateg.deleteCateg(idcat, idusuaccion) 
        return res.send(JSON.stringify(categoriaEliminada)) 
    } catch(error) {
        next(error)
    }
}

module.exports = {
    getCategorias, 
    getCategoriasPorId, 
    crearCategoria, 
    actualizarCategoria,
    eliminarCategoria
}
