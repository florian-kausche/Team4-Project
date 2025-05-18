// cart.js - Handles rendering the shopping cart contents on the cart page
// Imports utility for accessing local storage
import { getLocalStorage } from "./utils.mjs";

// Renders the cart items from local storage to the page
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart"); // Retrieve cart items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item)); // Generate HTML for each item
  document.querySelector(".product-list").innerHTML = htmlItems.join(""); // Insert into DOM
}

// Returns HTML template for a single cart item
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// Initialize cart rendering on page load
renderCartContents();
