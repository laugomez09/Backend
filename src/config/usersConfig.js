// src/config/usersConfig.js
import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import jwtStrategy from "passport-jwt";
import userModel from "../services/dao/models/user.model.js";
import { createHash } from "../utils/bcrypt.js";
import config from "./config.js"; // lee las vars de entorno
import logger from "../utils/logger.js";

const privateKey = config.privateKey;

// Local Strategy
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwtCookieToken"];
    }
    return token;
};

const initializePassport = () => {
    // JWT Strategy con cookie
    passport.use(
        "jwt",
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: privateKey,
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload.user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    // GitHub Strategy
    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: config.clientID,
                clientSecret: config.clientSecret,
                callbackUrl: config.callbackUrl,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile._json.email || profile.emails?.[0]?.value;

                    if (!email) {
                        logger.warn("GitHub user has no public email. Registration aborted.");
                        return done(null, false);
                    }

                    const user = await userModel.findOne({ email });

                    if (!user) {
                        let newUser = {
                            first_name: profile._json.name || profile.username,
                            last_name: "",
                            age: 18,
                            email,
                            password: "",
                            loggedBy: "GitHub",
                            role: "user",
                        };
                        const result = await userModel.create(newUser);
                        logger.info(`User registered with GitHub: ${email}`);
                        return done(null, result);
                    } else {
                        logger.info(`User already exists with GitHub email: ${email}`);
                        return done(null, user);
                    }
                } catch (error) {
                    logger.error("Error in GitHub strategy: " + error);
                    return done(error);
                }
            }
        )
    );

    // Local Register Strategy
    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body;
                try {
                    const user = await userModel.findOne({ email });
                    if (user) {
                        logger.info("User already exists with email: " + email);
                        return done(null, false);
                    }
                    let role = "user";
                    if (email === config.adminEmail) {
                        role = "admin";
                    }
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        loggedBy: "App",
                        role,
                    };
                    const result = await userModel.create(newUser);
                    logger.info(`User registered locally with email: ${newUser.email}`);
                    return done(null, result);
                } catch (error) {
                    return done("Error registering user: " + error);
                }
            }
        )
    );

    // Serializar usuario
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // Deserializar usuario
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            logger.error("Error deserializing user: " + error);
            done(error, null);
        }
    });
};

export default initializePassport;
