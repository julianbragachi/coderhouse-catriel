let continuar = true;
let acumulador = "";

do {
  let textoIngresado = prompt("Ingresar un texto.");

  if (textoIngresado === "esc" || textoIngresado === "ESC") {
    continuar = false;
  } else {
    acumulador += textoIngresado;
  }
  
  console.log("El resultado acumulado es: " + acumulador);

} while (continuar);
