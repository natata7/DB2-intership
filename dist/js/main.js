const indicator = document.querySelector(".indicator");
const input = document.querySelector("input");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");
const pass = document.querySelector("#password");
const confirmPass = document.querySelector("#confirm-password");
const errorBlock = document.querySelector("#errorBlock");

function trigger() {
  if (input.value != "") {
    indicator.style.display = "block";
    indicator.style.display = "flex";
    let protect = 0;

    if (input.value.length < 8) {
      weak.classList.add("active");
    }

    var small = "([a-z]+)";
    if (input.value.match(small)) {
      protect++;
    }

    var big = "([A-Z]+)";
    if (input.value.match(big)) {
      protect++;
    }

    var numb = "([0-9]+)";
    if (input.value.match(numb)) {
      protect++;
    }

    var vv = /\W/;
    if (input.value.match(vv)) {
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
confirm-password
