const getConnection = require('../data/mysql')
class CategoriasService{

    async getCateg() { 
        const connection = await getConnection() 
        const query = `
            SELECT 
                c.cat_id id, 
                c.cat_descripcion descripcion, 
                c.cat_idusualta usualta, 
                u1.usu_nombre AS Usuario1, 
                c.cat_fechaalta fechaalta, 
                c.cat_idusumod usumod, 
                u2.usu_nombre AS Usuario2, 
                c.cat_fechamod fechamod
            FROM 
                categorias c 
            LEFT JOIN 
                usuarios u1 ON c.cat_idusualta = u1.usu_id 
            LEFT JOIN 
                usuarios u2 ON c.cat_idusumod = u2.usu_id
            WHERE 
                c.cat_idusubaja IS NULL AND 
                c.cat_fechabaja IS NULL
        `;
        const data = await connection.query(query); 
        return data; 
    }
    

    async getCategPorId(idcat){
        const connection = await getConnection() 
        const data = await connection.query(` 
            SELECT 
                c.cat_id id, 
                c.cat_descripcion descripcion, 
                c.cat_idusualta usualta, 
                u1.usu_nombre AS Usuario1, 
                c.cat_fechaalta fechaalta, 
                c.cat_idusumod usumod, 
                u2.usu_nombre AS Usuario2, 
                c.cat_fechamod fechamod,
                c.cat_idusubaja usubaja, 
                u3.usu_nombre AS Usuario3, 
                c.cat_fechabaja  fechabaja               
            FROM 
                categorias c 
            LEFT JOIN 
                usuarios u1 ON c.cat_idusualta = u1.usu_id 
            LEFT JOIN 
                usuarios u2 ON c.cat_idusumod = u2.usu_id 
            LEFT JOIN 
                usuarios u3 ON c.cat_idusubaja = u3.usu_id
                where cat_id = ?`, [idcat]) 
        return data 
    }

    async postCateg(nuevaCateg) {
        const connection = await getConnection() 
        const insert = "INSERT INTO categorias (cat_descripcion, cat_idusualta, cat_fechaalta) VALUES (?, ?, NOW())" 
        const valuesInsert = [nuevaCateg.descripcion, nuevaCateg.idusuaccion] 

        const result = await connection.query(insert, valuesInsert) 
        const id = result.insertId 

        return { id, descripcion: nuevaCateg.descripcion } 
    }

    async putCateg(categActualizada, idcat) {
        const connection = await getConnection() 

        const data = await connection.query(`SELECT 1 FROM categorias WHERE cat_id = ? AND cat_idusubaja IS NULL AND 
            cat_fechabaja IS NULL`, [idcat]);
        if (data.length === 0) {
            throw new Error(`No existe la categoria con Id ${idcat}`);
        }

        const update = `UPDATE categorias SET cat_descripcion = ?, cat_idusumod = ?, cat_fechamod = NOW() 
            WHERE cat_id = ?`
        const valuesInsert = [categActualizada.descripcion, categActualizada.idusuaccion, idcat] 

        await connection.query(update, valuesInsert) 

        return { id: idcat, descripcion: categActualizada.descripcion } 
    }

    async deleteCateg(idcat, idusuaccion) {
        const connection = await getConnection()

        const data = await connection.query(`SELECT 1 FROM categorias WHERE cat_id = ? AND cat_idusubaja IS NULL 
            AND cat_fechabaja IS NULL`, [idcat]);
        if (data.length === 0) {
            throw new Error(`No existe la categoria con Id ${idcat}`);
        }

        await connection.query(`UPDATE categorias SET cat_idusubaja = ?, cat_fechabaja = NOW() 
            WHERE cat_id = ?`, [idusuaccion, idcat]) 
        return { resultado: "categoria eliminada con éxito" } 
    }
}

module.exports = CategoriasService