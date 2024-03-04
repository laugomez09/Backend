import { promises as fs, writeFile } from "fs";

class ProductManager {
    constructor() {
        this.path = "./products.txt";
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
        return JSON.parse(listOfProducts)
    }

    getProducts = async () => {
        let respuesta = await this.readProducts()
        return console.log(respuesta)
    }

    getProductsById = async (id) => {
        let Byid = await this.readProducts()
        if(!Byid.find(product => product.id === id)){
            console.error("Prducto no encontrado")
        }else{
            console.log(Byid.find(product => product.id === id))
        }
    }

    deleteProduct = async (id) => {
        let deleteProducts = await this.readProducts();
        let productFilter = deleteProducts.Filter(product => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Se ha eliminado el siguiente producto:\n" +productFilter)
    }

    updateProducts = async ({id, ...product}) =>{
        await this.deleteProduct(id)
        let productOld = await this.readProducts()
        let productModif = [{id, ...product}, ...productOld]
        await fs.writeFile(this.path, JSON.stringify(productModif))
    }

}

const productos = new ProductManager;

productos.addProduct("Producto 1", "Descripción del producto 1", 20, "imagen1.jpg", "CODE1", 10);
productos.addProduct("Producto 2", "Descripción del producto 2", 30, "imagen2.jpg", "CODE2", 15);