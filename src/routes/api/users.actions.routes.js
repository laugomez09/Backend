import { Router } from "express";
import userModel from "../../services/dao/models/user.model.js";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";
import { cartService } from "../../services/service.js";
import logger from "../../utils/logger.js";
import { productModel } from "../../services/dao/models/product.model.js";

const router = Router();

router.post(
    "/:productId",
    passportCall("jwt"),
    authorization(["user", "premium"]),
    async (req, res) => {
        try {
            const productId = req.params.productId;
            const userId = req.user.id;

            let user = await userModel.findById(userId).populate("cart");

            if (!user) {
                throw new Error("User not found");
            }

            let product = await productModel.findById(productId);
            if (product.owner === user.email) {
                throw new Error("Not possible to add own created products");
            }

            let cart;
            if (!user.cart) {
                cart = await cartService.create(userId);
                user.cart = cart._id;
                await user.save();
            } else {
                cart = user.cart;
            }

            await cartService.addProduct(cart._id, productId);
            cart = await cartService.getOne(cart._id);
            res.render("cart", {
                title: "Cart",
                cart,
                user: req.user,
            });
        } catch (error) {
            logger.error(error.message);
            res.status(400).send(error.message);
        }
    }
);

router.delete(
    "/:cid/products/:pid",
    passportCall("jwt"),
    authorization(["user", "premium"]),
    async (req, res) => {
        try {
            const productId = req.params.pid;
            const cartId = req.params.cid;

            await cartService.deleteProduct(cartId, productId);
            let cart = await cartService.getOne(cartId);
            res.render("cart", {
                title: "Cart",
                cart,
                user: req.user,
            });
        } catch (error) {
            logger.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
);

router.put(
    "/:cid/products/:pid",
    passportCall("jwt"),
    authorization(["user", "premium"]),
    async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            await cartService.updateProductQuantity(cid, pid, quantity);
            let cart = await cartService.getOne(cid);
            res.render("cart", {
                title: "Cart",
                cart,
                user: req.user,
            });
        } catch (error) {
            logger.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
);

export default router;