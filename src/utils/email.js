import nodemailer from "nodemailer";
import config from "../config/config.js";
import __dirname from "../utils/path.js";
import logger from "../utils/logger.js";
import { productModel } from "../services/dao/models/product.model.js";

// Configurar transporte de Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword,
    },
});

// Verificar conexión
transporter.verify((error, success) => {
    if (error) {
        logger.info(error);
    } else {
        logger.info("Server is ready to take our messages");
    }
});

// 💡 Función para generar plantilla de email HTML
function generateEmailHTML(title, contentHTML) {
    return `
    <div style="max-width: 600px; margin: auto; padding: 30px; background-color: #ffffff; border-radius: 12px; 
                box-shadow: 0 0 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://cdn-icons-png.flaticon.com/512/891/891462.png" alt="Ecommerce Logo" 
                 style="width: 60px; height: auto; margin-bottom: 10px;" />
            <h1 style="color: #20c997; font-size: 24px;">${title}</h1>
        </div>
        <div style="font-size: 16px; color: #333;">
            ${contentHTML}
        </div>
        <div style="margin-top: 30px; text-align: center; font-size: 14px; color: #666;">
            <p>Gracias por confiar en nuestro ecommerce 💚</p>
        </div>
    </div>
    `;
}

// 🛒 Enviar email con ticket de compra
export const sendEmailWithTicket = async (email, ticket) => {
    try {
        const productsDetails = await Promise.all(
            ticket.products.map(async (product) => {
                const productInfo = await productModel.findById(product.productId);
                return {
                    title: productInfo.title,
                    thumbnail: productInfo.thumbnails[0],
                    quantity: product.quantity,
                };
            })
        );

        const productCards = productsDetails.map((product) => `
            <div style="border: 1px solid #ddd; padding: 15px; margin-top: 15px; border-radius: 8px;">
                <h3 style="margin-bottom: 10px;">${product.title}</h3>
                <img src="${product.thumbnail}" alt="${product.title}" style="width: 100px; height: auto; border-radius: 6px;" />
                <p style="margin-top: 10px;">Cantidad: ${product.quantity}</p>
            </div>
        `).join("");

        const htmlContent = generateEmailHTML("Confirmación de Compra", `
            <p>🧾 <strong>ID de la Orden:</strong> ${ticket._id}</p>
            <p><strong>Total:</strong> $${ticket.amount}</p>
            <h2 style="margin-top: 30px; font-size: 18px;">Productos Comprados:</h2>
            ${productCards}
        `);

        await transporter.sendMail({
            from: "Ecommerce - " + config.gmailAccount,
            to: email,
            subject: "Order Confirmation",
            html: htmlContent
        });

        logger.info("Order confirmation email sent to: " + email);
    } catch (error) {
        logger.warning("Error sending email:", error);
        throw new Error("Error sending email: " + error.message);
    }
};

// 🔑 Enviar email para resetear contraseña
export const sendResetPasswordEmail = async (email, token) => {
    try {
        const htmlContent = generateEmailHTML("Reset Your Password", `
            <p>Haz clic en el botón para restablecer tu contraseña:</p>
            <a href="https://becoderhousefinalproject-production.up.railway.app/updatepassword?token=${token}"
               style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #20c997; 
                      color: #fff; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Resetear Contraseña
            </a>
            <p style="margin-top: 20px; font-size: 14px;">Este enlace es válido por 1 hora y no permite reutilizar contraseñas anteriores.</p>
        `);

        await transporter.sendMail({
            from: "Reset Password - " + config.gmailAccount,
            to: email,
            subject: "Reset your password",
            html: htmlContent
        });

        logger.info("Reset password email sent to: " + email);
    } catch (error) {
        logger.warning("Error sending email:", error);
        throw new Error("Error sending email: " + error.message);
    }
};

// 🗑️ Enviar email por producto eliminado
export const sendDeleteProductEmail = async (email, product) => {
    try {
        const htmlContent = generateEmailHTML("Producto Eliminado", `
            <p>El siguiente producto fue eliminado:</p>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Título:</strong> ${product.title}</li>
                <li><strong>Descripción:</strong> ${product.description}</li>
                <li><strong>Código:</strong> ${product.code}</li>
                <li><strong>Precio:</strong> $${product.price}</li>
                <li><strong>Categoría:</strong> ${product.category}</li>
            </ul>
            <p style="margin-top: 20px;">Si tienes dudas, no dudes en contactarnos.</p>
        `);

        await transporter.sendMail({
            from: "Ecommerce - " + config.gmailAccount,
            to: email,
            subject: "Product Deleted",
            html: htmlContent
        });

        logger.info("Delete product email sent to: " + email);
    } catch (error) {
        logger.warning("Error sending email:", error);
        throw new Error("Error sending email: " + error.message);
    }
};

// 👤 Enviar email por eliminación de usuario inactivo
export const sendDeleteInactiveUserEmail = async (email) => {
    try {
        const htmlContent = generateEmailHTML("Cuenta Eliminada por Inactividad", `
            <p>Tu cuenta ha sido eliminada por inactividad prolongada.</p>
            <p>Si deseas seguir utilizando nuestra plataforma, por favor regístrate nuevamente.</p>
            <p>Para cualquier consulta, estamos a disposición.</p>
        `);

        await transporter.sendMail({
            from: "Ecommerce - " + config.gmailAccount,
            to: email,
            subject: "Account Deletion Due to Inactivity",
            html: htmlContent
        });

        logger.info("Inactive user deletion email sent to: " + email);
    } catch (error) {
        logger.warning("Error sending email:", error);
        throw new Error("Error sending email: " + error.message);
    }
};
