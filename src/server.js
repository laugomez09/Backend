// src/server.js

import dotenv from 'dotenv';
dotenv.config(); // Cargar variables de entorno primero

import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";

import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from "./config/usersConfig.js";

import { ProductRouter } from "./routes/api/products.routes.js";
import { CartsRouter } from "./routes/api/carts.routes.js";
import { viewsRouter } from "./routes/views/views.routes.js";
import ticketRouter from "./routes/api/tickets.routes.js";
import emailRouter from "./routes/api/email.routes.js";
import usersRouter from "./routes/api/users.routes.js";
import jwtRouter from "./routes/api/jwt.routes.js";
import actionsRouter from "./routes/api/users.actions.routes.js";
import loggerRouter from "./routes/api/logger.routes.js";
import fakeUserRouter from "./routes/api/fakeUser.routes.js";
import paymentsRouter from "./routes/api/payments.routes.js";

import { Server } from "socket.io";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import basePath from "./utils/path.js";
import { messagesService } from "./services/service.js";
import swaggerUiExpress from "swagger-ui-express";
import SwaggerSpecs from "../swaggerSpecs.js";

import config from "./config/config.js";
import MongoSingleton from "./config/mongodb_Singleton.js";
import cors from "cors";
import compression from "express-compression";
import { addLogger } from "./utils/logger.js";
import logger from "./utils/logger.js";

import path from "path";
import { fileURLToPath } from "url";

// Configurar __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = config.port;

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("CoderS3cr3tC0d3"));
app.use(passport.initialize());
app.use(cors());
app.use(
    compression({
        brotli: {
            enabled: true,
            zlib: {},
        },
    })
);
app.use(addLogger);

// Servir archivos estáticos (solo UNA vez)
app.use(express.static(path.join(__dirname, "public")));

// Configuración Handlebars
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        helpers: {
            ifRoleEquals: function (role, targetRole, options) {
                return role === targetRole ? options.fn(this) : options.inverse(this);
            },
        },
    })
);
app.set("view engine", "hbs");
app.set("views", `${basePath}/views`);

// Swagger
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(SwaggerSpecs));

// Inicializar Passport después de dotenv.config()
initializePassport();

// Rutas API
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartsRouter);
app.use("/api/users", usersRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/actions", actionsRouter);
app.use("/api/email", emailRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/loggerTest", loggerRouter);
app.use("/api/fakeUser", fakeUserRouter);
app.use("/api/payments", paymentsRouter);

// Rutas vistas
app.use("/", viewsRouter);

// Conectar a MongoDB e iniciar servidor
const startServer = async () => {
    try {
        await MongoSingleton.getInstance();

        const httpServer = app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });

        // Socket.io
        const io = new Server(httpServer);

        io.on("connection", (socket) => {
            logger.info("New client connected: " + socket.id);

            socket.on("message", async (data) => {
                logger.info(data);
                await messagesService.create(data);
            });

            socket.on("disconnect", () => {
                logger.info("Client disconnected: " + socket.id);
            });
        });
    } catch (error) {
        logger.error("Error starting server:", error);
    }
};

startServer();
