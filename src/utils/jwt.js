const jwt = require('jsonwebtoken')

function sign(data){ 
    return jwt.sign(data, process.env.JWT_SECRET) 
}

function getToken(auth) {
    if(!auth){ 
        const error = new Error("No hay Token") .
        error.status = 400 
        throw error
    }

    if(auth.indexOf('Bearer') === -1){ 
        console.log(auth)
        const error = new Error("Token Invalido") 
        error.status = 400 
        throw error 
    }
    let token = auth.replace('Bearer ', '') 
    return token 
}

function decode(auth){ 
    const token = getToken(auth)  
    const decode = jwt.verify(token, process.env.JWT_SECRET) 
    return decode 
}

module.exports = {sign, getToken, decode} 
