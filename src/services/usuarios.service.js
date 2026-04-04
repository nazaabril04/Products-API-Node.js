const getConnection = require('../data/mysql') 
const {sign} = require("../utils/jwt")  
const bcrypt = require('bcrypt')

class UsuariosService{
    async get(){ 
        const connection = await getConnection()    
        const data = await connection.query('select * from usuarios')   
        return data     
    }

    async login(dataLogin){
        const connection = await getConnection() 
        const usuario = await connection.query(
            `SELECT usu_id id, usu_nombre nombre, usu_esadmin esadmin, usu_pass pass FROM usuarios WHERE usu_usuario = ?`,
             [dataLogin.user]
        ) 

        if(usuario[0]) {
            const {id, nombre, esadmin, pass} = usuario[0] 
            return bcrypt.compare(dataLogin.pass, pass) 
            .then(sonIguales => {
                if(sonIguales === true || dataLogin.pass === pass){
                    const token = {
                        token: sign({id, nombre, esadmin})
                    }
                    return {logueo: true, ...token} 
                } else {
                    const error = new Error("Datos de login incorrectos")
                    error.status = 400
                    throw error             
                } 
            })
        } else {
            const error = new Error("Datos de login incorrectos") 
            error.status = 400 
            throw error 
        }
    }
    
    async crear(usuarioNuevo){
        const connection = await getConnection()
        const insert = 'INSERT INTO usuarios (usu_usuario, usu_nombre, usu_pass, usu_esadmin) VALUES (?,?,?,?)' 
        const valuesInsert= [usuarioNuevo.user,usuarioNuevo.nombre,await bcrypt.hash(usuarioNuevo.pass, 5), 
            usuarioNuevo.esadmin , usuarioNuevo.idusuaccion] 

        const result = await connection.query(insert, valuesInsert) 
        const id = result.insertId 

        return {id, ...usuarioNuevo} 
    }
}

module.exports = UsuariosService 
