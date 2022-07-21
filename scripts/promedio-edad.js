const form = document.querySelector("#form");
const inputsContainer = document.querySelector(".inputs-container");
const btnAdd = document.querySelector("#btn-add");

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

  personsDOM.forEach((x) => {
    const persona = {};

    persona.edad = parseInt(x.querySelector("input[type=number]").value);
    persona.nombre = x.querySelector("input[type=text]").value;

    personas.push(persona);
  });

  mostrarInformacion(personas);
}

function calcularPromedio(personas) {
  const total = personas.reduce((acum, persona) => acum + persona.edad, 0);

  return total / personas.length;
}

function mostrarInformacion(personas) {
  const promedio = calcularPromedio(personas);

  document.querySelector("#result").innerHTML = `La edad promedio es ${promedio}`;
}

btnAdd.addEventListener("click", addNewPerson);
form.addEventListener("submit", handleSubmit);
