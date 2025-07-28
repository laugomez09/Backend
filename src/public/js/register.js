const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));

    try {
        const response = await fetch("/api/jwt/register", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (response.status === 201) {
            Swal.fire({
                icon: "success",
                title: "¡Registro exitoso!",
                text: "Ahora podés iniciar sesión.",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            setTimeout(() => {
                window.location.replace("/login");
            }, 2000);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: result.message || "No se pudo crear el usuario.",
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error de red",
            text: "Ocurrió un problema con el servidor.",
        });
    }
});
