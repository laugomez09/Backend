import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// Configuración de Multer para la carga de archivos
const upload = multer({ dest: 'uploads/' });

// Función asincrónica para leer el archivo de productos
const readFileAsync = async (filePath) => {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
};

// Función asincrónica para escribir en el archivo de productos
const writeFileAsync = async (filePath, data) => {
    try {
        await fs.promises.writeFile(filePath, JSON.stringify(data));
    } catch (error) {
        throw error;
    }
};

// Función para generar ID único de producto
function generateProductId() {
    const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `exshop_${randomNumber}`;
}

// Ruta GET raíz: listar todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await readFileAsync('data/products.json');
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta GET para obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    const productId = req.params.pid;

    try {
        const productos = await readFileAsync('data/products.json');
        const producto = productos.find(p => p.id === productId);
        if (!producto) {
            res.status(404).send('Producto no encontrado');
            return;
        }
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta POST para agregar un nuevo producto
router.post('/', upload.array('thumbnails', 5), async (req, res) => {
    const newProduct = {
        id: generateProductId(),
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails
    };

    try {
        let productos = await readFileAsync('data/products.json');
        productos.push(newProduct);
        await writeFileAsync('data/products.json', productos);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta PUT para actualizar un producto por su ID
router.put('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const updatedProduct = req.body;

    try {
        let productos = await readFileAsync('data/products.json');
        const index = productos.findIndex(p => p.id === productId);
        if (index === -1) {
            res.status(404).send('Producto no encontrado');
            return;
        }
        updatedProduct.id = productId;
        productos[index] = updatedProduct;
        await writeFileAsync('data/products.json', productos);
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta DELETE para eliminar un producto por su ID
router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;

    try {
        let productos = await readFileAsync('data/products.json');
        const index = productos.findIndex(p => p.id === productId);
        if (index === -1) {
            res.status(404).send('Producto no encontrado');
            return;
        }
        productos.splice(index, 1);
        await writeFileAsync('data/products.json', productos);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

export default router;