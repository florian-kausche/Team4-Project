// cart.js - Handles rendering the shopping cart contents on the cart page
// Imports utility for accessing local storage
import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./headerFooter.js";

// Renders the cart items from local storage to the page
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // Retrieve cart items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item)); // Generate HTML for each item
  const list = document.querySelector(".product-list");
  if (list) list.innerHTML = htmlItems.join(""); // Insert into DOM
  addRemoveListeners();
}

// Returns HTML template for a single cart item
function cartItemTemplate(item) {
  let discountHTML = "";
  let price = item.FinalPrice;
  if (item.FinalPrice < item.SuggestedRetailPrice) {
    const percent = Math.round(100 - (item.FinalPrice / item.SuggestedRetailPrice) * 100);
    discountHTML = `<span class="discount-badge">${percent}% OFF</span>`;
  }
  const qty = item.quantity || 1;
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
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
  <p class="cart-card__quantity">qty: ${qty}</p>
  <p class="cart-card__price">$${(price).toFixed(2)} ${discountHTML}</p>
  <button class="remove-from-cart" style="background:#e53935;color:#fff;border:none;padding:0.4em 1em;border-radius:5px;cursor:pointer;margin-top:0.5em;">Remove</button>
</li>`;

  return newItem;
}

function addRemoveListeners() {
  document.querySelectorAll(".remove-from-cart").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      const li = btn.closest(".cart-card");
      const id = li.getAttribute("data-id");
      let cartItems = getLocalStorage("so-cart") || [];
      cartItems = cartItems.filter(item => String(item.Id) !== String(id));
      setLocalStorage("so-cart", cartItems);
      li.remove();
      updateCartCount();
    });
  });
}

// Initialize cart rendering on page load
loadHeaderFooter();
updateCartCount();
renderCartContents();
