const productURL = "https://striveschool-api.herokuapp.com/api/product/";
const allTheParameters = new URLSearchParams(location.search);
const productID = allTheParameters.get("id");

if (productID) {
  fetch(productURL + "/" + productID, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTk5YjczOWY4NzAwMTU3YWIwOGQiLCJpYXQiOjE3NzY0MTMwODMsImV4cCI6MTc3NzYyMjY4M30.7EscX5UwqW8GsCyztZ2BkfjREjggPTDBnflaaczYOI8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dettagli prodotto");
      }
    })
    .then((details) => {
      const nameInput = document.getElementById("name");
      const descriptionInput = document.getElementById("description");
      const brandInput = document.getElementById("brand");
      const imageUrlInput = document.getElementById("imageUrl");
      const priceInput = document.getElementById("price");
      nameInput.value = details.name;
      descriptionInput.value = details.description;
      brandInput.value = details.brand;
      imageUrlInput.value = details.imageUrl;
      priceInput.value = details.price;
    })
    .catch((err) => {
      console.log("ERRORE NEL RIPOPOLAMENTO DEL FORM", err);
    });
}

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const form = document.getElementById("product-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");
  const name = nameInput.value;
  const description = descriptionInput.value;
  const brand = brandInput.value;
  const imageUrl = imageUrlInput.value;
  const price = priceInput.value;
  console.log(name, description, brand, imageUrl, price);
  const nuovoProdotto = new Product(name, description, brand, imageUrl, price);
  console.log("PRODOTTO RECUPERATO DAL FORM", nuovoProdotto);

  let urlToUse = productURL;
  if (productID) {
    urlToUse = productURL + "/" + productID;
  }

  fetch(urlToUse, {
    method: productID ? "PUT" : "POST",
    body: JSON.stringify(nuovoProdotto),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTk5YjczOWY4NzAwMTU3YWIwOGQiLCJpYXQiOjE3NzY0MTMwODMsImV4cCI6MTc3NzYyMjY4M30.7EscX5UwqW8GsCyztZ2BkfjREjggPTDBnflaaczYOI8",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("PRODOTTO SALVATO!");
        form.reset();
      } else {
        throw new Error("Il server ha rifiutato il prodotto");
      }
    })
    .catch((err) => {
      console.log("SALVATAGGIO PRODOTTO FALLITO", err);
    });
});

const footerYear = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear();
};

footerYear();
