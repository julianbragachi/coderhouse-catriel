let continuar = true;
let cantidad = 0;
let acumuladorEdad = 0;

do {
  const text = prompt(
    `Ingrese edad para la persona ${cantidad + 1} (Para cancelar escriba ESC)`
  );

  if (text.toLocaleUpperCase() === "ESC") {
    continuar = false;
  } else {
    const edad = parseInt(text);

    acumuladorEdad = acumuladorEdad + edad;
    cantidad = cantidad + 1;
  }
} while (continuar);

const promedio = acumuladorEdad / cantidad;

alert("La edad promedio es: " + promedio);
