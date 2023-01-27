const categories = {
  1: "Electronics",
  2: "Books",
  3: "Clothing",
  4: "Furniture",
};

const body = document.getElementsByClassName("container-flush")[0];
let token = document.cookie.split("=")[1];
token = token.split(";")[0];


if (!token) {
  window.location.href = "http://localhost:5000/login";
}

const urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
const GET_PRODUCTS_URL = "http://localhost:5000/product/"+id;
const options = {
method: "GET",
headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
  },
};

// print detials of the product
const getProducts = async () => {
  const response = await fetch(GET_PRODUCTS_URL, options);
  const products = await response.json();
  return products;
}

const displayProduct = async () => {
  const products = await getProducts();
  body.innerHTML = `
              <h2>${products.title}</h2>
              <p>${products.description}</p>
              <p>Price: $${products.price}</p>
              <p>Stock: ${products.stock} units</p>
              <p>Category: ${categories[products.category[0]]}</p>
              <a href="admin/update-product.html?id=${products._id}" class="btn btn-primary">Update Product</a>
              <a href="products.html" class="btn btn-secondary">Back</a>`;
}

displayProduct();