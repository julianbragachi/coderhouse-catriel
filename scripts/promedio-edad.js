function calcularPromedio(personas) {
  const total = personas.reduce((acum, persona) => acum + persona.edad, 0);

  return total / personas.length;
}

function mostrarInformacion(personas) {
  const promedio = calcularPromedio(personas);

  console.info(` ℹ️ La edad promedio es: ${promedio}`);

  personas.forEach((persona) => {
    console.info(` 👨🏼‍🎓 ${persona.nombre}. Edad: ${persona.edad}`);
  });
}

function iniciarSimulador() {
  const personas = [];
  let continuar = true;

  do {
    const nombre = prompt(
      `Ingrese nombre para la persona ${
        personas.length + 1
      } (Para finalizar escriba ESC)`
    );

    if (nombre.toLocaleUpperCase() === "ESC") {
      continuar = false;
    } else {
      const edad = parseInt(
        prompt(`Ingrese edad para la persona ${personas.length + 1}`)
      );

      personas.push({ nombre: nombre, edad: edad });
    }
  } while (continuar);

  alert("Abri la consola para ver la informacion");

  mostrarInformacion(personas);
}

iniciarSimulador();
