// cart.js - Handles rendering the shopping cart contents on the cart page
// Imports utility for accessing local storage
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

// Renders the cart items from local storage to the page
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart"); // Retrieve cart items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item)); // Generate HTML for each item
  document.querySelector(".product-list").innerHTML = htmlItems.join(""); // Insert into DOM
}

// Returns HTML template for a single cart item
function cartItemTemplate(item) {
  // Calculate discount if applicable
  let discountHTML = "";
  if (item.FinalPrice < item.SuggestedRetailPrice) {
    const percent = Math.round(100 - (item.FinalPrice / item.SuggestedRetailPrice) * 100);
    discountHTML = `<span class="discount-badge">${percent}% OFF</span>`;
  }
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
  <p class="cart-card__price">$${item.FinalPrice} ${discountHTML}</p>
</li>`;

  return newItem;
}

// Initialize cart rendering on page load
loadHeaderFooter();
renderCartContents();
