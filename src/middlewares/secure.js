const { decode} = require('../utils/jwt') 

function checkAdmin() { 
    return (req, res, next) => {
        const authHeader = req.headers.authorization 
        const datos = decode(authHeader || '') 
        req.body.idusuaccion = datos.id 
        if (datos && datos.esadmin === 1) { 
            next() 
        } else { 
            const error = new Error("Privilegios insuficientes") 
            error.status = 400 
            next(error) 
        }
    }
}

function isEmpty(){
    return (req, res, next) => {
        const token = req.headers.authorization || ''
            if (token === '') {  
                const error = new Error("Token no proporcionado")
                error.status = 400
                next(error)
            } else {
                next()
            }
    }
}


module.exports = {checkAdmin, isEmpty} 


