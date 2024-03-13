import { promises as fs, writeFile } from "fs";

export default class ProductManager {
    constructor() {

        this.path = './products.txt'
        this.products = [];
    }

    static id = 0

    //Para agregar un producto
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id++
        }

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
    }

    readProducts = async () => {
        let listOfProducts = await fs.readFile(this.path, "utf-8")
        return listOfProducts
    }

    getProducts = async () => {
        let respuesta = await this.readProducts()
        return console.log(respuesta)
    }

    getProductsById = async (id) => {
        let Byid = await this.readProducts()
        if (!Byid.find(product => product.id === id)) {
            console.error("Prducto no encontrado")
        } else {
            console.log(Byid.find(product => product.id === id))
        }
    }

    deleteProduct = async (id) => {
        let deleteProducts = await this.readProducts();
        let productFilter = deleteProducts.Filter(product => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Se ha eliminado el siguiente producto:\n" + productFilter)
    }

    updateProducts = async ({ id, ...product }) => {
        await this.deleteProduct(id)
        let productOld = await this.readProducts()
        let productModif = [{ id, ...product }, ...productOld]
        await fs.writeFile(this.path, JSON.stringify(productModif))
    }

}

const productos = new ProductManager();

productos.addProduct("Producto 1", "Descripción del producto 1", 20, "imagen1.jpg", "CODE1", 10);
productos.addProduct("Producto 2", "Descripción del producto 2", 30, "imagen2.jpg", "CODE2", 15);
productos.addProduct("Producto 3", "Descripción del producto 3", 40, "imagen3.jpg", "CODE3", 20);
productos.addProduct("Producto 4", "Descripción del producto 4", 50, "imagen4.jpg", "CODE4", 25);
productos.addProduct("Producto 5", "Descripción del producto 5", 60, "imagen5.jpg", "CODE5", 30);
productos.addProduct("Producto 6", "Descripción del producto 6", 70, "imagen6.jpg", "CODE6", 35);
productos.addProduct("Producto 7", "Descripción del producto 7", 80, "imagen7.jpg", "CODE7", 40);
productos.addProduct("Producto 8", "Descripción del producto 8", 90, "imagen8.jpg", "CODE8", 45);
productos.addProduct("Producto 9", "Descripción del producto 9", 100, "imagen9.jpg", "CODE9", 50);
productos.addProduct("Producto 10", "Descripción del producto 10", 110, "imagen10.jpg", "CODE10", 55);
