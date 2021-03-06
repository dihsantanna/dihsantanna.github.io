const API_URL = 'https://api.mercadolibre.com/sites/MLB/search';
const API_ITEMS = 'https://api.mercadolibre.com/items/';
const MSG_ERROR = 'Estamos passando por problemas. Por Favor, tente mais tarde!';
const MSG_ERROR_SEARCH = 'Desculpa! Não foi possível encontrar a sua busca!';
const MSG_INDEFINITE_SEARCH = 'Olá! O que você procura? =D';
const btnCartMobile = document.querySelector('.icon-cart');
const cartContainer = document.querySelector('.cart');
const searchInput = document.getElementById('search');
const pressEnter = document.getElementById('search-span');
const body = document.querySelector('body');
const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');

const totalPrice = () => {
  total.innerHTML = 0;
  const prices = Array.from(cart.childNodes);
  const regExp = /\d*\.?\d*\.?\d*\,?\d*$/;
  const result = prices.reduce((acc, { innerText }) => {
    const editValue = innerText.match(regExp)[0]
      .replaceAll('.', '')
      .replace(',', '.');
    const value = acc + parseFloat(editValue);
    return value;
  }, 0);
  total.innerHTML = result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const counterItensCart = () => {
  const counterItens = document.querySelector('.ico-cart-container b');
  const arrItems = document.querySelectorAll('.cart__item');
  const cartLength = Array.from(arrItems).length;
  counterItens.innerHTML = `${cartLength}`;
}

function cartButtonMobileConfig() {
  cartContainer.classList.toggle('cart-none');
  cartContainer.style.height = '80vh';
  btnCartMobile.classList.toggle('bi-cart4');
  btnCartMobile.classList.toggle('bi-x-lg');
}

const createEventCartMobile = () => btnCartMobile.addEventListener('click', cartButtonMobileConfig);

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
  const newImage = image.replace('I.jpg', 'O.jpg');
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  const imgContainer = section.appendChild(createCustomElement('span', 'image_container', ''));
  imgContainer.appendChild(createProductImageElement(newImage));
  section.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const localStorageEngine = {
  saveLocalStorage: () => {
    localStorage.setItem('cart', cart.innerHTML);
  },

  loadLocalStorage: () => {
    const cartSaved = localStorage.getItem('cart');
    if (cartSaved) {
      cart.innerHTML = cartSaved;
      counterItensCart();
    }
  }
}

const { saveLocalStorage, loadLocalStorage } = localStorageEngine;

function cartItemClickListener(event) {
  const element = event.target;
  const element2 = element.parentNode;

  if (element2.classList.contains('cart__item')) {
    cart.removeChild(element2);
  } else {
    cart.removeChild(element);
  }

  saveLocalStorage();
  totalPrice();
  counterItensCart();
}

function createCartItemElement({ title: name, price: salePrice, thumbnail: imageSource }) {
  const priceBRL = salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.appendChild(createProductImageElement(imageSource))
  li.innerHTML += `<br>
  ${name}<br>
  <br>${priceBRL}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const loadingImplementation = {
  createLoading: () => {
    const loading = createCustomElement('span', 'loading', 'loading...');
    body.appendChild(loading);
  },

  removeLoading: () => {
    const loading = document.querySelector('.loading');
    if (loading) loading.remove();
  }
}

const { createLoading, removeLoading } = loadingImplementation;

const createProductsList = (obj) => {
  const itens = document.querySelector('.items');
  const arr = obj.results;
  arr.forEach((computer) => {
    itens.appendChild(createProductItemElement(computer));
  });
};

const fetchImplementation = {
  fetchProductList: async (item) => {
    createLoading();
    try {
      const response = await fetch(`${API_URL}?q=${item}`);
      removeLoading();
      const obj = await response.json();
      if (!obj.results.length) throw new Error(MSG_ERROR_SEARCH);
      createProductsList(obj);
    } catch (error) {
      alert(error);
    }
  },

  fetchForId: async (id) => {
    createLoading();
    try {
      const response = await fetch(`${API_ITEMS}${id}`);
      removeLoading();
      return await response.json();
    } catch (error) {
      removeLoading();
      alert(error);
    }
  }
}

const { fetchProductList, fetchForId } = fetchImplementation;

const eventAddCart = () => {
  const btnAddCart = document.querySelectorAll('.item__add');
  btnAddCart.forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        const id = await getSkuFromProductItem(btn.parentNode);
        const item = await fetchForId(id);
        cart.appendChild(createCartItemElement(item));
        saveLocalStorage();
        totalPrice();
        counterItensCart();
      } catch(error) {
        removeLoading();
        alert(MSG_ERROR);
      };
    });
  });
};

const clearCart = () => {
  const clearBtn = document.querySelector('.empty-cart');
  clearBtn.addEventListener('click', () => {
    cart.innerHTML = '';
    totalPrice();
    counterItensCart();
    saveLocalStorage();
  });
};

let search = 'computador';

const addFoundItems = (value) => {
  search = value;
};

const loader = async () => {
  try {
    await fetchProductList(search);
    loadLocalStorage();
    cart.childNodes
      .forEach((li) => li.addEventListener('click', cartItemClickListener));
    eventAddCart();
    totalPrice();
    clearCart();
  } catch(error) {
    removeLoading();
    alert(MSG_ERROR);
  };
};

const clearItems = () => {
  items.innerHTML = '';
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
  loader();
  searchEngine();
  createEventCartMobile();
  counterItensCart();
};
