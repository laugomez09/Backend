import { Router } from "express";
import {
    getCartsController,
    getCartController,
    postCartController,
    postProductInCartController,
    putProductsInCartController,
    putProductQuantityInCartController,
    deleteCartController,
    deleteProductFromCartController,
    purchaseController,
} from "../../controllers/cartsControllers.js";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";

const CartsRouter = Router();

//Get carts
CartsRouter.get(
    "/",
    passportCall("jwt"),
    authorization("admin"),
    getCartsController
);

//Get cart
CartsRouter.get(
    "/:cid",
    passportCall("jwt"),
    authorization(["user", "admin"]),
    getCartController
);

//Post cart
CartsRouter.post(
    "/:uid",
    passportCall("jwt"),
    authorization(["user", "admin"]),
    postCartController
);

//post product in cart
CartsRouter.post(
    "/:cid/product/:pid",
    passportCall("jwt"),
    authorization(["user", "premium"]),
    postProductInCartController
);

//put products in cart
CartsRouter.put(
    "/:cid",
    passportCall("jwt"),
    authorization("admin"),
    putProductsInCartController
);

//put product quantity in  cart
CartsRouter.put(
    "/:cid/products/:pid",
    passportCall("jwt"),
    authorization(["user", "premium", "admin"]),
    putProductQuantityInCartController
);

//delete cart
CartsRouter.delete(
    "/:cid",
    passportCall("jwt"),
    authorization("admin"),
    deleteCartController
);

//delete product from cart
CartsRouter.delete(
    "/:cid/products/:pid",
    passportCall("jwt"),
    authorization(["user", "premium", "admin"]),
    deleteProductFromCartController
);

//confirm purchase
CartsRouter.post(
    "/:cid/purchase",
    passportCall("jwt"),
    authorization(["user", "premium"]),
    purchaseController
);

export { CartsRouter };