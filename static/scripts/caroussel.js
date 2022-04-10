// grootste gedeelte van Tessa (https://github.com/TessaFlorance/Blok-tech), toestemming gehad om te gebruiken. Snap het zelf en heb wat aangepast.
const carousselUl = document.querySelector('.caroussel ul');
const carousselLi = document.querySelectorAll('.caroussel li');

const back = document.querySelector('#back');
const next = document.querySelector('#next');

// hoeveel de counter moet verschuiven geef je aan met de size
let counter = 0;
const size = carousselLi[0].clientWidth;

// attribute 'disabled' weghalen als JS aanstaat, classList zorgt voor beter scrollen als JS uitstaat
next.removeAttribute('disabled');
back.removeAttribute('disabled');
carousselUl.classList.remove('disabledJS')


// next button
next.addEventListener('click', () => {
    counter++;
    carousselUl.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

// previous button
back.addEventListener('click', () => {
    counter--;
    carousselUl.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

