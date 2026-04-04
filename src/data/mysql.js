const mysql = require('promise-mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,    
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE 
})
.then((connection) => { 
    console.log('conexion a mySQL exitosa'); 
    return connection; 
})
.catch((error) => { 
    console.error('se produjo un Error:', error); 
    throw error;  
});

function getConnection(){
    return connection  
}

module.exports = getConnection 

