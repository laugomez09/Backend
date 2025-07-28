export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
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
            role: email === "admin@coder.com" ? "admin" : "user",
        };

        await userModel.create(newUser);

        logger.info(`Usuario ${email} registrado exitosamente`);
        return res.status(201).json({
            status: "success",
            message: "Usuario registrado exitosamente",
        });
    } catch (error) {
        logger.error("Error al registrar usuario: " + error.message);
        return res.status(500).json({
            status: "error",
            message: "Error interno del servidor",
        });
    }
};
