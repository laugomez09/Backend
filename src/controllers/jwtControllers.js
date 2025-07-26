import userModel from "../services/dao/models/user.model.js";
import { isValidPassword } from "../utils/bcrypt.js";
import { generateJWToken } from "../utils/passport.js";
import { usersService } from "../services/service.js";
import logger from "../utils/logger.js";

export const githubRegister = async (req, res) => { };

export const githubCallback = async (req, res) => {
    const user = req.user;
    const tokenUser = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role,
        id: user._id,
    };
    const access_token = generateJWToken(tokenUser);

    res.cookie("jwtCookieToken", access_token, {
        maxAge: 600000,
        httpOnly: true,
    });
    res.redirect("/products");
};

import { createHash } from "../utils/bcrypt.js";

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                status: "error",
                message: "Ya existe un usuario con ese email",
            });
        }

        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role: email === "admin@coder.com" ? "admin" : "user", // o lógica que prefieras
        };

        await userModel.create(newUser);

        logger.info(`Usuario ${email} registrado exitosamente`);
        return res.status(201).send({
            status: "success",
            message: "Usuario registrado exitosamente",
        });
    } catch (error) {
        logger.error("Error al registrar usuario: " + error.message);
        return res.status(500).send({
            status: "error",
            message: "Error interno del servidor",
        });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            logger.error("No user with provided email: " + email);
            return res.status(204).send({
                error: "Not found",
                message: "No user found with provided email: " + email,
            });
        }
        if (!isValidPassword(user, password)) {
            logger.error("Invalid credentials");
            return res.status(401).send({
                status: "error",
                error: "Invalid credentials",
            });
        }
        const date = await usersService.updateConnection(user._id, new Date());
        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role,
            id: user._id,
            last_connection: date,
        };
        const access_token = generateJWToken(tokenUser);
        res.cookie("jwtCookieToken", access_token, {
            maxAge: 600000,
            httpOnly: true,
        });
        res.redirect("/products");
    } catch (error) {
        logger.error(error);
        return res.status(500).send({ status: "error", error: "Intern app error" });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("jwtCookieToken");
    res.redirect("/login");
};