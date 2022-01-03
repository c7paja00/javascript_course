// Importing module

// Importoidaan vain valitut osat moduulista
// import { addToCart, totalPrice as price, tq } from './ShoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

console.log('Importing module');

// importoidaan kaiken minkä voi moduulista
// import * as ShoppinCart from './ShoppingCart.js';
// ShoppinCart.addToCart('bread', 5);
// console.log(ShoppinCart.totalPrice);

// default importin ja nimettyjen importtien tuontio
// import add, { addToCart, totalPrice as price, tq } from './ShoppingCart.js';
// console.log(price);

import add, { cart } from './ShoppingCart.js';

add('pizza', 2);
add('bread', 5);
add('apples', 2);

console.log(cart);
/*
// await blokkaa koodin etenemisen
const result = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await result.json();
console.log(data);

const getLastPost = async function () {
  const result = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await result.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean
// lastPost.then(last => console.log(last));

// hyvä käyttökohde await:lle
const lastPost2 = await getLastPost();
console.log(lastPost2);


// The module pattern ///////////////////////////////////////////////////////

const shoppinCart2 = (function () {
  const cart = [];
  const shippinCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (Shipping cost is ${shippinCost})`
    );
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppinCart2.addToCart('apple', 4);
shoppinCart2.addToCart('pizza', 2);

console.log(shoppinCart2);
//console.log(shoppinCart2.shippinCost);
*/
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],

  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

// Syöttää uuden koodin serverille(webbisivulle) ilman koko sivun uudelleenlataamista, näin ollen säästää aiemman tilan sivulla, kuten sisäänkirjautumisen
if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log('Jonas ?? null');

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polyfilling async functions
import 'regenerator-runtime/runtime';
