const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));

    fetch("/api/jwt/register", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((result) => {
        if (result.status === 201) {
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
                text: "No se pudo crear el usuario.",
            });
        }
    });
});
