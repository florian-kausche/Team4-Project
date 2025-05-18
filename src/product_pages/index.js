// This script dynamically loads product details based on the product id in the URL
import ProductData from "../js/ProductData.mjs";
import { qs } from "../js/utils.mjs";

// Helper to get query parameter from URL
function getParam(param) {
  // Create a URLSearchParams object from the current window's query string
  const urlParams = new URLSearchParams(window.location.search);
  // Return the value of the specified query parameter
  return urlParams.get(param);
}

// Main function to render product details on the page
async function renderProductDetails() {
  // For this example, we assume all products are in the 'tents' category
  const category = "tents";
  // Get the product id from the URL query string
  const productId = getParam("product");
  if (!productId) {
    // If no product id is found, display an error message
    qs("#productName").textContent = "Product not found.";
    return;
  }
  // Create a new ProductData instance for the given category
  const dataSource = new ProductData(category);
  // Fetch the product details by id
  const product = await dataSource.findProductById(productId);
  if (!product) {
    // If the product is not found, display an error message
    qs("#productName").textContent = "Product not found.";
    return;
  }
  // Populate the product details in the DOM
  qs("#productName").textContent = product.Name;
  qs("#productDescription").textContent = product.Description;
  qs("#productPrice").textContent = `$${product.FinalPrice}`;
  qs("#productImage").src = product.Image;
  qs("#productImage").alt = product.Name;
}

// Call the function to render product details when the script loads
renderProductDetails();
