document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".btn-delete-product");
    const confirmQuantityButtons = document.querySelectorAll(
        ".btn-confirm-quantity"
    );
    const confirmCartBtn = document.getElementById("confirmCartBtn");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", async function (event) {
            const cartId = button.dataset.cartId;
            const productId = button.dataset.productId;

            try {
                const response = await fetch(
                    `/api/actions/${cartId}/products/${productId}`,
                    {
                        method: "DELETE",
                    }
                );

                if (response.ok) {
                    button.closest(".card").remove();
                } else {
                    console.error("Failed to delete product from cart");
                }
            } catch (error) {
                console.error("Error deleting product from cart:", error);
            }
        });
    });

    confirmQuantityButtons.forEach((button) => {
        button.addEventListener("click", async function (event) {
            const cartId = button.dataset.cartId;
            const productId = button.dataset.productId;

            const quantityInput = document.querySelector(
                `.product-quantity[data-product-id="${productId}"]`
            );
            const quantity = quantityInput.value;

            try {
                const response = await fetch(
                    `/api/actions/${cartId}/products/${productId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ quantity: quantity }),
                    }
                );

                if (response.ok) {
                    console.log("Product quantity updated successfully");
                } else {
                    console.error("Failed to update product quantity");
                }
            } catch (error) {
                console.error("Error updating product quantity:", error);
            }
        });
    });

    confirmCartBtn.addEventListener("click", async function (event) {
        const cartId = confirmCartBtn.dataset.cartId;
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`/api/carts/${cartId}/purchase`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json"
                }
            });


            if (response.ok) {
                const responseData = await response.json();
                const ticketId = responseData.ticketId;
                console.log("Proceding to cart payment");
                window.location.replace(`/cardPayment/${ticketId}`);
            } else {
                console.error("Failed to process purchase");
            }
        } catch (error) {
            console.error("Error processing purchase:", error);
        }
    });
});