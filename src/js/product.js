// product.js - Handles adding products to the cart from the product page
import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Create a data source for tent products
const dataSource = new ProductData("tents");

// Adds a product to the cart in local storage
function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// Event handler for Add to Cart button
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Attach event listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
