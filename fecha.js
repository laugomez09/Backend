
const fecha = new Date();
const dia = fecha.getDate().toString().padStart(2, "0");
const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
const año = fecha.getFullYear();

const fechaFormatoDDMMYYYY = `${dia}/${mes}/${año}`;

console.log(fechaFormatoDDMMYYYY); // Salida: 16/02/2024¨

const fs = require("fs")

let filePath = "./Hora_Dia_Mes_Ano"

let archivo = fs.writeFile(filePath, fechaFormatoDDMMYYYY (error => {
    if (error) console.error("No se ha podido crear.")
},
fs.readFile(filePath,"utf8", (error, respuesta)=>{
    if (error){
        console.error("No se puede leer archivo")
        return
    }else{
        console.log(respuesta)
    }
})
))
