class ProductManager {
    constructor() {
        this.productos = [];
    }

    //Para agregar un producto
    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar para que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Validar que no se repita el campo "code"
        if (this.productos.some(product => product.code === code)) {
            console.error("Ya existe un producto con ese código.");
            return;
        }

        const newProduct = {
            id: this.#getId(), //Para agregar los id a los productos
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        //llevar los productos al array vacio (productos)
        this.productos.push(newProduct);
        console.log("Producto agregado correctamente.");
    }

    //Mostrar los productos
    getProducts() {
        return this.productos
    }

    //Funcion para sumar y agregar los id
    #getId (){
        if (this.productos.length === 0) return 1

        return this.productos[this.productos.length -1].id +1
    }

    //Función para buscar los productos por id
    getProductById(id) {
        const product = this.productos.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Not found");
        }
    }
}

const products = new ProductManager();
products.addProduct("Producto 1", "Descripción del producto 1", 20, "imagen1.jpg", "CODE1", 10);
products.addProduct("Producto 2", "Descripción del producto 2", 30, "imagen2.jpg", "CODE2", 15);

console.log(products.getProducts());

const product = products.getProductById(1);
console.log(product);

const producto_NotFound = products.getProductById(3);