const charactersAPI = new APIHandler("http://localhost:8000");

const deleteBtn = document.querySelector("#delete-one");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", async function (event) {
      try {
        document.querySelector(".characters-container").remove();
        const container = document.querySelector(".container");
        const operations = document.querySelector(".operations");
        const charactersContainer = document.createElement("div");
        charactersContainer.setAttribute("class", "characters-container");
        container.insertBefore(charactersContainer, operations);
        const { data: allCharacters } = await charactersAPI.getFullList();
        allCharacters.map((character) => {
          charactersContainer.innerHTML += `
                      <ul id="${character.id}" class="character-info">
                      <li>id: <span>${character.id}</span></li>
                        <li class="name">name: <span>${character.name}</span></li>
                        <li class="occupation">occupation: <span>${character.occupation}</span></li>
                        <li class="cartoon">Is a Cartoon? <span>${character.cartoon}</span></li>
                        <li class="weapon">weapon: <span>${character.weapon}</span></li>
                      </ul>
                  `;
        });
      } catch (err) {
        console.log(err);
      }
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", async function (event) {
      try {
        document.querySelector(".characters-container").remove();
        const container = document.querySelector(".container");
        const operations = document.querySelector(".operations");
        const charactersContainer = document.createElement("div");
        charactersContainer.setAttribute("class", "characters-container");
        container.insertBefore(charactersContainer, operations);
        const inputId = document.querySelector(
          'input[name="character-id"]'
        ).value;
        const { data: oneCharacter } = await charactersAPI.getOneCharacter(
          inputId
        );
        charactersContainer.innerHTML = `
                      <ul id="${oneCharacter.id}" class="character-info">
                      <li>id: <span>${oneCharacter.id}</span></li>
                        <li class="name">name: <span>${oneCharacter.name}</span></li>
                        <li class="occupation">occupation: <span>${oneCharacter.occupation}</span></li>
                        <li class="cartoon">Is a Cartoon? <span>${oneCharacter.cartoon}</span></li>
                        <li class="weapon">weapon: <span>${oneCharacter.weapon}</span></li>
                      </ul>
                  `;
      } catch (error) {
        console.log(err);
      }
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
      try {
        const inputDeleteId = document.querySelector(
          'input[name="character-id-delete"]'
        ).value;
        await charactersAPI.deleteOneCharacter(inputDeleteId);
        deleteBtn.style.backgroundColor = "green";
      } catch (error) {
        deleteBtn.style.backgroundColor = "red";
        console.log(err);
      }
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const updateBtn = document.querySelector("#update-data");
      try {
        const id = document.querySelector('input[name="chr-id"]').value;
        const name = document.querySelector('input[name="update-name"]').value;
        const occupation = document.querySelector(
          'input[name="update-occupation"]'
        ).value;
        const weapon = document.querySelector(
          'input[name="update-weapon"]'
        ).value;
        const cartoon = document.querySelector(
          'input[name="update-cartoon"]'
        ).checked;
        const { data: editCharacter } = await charactersAPI.updateOneCharacter(
          id,
          { name, occupation, weapon, cartoon }
        );
        updateBtn.classList.add("active");
      } catch (err) {
        updateBtn.classList.add("error");
        console.error(err);
      }
    });
  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const sendBtn = document.querySelector("#send-data");
      try {
        const name = document.querySelector('input[name="name"]').value;
        const occupation = document.querySelector(
          'input[name="occupation"]'
        ).value;
        const weapon = document.querySelector('input[name="weapon"]').value;
        const cartoon = document.querySelector('input[name="cartoon"]').checked;
        const { data: newCharacter } = await charactersAPI.createOneCharacter({
          name,
          occupation,
          weapon,
          cartoon,
        });
        sendBtn.classList.add("active");
      } catch (err) {
        sendBtn.classList.add("error");
        console.error(err);
      }
    });
});
