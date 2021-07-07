//Location
const headerCityButton = document.querySelector('.header__city-button');

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?'

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city);
})

// Scroll lock



//Modal cart

const subHeaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
}

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
}

// Обработчик события на откртие модального окна
subHeaderCart.addEventListener('click', cartModalOpen)
// Обработчик события на зыкрытие модального окна при клике на крестик или в пустое место
cartOverlay.addEventListener('click', event => {
    const target = event.target
    if (target.classList.contains('cart__btn-close') || target.matches('.cart-overlay')){
        cartModalClose();
    }
})
// Обработчик события на закрытие модального окна при нажатие кнопки ESC
document.addEventListener('keyup', event => {
    if (event.keyCode == 27){
        cartModalClose();
    }
    console.log('Key: ', event.key);
    console.log('keyCode: ', event.keyCode);
});