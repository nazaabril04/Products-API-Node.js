const ProductosService = require('../services/productos.service')
const serviceProd = new ProductosService() 

async function getProductos(req, res, next) {
  try {
      const { nombre, idcateg, precioMin, precioMax } = req.query;
      const productos = await serviceProd.getProd(nombre, idcateg, precioMin, precioMax); 
      res.send(JSON.stringify(productos)); 
  } catch (error) {
      next(error); 
  }
}

async function getProductosPorId (req, res, next){
  try{
    const id = req.params.id 
    const producto = await serviceProd.getPPorId(id) 
    return res.send(JSON.stringify(producto)) 
  } catch (error) {
    next(error) 
  }
}

async function crearProducto(req, res, next){
  try{
    const productoNuevo = req.body 
    const idcateg = productoNuevo.idcateg
    const productoCreado = await serviceProd.postProd(productoNuevo, idcateg) 
    return res.send(JSON.stringify(productoCreado)) 
  } catch(error) {
    next(error) 
  }
}

async function eliminarProducto(req, res, next){
  try{
    const idProd = req.params.id 
    const idusuaccion = req.body.idusuaccion
    const productoEliminado = await serviceProd.deleteProd(idProd, idusuaccion) 
    return res.send(JSON.stringify(productoEliminado)) 
  } catch(error){
    next(error) 
  }
}

async function actualizarProducto(req, res, next){
  try{
    const idprod = req.body.id 
    const producto = req.body 
    const productoActualizado = await serviceProd.putProd(producto, idprod) 
    return res.send(JSON.stringify(productoActualizado)) 
  } catch(error){
    next(error) 
  }
}

module.exports = {
  getProductos,
  getProductosPorId,
  crearProducto,
  eliminarProducto,
  actualizarProducto
}