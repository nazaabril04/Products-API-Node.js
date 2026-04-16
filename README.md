# Sistema de Venta de Productos

## Descripcion 
Aplicacion para la gestion de usuarios, productos y categorias, incluyendo alta, baja, modificacion y consulta de los mismos. 

## Tecnologias
- JavaScript (Node.js)
- MySql
- Visual Studio Code

## Base de datos
### Tabla de usuarios:
- Id
- Nombre de usuario
- Password (debe estar encriptada)
- Nombre y apellido
- Es administrador

### Tabla de categorías:
- Id
- Descripción
- Id usuario de alta (FK de la tabla de usuarios)
- Fecha de alta
- Id usuario modificación (FK de la tabla de usuarios)
- Fecha de modificación
- Id usuario de baja (FK de la tabla de usuarios)
- Fecha de baja

### Tabla de productos:
- Id
- Nombre
- Descripción
- Precio
- Id categoría (FK de la tabla de categorías)
- Id usuario de alta (FK de la tabla de usuarios)
- Fecha de alta
- Id usuario modificación (FK de la tabla de usuarios)
- Fecha de modificación
- Id usuario de baja (FK de la tabla de usuarios)
- Fecha de baja

## Funcionalidad
A continuación, se detallan los métodos del servicio:

## Consulta de categorías
### Descripción:
Devuelve todas las categorías que no estén dadas de baja

### Devuelve:
- Id
- Descripción
- Id usuario de alta
- Nombre y apellido del usuario de alta
- Fecha de alta
- Id usuario modificación
- Nombre y apellido del usuario de modificación
- Fecha de modificación (Este método puede ser ejecutado por cualquier usuario con un token válido)

## Consulta de categoría por id
### Descripción: 
Devuelve la categoría recibida como parámetro, se pueden consultar las categorías dadas de baja.

### Devuelve:
- Id
- Descripción
- Id usuario de alta
- Nombre y apellido del usuario de alta
- Fecha de alta
- Id usuario modificación
- Nombre y apellido del usuario de modificación
- Fecha de modificación
- Id usuario de baja
- Nombre y apellido del usuario de baja
- Fecha de baja (Este método puede ser ejecutado por cualquier usuario con un token válido)

## Alta de categoría
### Descripción: 
Permite dar de alta una nueva categoría

### Recibe:
- Descripción
### Devuelve:
- Id
- Descripción (Este método solo puede ser ejecutado por un administrador)

## Modificación de categorías
### Descripción: 
Permite modificar una categoría

### Recibe:
- Id de la categoría a modificar
- Descripción
### Devuelve:
- Id
- Descripción (Este método solo puede ser ejecutado por un administrador)

## Baja de categoría
### Descripción: 
Realiza la baja lógica de la categoría (Este método solo puede ser ejecutado por un administrador)

## Consulta de productos
### Descripción: 
Devuelve todos los productos que no estén dados de baja, pudiendo opcionalmente filtrar por rango de precios, nombre y/o categoría.

### Devuelve:
- Id
- Nombre
- Descripción
- Precio
- Id categoría
- Nombre de la categoría
- Id usuario de alta
- Nombre y apellido del usuario de alta
- Fecha de alta
- Id usuario modificación 
- Nombre y apellido del usuario de modificación
- Fecha de modificación (Este método puede ser ejecutado por cualquier usuario con un token válido)

## Consulta de producto por id
### Descripción: 
Devuelve el producto recibido como parámetro, se pueden consultar los productos dados de baja.

### Devuelve:
- Id
- Nombre
- Descripción
- Precio
- Id categoría
- Nombre de la categoría
- Id usuario de alta
- Nombre y apellido del usuario de alta
- Fecha de alta
- Id usuario modificación 
- Nombre y apellido del usuario de modificación
- Fecha de modificación
- Id usuario de baja
- Nombre y apellido del usuario de baja
- Fecha de baja (Este método puede ser ejecutado por cualquier usuario con un token válido)

## Alta de producto
### Descripción: 
Permite dar de alta un nuevo producto.

### Recibe:
- Nombre
- Descripción
- Precio
- Id categoría
### Devuelve:
- Id
- Nombre
- Descripción
- Precio
- Id categoría (Este método solo puede ser ejecutado por un administrador)

## Modificación de producto
### Descripción: 
Permite modificar un producto.

### Recibe:
- Id del producto a modificar
- Nombre
- Descripción
- Precio
- Id categoría
### Devuelve:
- Id
- Nombre
- Descripción
- Precio
- Id categoría (Este método solo puede ser ejecutado por un administrador)

## Baja de producto
### Descripción: 
Realiza la baja lógica del producto (Este método solo puede ser ejecutado por un administrador)

## Login
### Descripción: 
Permite a los usuarios obtener un token para invocar el resto de las funcionalidades.

### Recibe:
- Nombre de usuario
- Contraseña
### Devuelve:
- Resultado: True/False
- Token JWT (Este método solo puede ser ejecutado por un administrador)

# Aspectos técnicos
- Se utilizó una arquitectura que permite escalar la aplicación y realizar cambios con facilidad.
- Implementacion de middlewares de manejo de errores, validación de datos y autenticación.
- Devolver códigos de estado correctos.
- Uso de token JWT para la autenticación de los usuarios
- Uso de un archivo .env para variables de entorno
- Contraseñas encriptadas

# Instalacion y Ejecución 
1. Clonar el proyecto:

` git clone <URL-DEL-REPOSITORIO> `

2. Instalar dependencias;

` npm install `

3. 





