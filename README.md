Proyecto Final del Curso de Programación Backend - CoderHouse
Este proyecto es el trabajo final del curso de Programación Backend de CoderHouse, donde se desarrolló un ecommerce completo desde cero utilizando Express, Node.js y Handlebars.

Descripción del Proyecto
Se creó un ecommerce que permite a los usuarios navegar por distintas categorías de productos, agregar productos al carrito de compras, realizar pedidos y efectuar pagos.

El frontend está implementado con el motor de plantillas Handlebars.

El backend está desarrollado con Express y Node.js.

Características Principales
Navegación de productos: Explorar categorías y ver detalles de productos.

Carrito de compras: Agregar productos, ver resumen y proceder al pago.

Proceso de pedido: Completar el pedido con información de envío y método de pago.

Integración de pago: Usa una pasarela externa para el procesamiento de pagos (se debe especificar cuál).

Envío de correos:

Notificación a usuarios premium cuando sus productos son eliminados.

Aviso a usuarios borrados por inactividad.

Confirmación de compra con todos los detalles.

Sistema seguro de reseteo de contraseña mediante email con verificación.

Instalación
Clonar este repositorio localmente.

Instalar dependencias:

bash
Copiar
Editar
npm install
Crear un archivo .env en la carpeta config con las variables de entorno siguiendo el archivo .env.example.

Iniciar la aplicación:

bash
Copiar
Editar
npm start
Roles de Usuario y Credenciales
Admin:

Puede crear, eliminar y modificar productos.

Gestionar usuarios (cambiar rol a premium y eliminarlos).

Gestionar carritos y tickets.

Credenciales:

Email: adminCoder@coder.com

Contraseña: 12345qwert

User:

Puede realizar un proceso completo de compra.

Premium:

Funciones de usuario.

Puede crear, editar y eliminar sus propios productos.

Funcionalidades de Envío de Correos
Se envía email cuando un producto de un usuario premium es eliminado.

Se envía email cuando un usuario es eliminado por inactividad.

Se envía email al finalizar una compra con todos los datos.

Pruebas y Documentación
Se realizaron pruebas de rendimiento, unitarias e integración con Mocha, Chai y Supertest.

La documentación de la API está disponible en Swagger en el endpoint:

bash
Copiar
Editar
/api/docs
(Para muchos endpoints se requieren credenciales de administrador).

Licencia
Este proyecto está bajo la Licencia MIT. Para más detalles, consultar el archivo LICENSE.

Final Project of Backend Programming Course - CoderHouse
This is the final project of the CoderHouse Backend Programming course, where a full ecommerce was developed from scratch using Express, Node.js, and Handlebars.

Project Description
The project consists of a complete ecommerce that allows users to browse different product categories, add products to the shopping cart, place orders, and make payments.

The frontend is implemented with Handlebars template engine.

The backend is built with Express and Node.js.

Key Features
Product Navigation: Browse categories and view product details.

Shopping Cart: Add products, view summary, and checkout.

Order Process: Complete order with shipping and payment info.

Payment Integration: Uses an external payment gateway (please specify).

Email Notifications:

Sent to premium users when their products are deleted.

Sent to users deleted due to inactivity.

Sent upon purchase completion with all relevant information.

Secure password reset system via email verification.

Installation
Clone the repository locally.

Install dependencies:

bash
Copiar
Editar
npm install
Create a .env file inside the config folder with the environment variables according to .env.example.

Start the app:

bash
Copiar
Editar
npm start
User Roles and Credentials
Admin:

Can create, delete, and modify products.

Manage users (change role to premium and delete users).

Manage carts and tickets.

Credentials:

Email: adminCoder@coder.com

Password: 12345qwert

User:

Can complete full purchase flow.

Premium:

User functionalities.

Can create, edit, and delete own products.

Email Features
Email sent when a premium user’s product is deleted.

Email sent when users are deleted for inactivity.

Email sent upon purchase completion.

Testing and Documentation
Performance, unit, and integration tests done with Mocha, Chai, and Supertest.

API documentation available in Swagger at:

bash
Copiar
Editar
/api/docs
(Admin credentials needed for many endpoints).

License
This project is licensed under the MIT License. See the LICENSE file for details.
