import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import passport from "passport"

import productsRouter from "./routes/productsRouter.js"
import cartsRouter from "./routes/cartsRouter.js"
import viewsRouter from "./routes/viewsRouter.js"
import cookiesRouter from "./routes/cookiesRouter.js"
import sessionsRouter from "./routes/sessionsRouter.js"
import __dirname from "./utils.js"
import { productController } from "./controllers/productController.js"
import { cartController } from "./controllers/cartController.js"
import initializatePassport from "./config/passportConfig.js"
import config from "./config/config.js"
import { sessionMiddleware } from "./middlewares/session.js"

const { port, mongoUrl } = config

const app = express()

const httpServer = app.listen(port, () => {
    console.log(`Servidor activo en http://localhost:${port}`)
})

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../public`));
app.use(cookieParser())
app.use(sessionMiddleware)
socketServer.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});

initializatePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/", viewsRouter)
app.use("/cookies", cookiesRouter)


const connection = async () => {

    try {

        await mongoose.connect(mongoUrl)

    } catch (error) {

        console.error(error)

    }
}

connection()


//REFACTORIZAR EN SCRIPT APARTE
socketServer.on("connection", socket => {

    const session = socket.request.session;

    console.log(session.user);

    console.log("nuevo cliente conectado")

    socket.on("addProduct", async (data) => {

        try {

            const result = await productController.addProduct(...data)

            if (!result) {

                socket.emit("errorOnCreation", "Hubo un error al crear el producto. Asegurate de haber llenado todos los campos con datos válidos y que el producto no exista en la base de datos")

                return

            }

            const products = await productController.getProducts()

            socket.emit("getProducts", products)

        } catch (error) {

            console.error(error.message)

        }


    })

    socket.on("deleteProduct", async (data) => {

        try {

            await productController.deleteProduct(data)

            const products = await productController.getProducts()

            socket.emit("getProducts", products)

        } catch (error) {

            console.error(error.message)

        }

    })

    socket.on("addToCart", async (data) => {

        const cartId = session.user.cart

        try {

            const result = await cartController.addProductToCart(data, cartId)

            if (!result) {

                return socket.emit("unavailableProduct", data)

            }

            socket.emit("addedSuccessfully", data)

        } catch (error) {

            console.error(error.message)

        }

    })

    socket.on("deleteProductFromCart", async (data) => {

        const cartId = session.user.cart

        try {

            await cartController.deleteProductFromCart(data, cartId)

            let cart = await cartController.getAllCartProducts(cartId)

            socket.emit("getProductsFromCart", cart.products)

        } catch (error) {

            console.error(error.message)

        }

    })

})
