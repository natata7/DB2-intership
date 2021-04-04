const indicator = document.querySelector(".indicator");
const formInput = document.querySelector("input");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");
const pass = document.querySelector("#password");
const confirmPass = document.querySelector("#confirm-password");
const errorBlock = document.querySelector("#errorBlock");

function trigger() {
  if (formInput.value != "") {
    indicator.style.display = "block";
    indicator.style.display = "flex";
    let protect = 0;

    if (formInput.value.length < 8) {
      weak.classList.add("active");
    }

    var small = "([a-z]+)";
    if (formInput.value.match(small)) {
      protect++;
    }

    var big = "([A-Z]+)";
    if (formInput.value.match(big)) {
      protect++;
    }

    var numb = "([0-9]+)";
    if (formInput.value.match(numb)) {
      protect++;
    }

    var vv = /\W/;
    if (formInput.value.match(vv)) {
      protect++;
    }

    if (protect == 2) {
      weak.classList.add("active");
    } else {
      medium.classList.remove("active");
    }
    if (protect == 3) {
      weak.classList.add("active", "orange");
      medium.classList.add("active", "orange");
    } else {
      medium.classList.remove("active", "orange");
      weak.classList.remove("orange");
    }
    if (protect == 4) {
      weak.classList.add("active", "green");
      medium.classList.add("active", "green");
      strong.classList.add("active", "green");
    } else {
      strong.classList.remove("active", "green");
      weak.classList.remove("green");
      medium.classList.remove("green");
    }
  } else {
    indicator.style.display = "none";
  }
}

function confirm() {
  if (pass.value != confirmPass.value) {
    errorBlock.innerHTML = 'Password mismatch';
  }
}
//confirm();


const tabTriggers = document.querySelectorAll('#tabs-header__item');


tabTriggers.forEach(function(tabTrigger) {
  tabTrigger.addEventListener('click', function() {
      var id = this.getAttribute('data-tab'),
          content = document.querySelector('.tabs-content__item[data-tab="'+id+'"]'),
          activeTrigger = document.querySelector('.tabs-header__item.active'),
          activeContent = document.querySelector('.tabs-content__item.active');
      
      activeTrigger.classList.remove('active'); 
      tabTrigger.classList.add('active'); 
      
      activeContent.classList.remove('active'); 
      content.classList.add('active'); 
   });
});


var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'mapbox_access_token'
}).addTo(mymap);
var marker = L.marker([51.5, -0.09]).addTo(mymap);

let searchResultTogler = document.querySelector('.search-result__togler');
let searchResultsSort = document.querySelector('.sort');
let searchResultsTiles = document.querySelector('.search-results__tiles');
let searchResultsMap = document.querySelector('.search-results__map');

searchResultTogler.addEventListener('click', (e) => {
  e.preventDefault();
  searchResultsTiles.classList.toggle('active');
  searchResultsMap.classList.toggle('active');
  searchResultsSort.classList.toggle('active');
});
