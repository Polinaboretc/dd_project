const BASE_URL = "https://www.dnd5eapi.co/api/races";


let tempArray = [];


//// FUNCTION CHE CONTROLLA LO SCROLL(IN PX) DELLA PAGINA E CAMBIA LO STYLE DEL BUTTON 
const topScroll = document.getElementById("top-btn");
const scrollWindow = document.getElementById("card-container");

scrollWindow.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (scrollWindow.scrollTop > 16) {
    topScroll.style.display = "block";
  } else {
    topScroll.style.display = "none";
  }
}

//// FUNCTION CHE RIPORTA LO SCROLL A 0 (INIZIO PAGINA)
topScroll.onclick = () => scrollBackTop();
function scrollBackTop() {
  scrollWindow.scrollTop = 0;
}




//// FUNCTION CHE CERCA IL TERMINE INSERITO E RIMANDA ALLA PAGINA
function search() {
  const input = document.getElementById('search-input');
  console.log('parola cercata', input.value)
  const searchWords = input.value.trim();
  const term = searchWords.replaceAll(' ', '-');
  const allTerm = [];
  for (const element of tempArray) {
    allTerm.push(element.index)
  }
  if (allTerm.includes(term)) {
    goToPage(term);
  } else {
    input.value = '';
  }
}

//// FUNCTION CHE REINDERIZZA ALLA PAGINA DELLA CARD SELEZIONATA
function goToPage(id) {
  let urlString = "./race.html";
  console.log(id);
  if (id) {
    urlString = urlString + "?id=" + id;
  }
  window.location.href = urlString;
}

//// FUNCTION CHE PRENDE I DATI IN ENTRATA E LI VISUALIZZA SULLO SCHERMO
function objToArray(obj) {
  tempArray = Object.values(obj)[1];
  displayMenu(tempArray);
}

//// FUNCTION CHE CREA IL TEMPLATE HTML, DOVE ANDRANNO INSERITI I DATI
function displayMenu(array) {
  const container = document.getElementById("card-container");

  for (const page of array) {
    const div = document.createElement("div");
    div.onclick = () => goToPage(page.index);

    div.classList.add("card");

    const img = document.createElement("img");
    img.src = "./assets/" + page.index + ".png";

    div.appendChild(img);

    const name = document.createElement("p");
    const node = document.createTextNode(page.name.replace('-', ' '));

    name.appendChild(node);
    div.appendChild(name);

    container.appendChild(div);
  }
}

//// FUNCTION CHE RICHIEDE I DATI DA UN DATABASE ESTERNO
function requestData() {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((result) => objToArray(result));
}

requestData();
