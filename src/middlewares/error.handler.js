function logError(err, req, res, next){ 
    console.log('logError')
    console.error(err)
    next(err) 
}

function errorHandler(err, req, res, next){
    console.log("errorHandler")
    const statusCode = err.status || 500 
    res.status(statusCode).send({
        error: true,
        message: statusCode === 500 ? 'se produjo un error' : err.message 
    })
}

module.exports = {logError, errorHandler}