# Plataforma de Comercio Electrónico Simplificada

Este proyecto es una plataforma de comercio electrónico simplificada implementada con Node.js, Express y TypeScript. La aplicación proporciona servicios de catálogo de productos y gestión de órdenes, y está documentada utilizando Swagger.

## Requisitos Previos

- Node.js (versión 12 o superior)
- MongoDB (en funcionamiento localmente o en un servicio de nube)
- npm (administrador de paquetes de Node.js)

## Configuración del Proyecto

1. **Clona el repositorio**:

   git clone https://github.com/tu-usuario/ecommerce-backend.git
   cd ecommerce-backend

    Instala las dependencias:

    npm install

    Configura la base de datos:

    Asegúrate de que MongoDB esté en funcionamiento. La configuración por defecto se conecta a mongodb://localhost:27017/ecommerce. Puedes cambiar la URL de la base de datos en el archivo src/app.ts si es necesario.

Ejecución de la Aplicación

    Compila el proyecto:

npm run build

Inicia la aplicación:

    npm start

    La aplicación se ejecutará en http://localhost:3000.

    Accede a la documentación de la API:

    Visita http://localhost:3000/api-docs para ver la documentación Swagger de la API.

Endpoints de la API Productos

    GET /api/products : Obtiene todos los productos.
    GET /api/products/ : Obtiene un producto por ID.
    POST /api/products: Crea un nuevo producto.
    PUT /api/products/ : Actualiza un producto por ID.
    DELETE /api/products/ : Elimina un producto por ID.

Órdenes

    GET /api/orders : Obtiene todas las órdenes.
    GET /api/orders/ : Obtiene una orden por ID.
    POST /api/orders : Crea una nueva orden.
    PUT /api/orders/ : Actualiza una orden por ID.
    DELETE /api/orders/ : Elimina una orden por ID.