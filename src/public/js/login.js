const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));

    fetch("/api/jwt/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((result) => {
        if (result.status === 200) {
            result.json();
            Swal.fire({
                icon: "success",
                title: "¡Login exitoso!",
                text: "Redirigiendo a productos...",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            setTimeout(() => {
                window.location.replace("/products");
            }, 2000);
        } else if (result.status === 401) {
            Swal.fire({
                icon: "error",
                title: "Error de login",
                text: "Credenciales incorrectas. Por favor revisá los datos.",
            });
        }
    });
});
