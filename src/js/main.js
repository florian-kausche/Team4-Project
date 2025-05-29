// main.js - Handles dynamic rendering of product listing with discount indicator
import ProductData from "./ProductData.mjs";

// Utility function to create a discount badge
function createDiscountBadge(percent) {
  const badge = document.createElement("span");
  badge.className = "discount-badge";
  badge.textContent = `-${percent}% OFF`;
  return badge;
}

// Render product cards with discount indicator if applicable
async function renderProductList() {
  const dataSource = new ProductData("tents");
  const products = await dataSource.getData();
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.className = "product-card";
    const link = document.createElement("a");
    link.href = `product_pages/?product=${product.Id}`;

    // Product image
    const img = document.createElement("img");
    img.src = product.Image.replace("..", ".");
    img.alt = product.NameWithoutBrand;
    link.appendChild(img);

    // Brand and name
    const brand = document.createElement("h3");
    brand.className = "card__brand";
    brand.textContent = product.Brand.Name;
    link.appendChild(brand);
    const name = document.createElement("h2");
    name.className = "card__name";
    name.textContent = product.NameWithoutBrand;
    link.appendChild(name);

    // Price
    const price = document.createElement("p");
    price.className = "product-card__price";
    price.textContent = `$${product.FinalPrice.toFixed(2)}`;
    link.appendChild(price);

    // Discount badge if discounted
    if (product.FinalPrice < product.SuggestedRetailPrice) {
      const percent = Math.round(
        (100 - (product.FinalPrice / product.SuggestedRetailPrice) * 100)
      );
      link.appendChild(createDiscountBadge(percent));
    }

    li.appendChild(link);
    productList.appendChild(li);
  });
}

// Only run on the home page
if (document.querySelector(".product-list")) {
  renderProductList();
}
