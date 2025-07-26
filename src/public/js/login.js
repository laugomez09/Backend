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
        credentials: "include", // Esto permite guardar la cookie del JWT
    }).then((result) => {
        if (result.status === 200) {
            alert("Success login");
            window.location.replace("/products"); // Redirigimos
        } else if (result.status === 401) {
            alert("Login error, check credentials");
        }
    });
});
