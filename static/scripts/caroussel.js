// const caroussel = document.querySelector('.caroussel');
const carousselUl = document.querySelector('.caroussel ul');
const carousselLi = document.querySelectorAll('.caroussel li');

const back = document.querySelector('#back');
const next = document.querySelector('#next');

// hoeveel de counter moet verschuiven geef je aan met de size
let counter = 0;
const size = carousselLi[0].clientWidth;

next.removeAttribute('disabled');
back.removeAttribute('disabled');
carousselUl.classList.remove('disabledJS')
// caroussel.style.setProperty('overflow');



next.addEventListener('click', () => {
    counter++;
    carousselUl.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

back.addEventListener('click', () => {
    counter--;
    carousselUl.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

