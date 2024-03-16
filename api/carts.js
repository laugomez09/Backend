import express from 'express';
import fs from 'fs';

const router = express.Router();

// Función asincrónica para leer el archivo de carritos
const readFileAsync = async (filePath) => {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data).carts;
    } catch (error) {
        throw new Error(`Error al leer el archivo ${filePath}: ${error.message}`);
    }
};

// Función asincrónica para escribir en el archivo de carritos
const writeFileAsync = async (filePath, data) => {
    try {
        await fs.promises.writeFile(filePath, JSON.stringify({ carts: data }));
    } catch (error) {
        throw new Error(`Error al escribir en el archivo ${filePath}: ${error.message}`);
    }
};

// Función para generar ID único de carrito
const generateCartId = () => {
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
};

// Ruta POST para crear nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = {
            id: generateCartId(),
            products: []
        };

        const carts = await readFileAsync('data/carrito.json');
        carts.push(newCart);
        await writeFileAsync('data/carrito.json', carts);
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta GET para obtener productos del carrito por id
router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carts = await readFileAsync('data/carrito.json');
        const foundCart = carts.find(cart => cart.id === cartId);
        if (!foundCart) {
            res.status(404).send('Carrito no encontrado');
            return;
        }
        res.json(foundCart.products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta POST para agregar producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid: cartId, pid: productId } = req.params;

    try {
        const carts = await readFileAsync('data/carrito.json');
        const foundCart = carts.find(cart => cart.id === cartId);
        if (!foundCart) {
            res.status(404).send('Carrito no encontrado');
            return;
        }
        foundCart.products.push({ id: productId });
        await writeFileAsync('data/carrito.json', carts);
        res.status(200).json(foundCart.products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta PUT para actualizar un carrito existente
router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedCartData = req.body; // Datos actualizados del carrito enviados en el cuerpo de la solicitud

    try {
        let carts = await readFileAsync('data/carrito.json');
        const foundCartIndex = carts.findIndex(cart => cart.id === cartId);
        if (foundCartIndex === -1) {
            res.status(404).send('Carrito no encontrado');
            return;
        }

        // Actualizar el carrito encontrado con los nuevos datos
        carts[foundCartIndex] = {
            ...carts[foundCartIndex],
            ...updatedCartData
        };

        await writeFileAsync('data/carrito.json', carts);
        res.status(200).json(carts[foundCartIndex]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
}); 7

// Ruta DELETE para eliminar un carrito existente
router.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid;

    try {
        let carts = await readFileAsync('data/carrito.json');
        const foundCartIndex = carts.findIndex(cart => cart.id === cartId);
        if (foundCartIndex === -1) {
            res.status(404).send('Carrito no encontrado');
            return;
        }

        // Eliminar el carrito encontrado del array de carritos
        carts.splice(foundCartIndex, 1);

        await writeFileAsync('data/carrito.json', carts);
        res.status(204).send();
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

export default router;