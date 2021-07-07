let hash = location.hash.substring(1);
const goodsTitle = document.querySelector('.goods__title');

function goodTitle(hash){
    if (hash === 'men') {
        goodsTitle.textContent = 'Мужчинам'
    } else if (hash === 'women'){
        goodsTitle.textContent = 'Женщинам'
    } else if (hash === 'kids') {
        goodsTitle.textContent = 'Детям'
    }
}

//Location
const headerCityButton = document.querySelector('.header__city-button');

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?'

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город');
    if (city!==null) {
        headerCityButton.textContent = city;
        localStorage.setItem('lomoda-location', city);
    } else {
        headerCityButton.textContent = 'Ваш город?';
    }
})

// Scroll lock

const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth
    document.body.dbScrollY = window.scrollY
    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
}

const enabledScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY,
    });
}

//Modal cart

const subHeaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
}

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enabledScroll();
}

// request json
const getData = async () => {
    const data = await fetch('db.json');
    if (data.ok) {
        return data.json();
    } else {
        throw new Error(`Failed to fetch ${data.status} ${data.statusText}`);
    }
}

const getGoods = (callback, value) => {
    goodTitle(value);
    getData()
        .then(data => {
            if (value){
                callback(data.filter(item => item.category === value));
            } else {
                callback(data);
            }
        })
        .catch(err => {
            console.error(err);
        })
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

try{
    const goodslist = document.querySelector('.goods__list');
    if (!goodslist){
        throw 'This is not goods page'
    }

    const createCart = ({ id, preview, cost, brand, name, sizes}) => {

        const li = document.createElement('li');
        li.classList.add('goods__item');
        li.innerHTML = `
        <article class="good">
            <a class="good__link-img" href="card-good.html#${id}">
                <img class="good__img" src="goods-image/${preview}" alt="">
            </a>
            <div class="good__description">
                <p class="good__price">${cost} &#8381;</p>
                <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                ${sizes ? `<p className="good__size">Размеры (RUS): <span className="good__size__grey">${sizes.join(' ')}</span></p>` : ''}
                <a class="good__link" href="card-good.html#${id}">Подробнее</a>
            </div>
        </article>`;

        return li;
    }

    const renderGoodLists = data => {
        goodslist.textContent = '';
        data.forEach(item => {
            const cart = createCart(item);
            goodslist.append(cart);
        })
    };

    window.addEventListener('hashchange',() => {
        hash = location.hash.substring(1);
        getGoods(renderGoodLists, hash);
        goodTitle(hash);
    })

    getGoods(renderGoodLists, hash);

} catch (e) {

}