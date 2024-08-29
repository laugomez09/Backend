### README - Español

# Proyecto Final del Curso de Programación Backend - CoderHouse

Este es el proyecto final del curso de Programación Backend de CoderHouse, donde se desarrolló un ecommerce desde cero utilizando Express, Node.js y Handlebars.

## Descripción del Proyecto

El proyecto consiste en la creación de un ecommerce completo, que permite a los usuarios navegar por diferentes categorías de productos, agregar productos al carrito de compras, realizar pedidos y realizar pagos. El frontend está implementado utilizando el motor de plantillas Handlebars, mientras que el backend está construido con Express y Node.js.

## Características Principales

- **Navegación de Productos:** Los usuarios pueden explorar diferentes categorías de productos y ver los detalles de cada producto.
- **Carrito de Compras:** Los usuarios pueden agregar productos al carrito de compras, ver el resumen del carrito y proceder al proceso de pago.
- **Proceso de Pedido:** Los usuarios pueden completar el proceso de pedido ingresando su información de envío y método de pago.
- **Integración de Pago:** El proyecto cuenta con integración de pago utilizando una pasarela de pago externa (se debe proporcionar más información sobre la pasarela de pago utilizada).

## Instalación

1.  Clona este repositorio en tu máquina local.
2.  Instala las dependencias del proyecto utilizando npm:

```
npm install
```

1.  Crea un archivo **.env** en la carpeta **config** dentro de la raíz del proyecto y configura las variables de entorno necesarias según el archivo **.env.example**.
2.  Inicia la aplicación:

```
npm start
```

## Roles de Usuario y Credenciales

Existen distintos roles de usuario en la aplicación:

- **Admin:** Puede crear, eliminar y modificar productos, gestionar usuarios (cambiar su rol a premium y borrarlos), y gestionar carritos y tickets. Las credenciales de administrador son:

  - Email: adminCoder@coder.com
  - Contraseña: 12345qwert

- **User:** Puede realizar un proceso de compra completo.
- **Premium:** Además de las funciones de usuario, puede crear productos y editar y borrar sus propios productos.

## Funcionalidades de Envío de Correos

El ecommerce utiliza NodeMailer para el envío de correos en las siguientes situaciones:

- Se envía un email a un usuario premium cuando se elimina uno de sus productos.
- Se envía un email a los usuarios borrados por inactividad.
- Se envía un email al finalizar una compra con toda la información de la misma.
- El ecommerce dispone de un sistema de reseteado de contraseña protegido que funciona a través del envío de email con verificación.

## Pruebas y Documentación

Se han realizado pruebas de rendimiento y tests unitarios y de integración mediante mocha, chai y supertest. Además, la documentación de la API está disponible en Swagger en el endpoint **/api/docs**, donde se pueden probar todos los endpoints (se requieren credenciales de administrador para muchos de ellos).

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

### README - English

# Final Project of Backend Programming Course - CoderHouse

This is the final project of the CoderHouse Backend Programming course, where an ecommerce was developed from scratch using Express, Node.js, and Handlebars.

## Project Description

The project consists of creating a complete ecommerce, which allows users to navigate through different product categories, add products to the shopping cart, place orders, and make payments. The frontend is implemented using the Handlebars template engine, while the backend is built with Express and Node.js.

## Key Features

- **Product Navigation:** Users can browse through different product categories and view the details of each product.
- **Shopping Cart:** Users can add products to the shopping cart, view the cart summary, and proceed to the checkout process.
- **Order Process:** Users can complete the order process by entering their shipping information and payment method.
- **Payment Integration:** The project includes payment integration using an external payment gateway (more information about the payment gateway used should be provided).

## Installation

1.  Clone this repository to your local machine.
2.  Install the project dependencies using npm:

```
npm install
```

1.  Create a **.env** file in the **config** folder at the root of the project and configure the necessary environment variables according to the **.env.example** file.
2.  Start the application:

```
npm start
```

## User Roles and Credentials

There are different user roles in the application:

- **Admin:** Can create, delete, and modify products, manage users (change their role to premium and delete them), and manage carts and tickets. The administrator credentials are:

  - Email: adminCoder@coder.com
  - Password: 12345qwert

- **User:** Can complete a full purchase process.
- **Premium:** In addition to user functions, can create products and edit and delete their own products.

## Email Sending Features

The ecommerce uses NodeMailer for email sending in the following situations:

- An email is sent to a premium user when one of their products is deleted.
- An email is sent to users deleted due to inactivity.
- An email is sent when completing a purchase with all the relevant information.
- The ecommerce has a protected password reset system that works through email verification.

## Testing and Documentation

Performance tests and unit and integration tests have been conducted using Mocha, Chai, and Supertest. Additionally, the API documentation is available on Swagger at the **/api/docs** endpoint, where all endpoints can be tested (administrator credentials are required for many of them).

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
