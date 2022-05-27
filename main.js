
const BASE_URL = 'https://www.dnd5eapi.co/api';

let array = [];

const obj = {};


function goToPage(id) {
  let urlString = "/prova.html"
  const index = Object.keys(obj).some(key => key === id);
  if(id){
    urlString = urlString + '?id=' + index;
  }
  window.location.href = urlString;
}

function initPage(element) {
  const temp = Object(element)
    console.log(temp)
}


function loadPg() {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(result => initPage(result))
    //.catch(error => stopLoading())
  }

  loadPg()