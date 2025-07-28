// src/server.js
import dotenv from "dotenv";
dotenv.config(); // Cargar variables de entorno primero

import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/usersConfig.js";

import { __dirname } from "./utils/path.js";
import logger from "./utils/logger.js";

import { ProductRouter } from "./routes/api/products.routes.js";
import { CartsRouter } from "./routes/api/carts.routes.js";
import UserRouter from "./routes/api/users.routes.js";
import ViewRouter from "./routes/views/view.routes.js";
import jwtRouter from "./routes/api/jwt.routes.js";

import mongoose from "mongoose";
import errorHandler from "./middlewares/errors/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

// DB connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => logger.info("Conectado a MongoDB"))
    .catch((err) => logger.error("Error al conectar a MongoDB: " + err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// Static
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine(
    "handlebars",
    handlebars.engine({
        handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Rutas
app.use("/", ViewRouter);
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartsRouter);
app.use("/api/users", UserRouter);
app.use("/api/jwt", jwtRouter);

// Manejo de errores
app.use(errorHandler);

// Listen
app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});
