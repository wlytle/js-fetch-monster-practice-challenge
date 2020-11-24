document.addEventListener("DOMContentLoaded", () => {
  const monsterDiv = document.getElementById("monster-container");
  const formDiv = document.getElementById("create-monster");
  const monstersUrl = "http://localhost:3000/monsters";

  //add form above list with name age description and 'make mosneter button
  // form should add new monster to list and db
  const formHtml = `
    <form method="post" id="form">
        <label for="name">Name: </label>
        <input type="text" name="name">
        <label for="age">Age: </label>
        <input type="text" name="age">
        <label for="description">Description: </label>
        <textarea name="description"></textarea>
        <input type="submit" value="Add Monster!">
    </form>
    `;
  formDiv.innerHTML = formHtml;
  const form = document.getElementById("form");

  //set event listeners
  const backBtn = document.getElementById("back");
  const forwardBtn = document.getElementById("forward");

  //Make fetch with get
  const getMonsters = (page) => {
    //if (page < 1 || page > Math.floor(monsters.length / 50) + 1) {
    // window.alert("Here there not be drragons!");
    //} else {
    fetch(monstersUrl + `?_limit=50&_page=${page}`)
      .then((res) => res.json())
      .then((monsters) => filterMonsters(monsters))
      .catch((error) => window.alert("Here there not be drragons!"));
    //}
  };

  //Show first 50 monsters
  const filterMonsters = (monsters) => {
    monsterDiv.innerHTML = "";

    //let total = start + 50;
    //for (let i = start; i < total; i++) {
    for (const monster of monsters) {
      renderMonster(monster);
    }
  };

  const renderMonster = ({ name, age, description, id }) => {
    const showDiv = document.createElement("div");
    const nameH3 = document.createElement("h3");
    const ageH3 = document.createElement("h3");
    const descP = document.createElement("p");

    showDiv.dataset.id = id;
    nameH3.textContent = name;
    ageH3.textContent = age;
    descP.textContent = description;

    showDiv.append(nameH3, ageH3, descP);
    monsterDiv.appendChild(showDiv);
  };

  //add button to end of list that will show the next 50 monsters
  const goforward = () => {
    const lastId = +monsterDiv.lastChild.dataset.id;
    const page = Math.floor(lastId / 50) + 2;
    getMonsters(page);
  };

  const goback = () => {
    const firstId = +monsterDiv.firstChild.dataset.id;
    const page = Math.floor(firstId / 50) - 1;
    getMonsters(page);
  };

  const addMonster = (e) => {
    e.preventDefault();
    bodyData = {
      name: e.target.name.value,
      age: e.target.age.value,
      description: e.target.description.value,
    };
    configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bodyData),
    };

    fetch(monstersUrl, configObj)
      .then((res) => res.json())
      .then((monster) => renderMonster(monster))
      .catch((er) => window.alert(error.message));
    e.target.reset();
  };

  backBtn.addEventListener("click", goback);
  forwardBtn.addEventListener("click", goforward);
  form.addEventListener("submit", addMonster);

  getMonsters(1);
});
