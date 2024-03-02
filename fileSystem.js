import { promises as fs } from "fs";

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

        await fs.writeFile(this.path, JSON.stringify(this.products));
    }

    readProducts = async () => {
        let lista_de_products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(lista_de_products)
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

}

const productos = new ProductManager;

productos.addProduct("Producto 1", "Descripción del producto 1", 20, "imagen1.jpg", "CODE1", 10);
productos.addProduct("Producto 2", "Descripción del producto 2", 30, "imagen2.jpg", "CODE2", 15);