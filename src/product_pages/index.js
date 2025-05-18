// This script dynamically loads product details based on the product id in the URL
import ProductData from "../js/ProductData.mjs";
import { qs } from "../js/utils.mjs";

// Helper to get query parameter from URL
function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function renderProductDetails() {
  // For this example, we assume all products are in the 'tents' category
  const category = "tents";
  const productId = getParam("product");
  if (!productId) {
    qs("#productName").textContent = "Product not found.";
    return;
  }
  const dataSource = new ProductData(category);
  const product = await dataSource.findProductById(productId);
  if (!product) {
    qs("#productName").textContent = "Product not found.";
    return;
  }
  qs("#productName").textContent = product.Name;
  qs("#productDescription").textContent = product.Description;
  qs("#productPrice").textContent = `$${product.FinalPrice}`;
  qs("#productImage").src = product.Image;
  qs("#productImage").alt = product.Name;
}

renderProductDetails();
