// ProductData.mjs - Provides methods to fetch and find product data from JSON files

// Helper function to convert fetch response to JSON or throw error
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// ProductData class fetches product data for a given category
export default class ProductData {
  // Initialize with product category
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  // Fetch all product data for the category
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  // Find a product by its id (string or number)
  async findProductById(id) {
    const products = await this.getData();
    // Accept both string and number id
    return products.find((item) => String(item.Id) === String(id));
  }
}
