import { cartService } from "../services/service.js";
import userModel from "../services/dao/models/user.model.js";
import __dirname from "../utils/path.js";
import ticketModel from "../services/dao/models/ticket.model.js";
import { sendEmailWithTicket } from "../utils/email.js";

export const getCartsController = async (req, res) => {
    try {
        let carts = await cartService.getAll();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCartController = async (req, res) => {
    try {
        let cid = req.params.cid;
        let cart = await cartService.getOne(cid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const postCartController = async (req, res) => {
    try {
        let uid = req.params.uid;
        let cart = await cartService.create(uid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const postProductInCartController = async (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let cart = await cartService.addProduct(cid, pid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const putProductsInCartController = async (req, res) => {
    try {
        let cid = req.params.cid;
        let products = req.body;
        let cart = await cartService.updateCart(cid, products);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const putProductQuantityInCartController = async (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let quantity = req.body.quantity;
        let cart = await cartService.updateProductQuantity(cid, pid, quantity);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProductFromCartController = async (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let cart = await cartService.deleteProduct(cid, pid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCartController = async (req, res) => {
    try {
        let cid = req.params.cid;
        await cartService.delete(cid);
        res.json({ message: "cart deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const purchaseController = async (req, res) => {
    try {
        let cid = req.params.cid;
        let cart = await cartService.purchase(cid);
        const user = await userModel.findById(cart.userId);
        let ticket = await ticketModel
            .findOne({ purchaser: user.email })
            .sort({ purchase_dateTime: -1 })
            .limit(1);

        if (ticket) {
            const ticketId = ticket._id.toString();
            res.json({ ticketId: ticketId });
        } else {
            res.status(404).json({ error: "No ticket found for the user" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};