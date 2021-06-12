const API_URL = 'https://api.mercadolibre.com/sites/MLB/search';
const API_ITEMS = 'https://api.mercadolibre.com/items/';
const MSG_ERROR = 'Estamos passando por problemas. Por Favor, tente mais tarde!';
const MSG_ERROR_SEARCH = 'Desculpa! Não foi possível encontrar a sua busca!';
const MSG_INDEFINITE_SEARCH = 'Olá! O que você procura? =D';
const searchInput = document.getElementById('search');
const pressEnter = document.getElementById('search-span');
const body = document.querySelector('body');
const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');
let search = 'computador';

const totalPriceEqualZero = () => {
  total.innerHTML = 0;
};

const totalPrice = () => {
  const prices = Array.from(cart.childNodes);
  const regExp = /\d*\.?\d*$/;
  const result = prices.reduce((acc, { innerHTML }) => {
    const value = acc + parseFloat(innerHTML.match(regExp));
    return value;
  }, 0);
  total.innerHTML = result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image, price: salePrice }) {
  const price = salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const saveLocalStorage = () => {
  localStorage.setItem('cart', cart.innerHTML);
};

function cartItemClickListener(event) {
   cart.removeChild(event.target);
   saveLocalStorage();
   totalPrice();
}

const loadLocalStorage = () => {
  const cartSaved = localStorage.getItem('cart');
  if (cartSaved) {
    cart.innerHTML = cartSaved;
    cart.childNodes.forEach((li) => li.addEventListener('click', cartItemClickListener));
  }
};

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `${name}

R$${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createLoading = () => {
  const loading = createCustomElement('span', 'loading', 'loading...');
  body.appendChild(loading);
};

const removeLoading = () => {
  const loading = document.querySelector('.loading');
  if (loading) loading.remove();
};

const createProductsList = (obj) => {
  const itens = document.querySelector('.items');
  const arr = obj.results;
    arr.forEach((computer) => {
      itens.appendChild(createProductItemElement(computer));
    });
};

const fetchProductList = async (item) => {
  createLoading();
  try {
    const response = await fetch(`${API_URL}?q=${item}`);
    removeLoading();
    const obj = await response.json();
    if (!obj.results.length) throw new Error(MSG_ERROR_SEARCH);
    createProductsList(obj);
  } catch (error) {
    items.innerHTML = `<h1>${error}</h1>`;
  }
};

const fetchForId = async (id) => {
  createLoading();
  try {
    const response = await fetch(`${API_ITEMS}${id}`);
    removeLoading();
    return await response.json();
  } catch (error) {
    removeLoading();
    items.innerHTML = `<h1>${error}</h1>`;
  }
};

const addCart = () => {
  const btnAddCart = document.querySelectorAll('.item__add');
  btnAddCart.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = getSkuFromProductItem(btn.parentNode);
      fetchForId(id)
      .then((item) => cart
        .appendChild(createCartItemElement(item)))
      .then(() => saveLocalStorage())
      .then(() => totalPrice())
      .catch(() => {
        removeLoading();
        items.innerHTML = `<h1>${MSG_ERROR}</h1>`;
      });
    });
  });
};

const clearCart = () => {
  const clearBtn = document.querySelector('.empty-cart');
  clearBtn.addEventListener('click', () => {
    cart.innerHTML = '';
    totalPrice();
  });
};

const loader = () => {
  fetchProductList(search)
  .then(() => loadLocalStorage())
  .then(() => addCart())
  .then(() => totalPrice())
  .then(() => clearCart())
  .catch(() => {
    removeLoading();
    items.innerHTML = `<h1>${MSG_ERROR}</h1>`;
  });
};

const clearItems = () => {
  items.innerHTML = '';
};

const addFoundItems = (value) => {
  search = value;
};

const tipFocus = () => {
  searchInput.addEventListener('focus', () => {
    pressEnter.style.opacity = '0.7';
  });
  searchInput.addEventListener('blur', () => {
    pressEnter.style.opacity = '0';
  });
};

const eventSearchItems = () => {
  searchInput.addEventListener('search', () => {
    if (!searchInput.value) {
      pressEnter.style.opacity = '0';
      return alert(MSG_INDEFINITE_SEARCH);
    }
    clearItems();
    addFoundItems(searchInput.value);
    loader();
    searchInput.value = '';
    pressEnter.style.opacity = '0';
  });
};

const searchEngine = () => {
  tipFocus();
  eventSearchItems();
};

window.onload = function onload() {
  totalPriceEqualZero();
  loader();
  searchEngine();
};