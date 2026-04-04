const getConnection = require('../data/mysql')
class ProductosService{

    async getProd(nombre, idcateg, precioMin, precioMax){ 
        const connection = await getConnection()
        let query =`  
        SELECT 
            c.pro_id id,
            c.pro_nombre producto,
            c.pro_descripcion descripcion,
            c.pro_precio precio, 
            c.pro_idcateg idcateg,
            c.pro_idusualta usualta, 
            u1.usu_nombre AS Usuario1, 
            c.pro_fechaalta fechaalta, 
            c.pro_idusumod usumod, 
            u2.usu_nombre AS Usuario2, 
            c.pro_fechamod fechamod
        FROM 
            productos c
        LEFT JOIN 
            categorias categ ON c.pro_idcateg = categ.cat_id
        LEFT JOIN 
            usuarios u1 ON c.pro_idusualta = u1.usu_id 
        LEFT JOIN 
            usuarios u2 ON c.pro_idusumod = u2.usu_id
        WHERE 
                c.pro_idusubaja IS NULL AND 
                c.pro_fechabaja IS NULL
        `; 

        const params = []; 

        if (nombre) { 
            query += ' AND c.pro_nombre = ?'; 
            params.push(nombre);
        }

        if (idcateg) { 
            query += ' AND c.pro_idcateg = ?'; 
            params.push(idcateg); 
        }

        if (precioMin) { 
            query += ' AND c.pro_precio >= ?'; 
            params.push(precioMin); 
        }

        if (precioMax) { 
            query += ' AND c.pro_precio <= ?'; 
            params.push(precioMax); 
        }

        const data = await connection.query(query, params); 
        console.log(data); 
        return data; 
    }


    async getPPorId(idProd){
        const connection = await getConnection()
        const data = await connection.query(`
            SELECT 
                c.pro_id id, 
                c.pro_nombre producto,
                c.pro_descripcion descripcion, 
                c.pro_precio precio,
                c.pro_idcateg idcateg,
                c.pro_idusualta usualta, 
                u1.usu_nombre AS Usuario1, 
                c.pro_fechaalta fechaalta, 
                c.pro_idusumod usumod, 
                u2.usu_nombre AS Usuario2, 
                c.pro_fechamod fechamod,
                c.pro_idusubaja usubaja, 
                u3.usu_nombre AS Usuario3, 
                c.pro_fechabaja  fechabaja               
            FROM 
                productos c 
            LEFT JOIN 
                categorias categ ON c.pro_idcateg = categ.cat_id
            LEFT JOIN 
                usuarios u1 ON c.pro_idusualta = u1.usu_id 
            LEFT JOIN 
                usuarios u2 ON c.pro_idusumod = u2.usu_id 
            LEFT JOIN 
                usuarios u3 ON c.pro_idusubaja = u3.usu_id
                where pro_id = ?`, [idProd])
        return data
    }

    async postProd(nuevoProducto, idcateg) { 
        
        const connection = await getConnection() 

        const data = await connection.query(
            "SELECT 1 FROM categorias WHERE cat_id = ?",
            [idcateg]
        );

        if (data.length === 0) {
            throw new Error(`No existe la categoría con Id ${idcateg}`);
        }

        const insert = `INSERT INTO productos (pro_nombre, pro_descripcion, pro_precio, pro_idcateg, pro_idusualta,
             pro_fechaalta) VALUES (?,?,?,?,?,now())`; 
        const valuesInsert = [nuevoProducto.nombre, nuevoProducto.descripcion, nuevoProducto.precio, 
            nuevoProducto.idcateg, nuevoProducto.idusuaccion]; 

        const result = await connection.query(insert, valuesInsert);
        const id = result.insertId; 
        return { id, nombre: nuevoProducto.nombre, descripcion: nuevoProducto.descripcion, precio: nuevoProducto.precio, 
            idcateg: nuevoProducto.idcateg}; 
    }

    async deleteProd(idProd, idusuaccion) { 
        const connection = await getConnection() 
        const data = await connection.query(`SELECT 1 FROM productos WHERE pro_id = ? AND pro_idusubaja IS NULL 
            AND pro_fechabaja IS NULL`, [idProd]);
        if (data.length === 0) {
            throw new Error(`No existe el producto con Id ${idProd}`);
        }

        await connection.query("UPDATE productos SET pro_idusubaja = ?, pro_fechabaja = NOW() where pro_id = ?",
             [idusuaccion, idProd]);
        return { resultado: "producto eliminado con exito" }; 
    }

    async putProd(productoActualizado, idProd) { 
        const connection = await getConnection() 
        const data = await connection.query(`SELECT 1 FROM productos WHERE pro_id = ? AND pro_idusubaja IS NULL
             AND pro_fechabaja IS NULL`, [idProd]);
        if (data.length === 0) {
            throw new Error(`No existe el producto con Id ${idProd}`);
        }

        const update = `UPDATE productos SET pro_nombre = ?, pro_descripcion = ?, pro_precio = ?, pro_idcateg = ?,
            pro_idusumod = ?, pro_fechamod = NOW() where pro_id = ?`; 
        const valuesInsert = [productoActualizado.nombre, productoActualizado.descripcion, productoActualizado.precio, 
            productoActualizado.idcateg, productoActualizado.idusuaccion, idProd]; 

        await connection.query(update, valuesInsert); 
        return { id: idProd, nombre: productoActualizado.nombre, descripcion: productoActualizado.descripcion, 
            precio: productoActualizado.precio, idcateg: productoActualizado.idcateg}; 
    }
}

module.exports = ProductosService