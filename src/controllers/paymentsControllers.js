export default class PaymentsController {
    constructor({ PaymentService }) {
        this.paymentService = PaymentService;
    }
    makePurchase = async (req, res, next) => {
        try {
            const { ticketId } = req.params;
            const paymentIntent = await this.paymentService.createPaymentIntent(
                ticketId
            );
            if (!paymentIntent) {
                throw new Error("Payment intent could not be created");
            }
            res.status(200).json({ status: "success", payload: paymentIntent });
        } catch (error) {
            console.error("Error en makePurchase:", error);
            res.status(500).json({
                status: "error",
                message: error.message || "Internal Server Error",
            });
        }

    };
}