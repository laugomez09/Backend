import fs from 'fs';

class ProductManager {

    static id = 0;

    constructor(fileName) {
        this.path = fileName;
        if (fs.existsSync(this.path)) {
            try {
                const fileText = fs.readFileSync(this.path, "utf-8");
                this.products = JSON.parse(fileText);
            } catch (error) {
                console.log(`Error al parsear el archivo: ${error}`);
                this.products = [];
            }
        } else {
            this.products = [];
            this.saveFile();
        }
    }

//Para agregar los productos
    async addProduct(name, description, price, imageUrl, code, stock) {
        const newProduct = {
            id: ++ProductManager.id,
            name,
            description,
            price,
            imageUrl,
            code,
            stock,
        };
        this.products.push(newProduct);
        await this.saveFile();
    }

//Para mostrar los productos
    getProducts() {
        return [...this.products];
    }

//Para mostrar por id
    getProductById(id) {
        const product = this.products.find((producto) => producto.id === id);
        if (product) {
            return product;
        } else {
            return { error: "Producto no encontrado" };
        }
    }

    async saveFile() {
        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t"),
                "utf-8"
            );
        } catch (error) {
            console.log(`Surgio un error en: ${error}`);
        }
    }

//Para borrar productos
    async deleteProduct(id) {
        const productElimined = this.products.find((p) => p.id == id);
        if (productElimined) {
            const newProductsArray = this.products.filter((p) => p.id != id);
            this.products = newProductsArray;
            await this.saveFile();
        } else {
            console.log("¡ERROR!");
        }
    }


    updateProduct(id, updatedFields) {
        const productToUpdate = this.products.find((p) => p.id === id);
        if (productToUpdate) {
            Object.assign(productToUpdate, updatedFields);
            this.saveFile();
        } else {
            console.log("Error: Producto no encontrado.");
        }
    }
}
const productos = new ProductManager("coca", "bebida fria", 20, "cosdgre", 52, 2)

console.log(productos.getProducts())
//productos.deleteProduct(1)
console.log(productos.getProducts())

//Exportando
export default ProductManager;