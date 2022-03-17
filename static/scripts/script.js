const hamburgerMenu = document.querySelector("nav button");

hamburgerMenu.addEventListener("click", toggleHamburger);

function toggleHamburger() {
  const navEl = document.querySelector("nav");
  navEl.classList.toggle("toonHamburger");
}

