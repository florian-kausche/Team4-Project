// main.js - Handles dynamic rendering of product listing with discount indicator
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Only run on the home page
if (document.querySelector(".product-list")) {
  loadHeaderFooter();
  const dataSource = new ProductData("tents");
  const listElement = document.querySelector(".product-list");
  const tentList = new ProductList("tents", dataSource, listElement);
  tentList.init();
}
