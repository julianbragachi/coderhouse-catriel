function simulador() {
  const form = document.querySelector("#form");
  const inputsContainer = document.querySelector(".inputs-container");
  const btnAdd = document.querySelector("#btn-add");
  const btnDelete = document.querySelector("#btn-delete");

  btnDelete.addEventListener("click", clearStorage);
  btnAdd.addEventListener("click", addNewPerson);
  form.addEventListener("submit", handleSubmit);

  loadFromStorage();

  function addNewPerson() {
    const div = document.createElement("div");

    div.classList.add("person-container");
    div.innerHTML =
      '<div class="input-container"><label>Nombre</label><input type="text" required /></div><div class="input-container"><label>Edad</label><input type="number" required /></div>';

    inputsContainer.appendChild(div);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const personsDOM = document.querySelectorAll(".person-container");
    const personas = [];

    personsDOM.forEach((elem) => {
      const persona = {};

      persona.edad = parseInt(elem.querySelector("input[type=number]").value);
      persona.nombre = elem.querySelector("input[type=text]").value;

      personas.push(persona);
    });

    localStorage.setItem("personas", JSON.stringify(personas));

    mostrarInformacion(personas);
  }

  function calcularPromedio(personas) {
    const total = personas.reduce((acum, { edad }) => acum + edad, 0);

    return total / personas.length;
  }

  function mostrarInformacion(personas) {
    const promedio = calcularPromedio(personas);

    document.querySelector(
      "#result"
    ).innerHTML = `La edad promedio es ${promedio}`;
  }

  function clearStorage() {
    localStorage.removeItem("personas");
    location.reload();
  }

  function loadFromStorage() {
    try {
      const personasStorage = localStorage.getItem("personas");
      if (!personasStorage) return;

      const personas = JSON.parse(personasStorage);

      personas.forEach(({ edad, nombre }, index) => {
        if (index !== 0) addNewPerson();

        const personsDOM = document.querySelectorAll(".person-container");

        personsDOM[index].querySelector("input[type=number]").value = edad;
        personsDOM[index].querySelector("input[type=text]").value = nombre;
      });

      mostrarInformacion(personas);
    } catch (error) {
      console.error(
        "⛔️ Ups... hubo un problema al deserializar el localstorage.",
        error
      );
    }
  }
}

simulador();
