function simulador() {
  const form = document.querySelector("#form");
  const inputsContainer = document.querySelector(".inputs-container");
  const btnAdd = document.querySelector("#btn-add");
  const btnDelete = document.querySelector("#btn-delete");

  btnDelete.addEventListener("click", clearStorage);
  btnAdd.addEventListener("click", addNewPerson);
  form.addEventListener("submit", handleSubmit);

  loadFromStorage();
  addNewPerson();

  function addNewPerson() {
    const div = document.createElement("div");
    const childrenCount = inputsContainer.children.length;

    div.classList.add("person-container");
    div.innerHTML = `<div class="input-container"><label>Nombre:</label><input type="text" id="name-${childrenCount}" required /></div><div class="input-container"><label>Fecha nacimiento:</label><input type="text" id="date-${childrenCount}" required /></div>`;

    inputsContainer.appendChild(div);

    datepicker(`#date-${childrenCount}`, { startDate: new Date(1994, 7, 23) });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const personsDOM = document.querySelectorAll(".person-container");
    const personas = [];

    personsDOM.forEach((elem, index) => {
      const persona = {};

      persona.nacimiento = new Date(elem.querySelector(`#date-${index}`).value);
      persona.edad = dateFns.differenceInYears(new Date(), persona.nacimiento);
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
    ).innerHTML = `La edad promedio es ${promedio}. Enviamos esta informacion por mail al administrador.`;

    sendEmail(promedio)
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

  function sendEmail(promedio) {
    const data = {
      service_id: "service_ufmld2i",
      template_id: "template_hzr6fve",
      user_id: "IbyoP2cb6sFQbth8A",
      template_params: {
        promedio,
      },
    };

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }
}

simulador();
