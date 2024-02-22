const fecha = new Date();
const dia = fecha.getDate().toString().padStart(2, "0");
const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
const año = fecha.getFullYear();

const fechaFormatoDDMMYYYY = `${dia}/${mes}/${año}`;

console.log(fechaFormatoDDMMYYYY); // Salida: 16/02/2024¨

const file = require("fs")

const path = "mi_path";

file.writeFile(`${path}/fecha.txt`, fechaFormatoDDMMYYYY, (err => {
    if (err) console.error("No se ha podido crear el archivo")

    file.readFile(path, "agregar", "utf-8", (error, respuesta) => {
        if (error) {
            console.error("No se puede leer archivo")
            return
        } else {
            console.log(respuesta)
        }
    })
}))
/*
const fecha = new Date();
const dia = fecha.getDate().toString().padStart(2, "0");
const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
const año = fecha.getFullYear();

const fechaFormatoDDMMYYYY = `${dia}/${mes}/${año}`;

console.log(fechaFormatoDDMMYYYY); // Salida: 16/02/2024

const path = "mi_path";

const file = require("fs")

file.writeFile(`${path}/fecha.txt`, fechaFormatoDDMMYYYY, (err) => {
    if (err) {
        console.error(err)
        return
    }
    file.readFile(`${path}/fecha.txt`, "utf-8", (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)
    })
})*/
