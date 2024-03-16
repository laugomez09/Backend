import express from 'express';
import productsRouter from './api/products.js';
import cartsRouter from './api/carts.js';

// Configuración de Express
const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});