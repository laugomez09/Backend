import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword,
    },
});

const mailOptions = {
    from: `"Ecommerce Test" <${config.gmailAccount}>`,
    to: "tu_otro_mail@gmail.com", // ⚠️ Cambialo por un correo tuyo
    subject: "Test de envío de correo desde backend",
    html: "<h1>Funciona!</h1>",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log("❌ ERROR:", error);
    console.log("✅ Email enviado:", info.response);
});
