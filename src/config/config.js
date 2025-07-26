import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program
    .option("-d", "Debug variable", false)
    .option("-p <port>", "Server Port", 9090)
    .option("--mode <mode>", "Work mode", "dev");
program.parse();

const enviroment = program.opts().mode;

dotenv.config(); // Carga archivo .env desde la raíz del proyecto

const PORT = process.env.PORT || 9090;

export default {
    port: PORT,
    mongoUrl: process.env.MONGO_URL,
    enviroment,
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: process.env.GITHUB_CALLBACK_URL,
    privateKey: process.env.PRIVATE_KEY,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
    resetPasswordKey: process.env.RESET_PASSWORD_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASS,
    stripePK: process.env.STRIPE_PK,
    stripeSK: process.env.STRIPE_SK,
};
