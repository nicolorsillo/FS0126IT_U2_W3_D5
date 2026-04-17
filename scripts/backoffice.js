const productURL = "https://striveschool-api.herokuapp.com/api/product";
const allTheParameters = new URLSearchParams(location.search);
let productID = "";

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
        location.reload();
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

const getProducts = function () {
  fetch(productURL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTk5YjczOWY4NzAwMTU3YWIwOGQiLCJpYXQiOjE3NzY0MTMwODMsImV4cCI6MTc3NzYyMjY4M30.7EscX5UwqW8GsCyztZ2BkfjREjggPTDBnflaaczYOI8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Response NON ok");
      }
    })
    .then((data) => {
      document.getElementById("spinner-section").classList.add("d-none");

      console.log("ARRAY DI PRODOTTI ESISTENTI", data);
      data.forEach((productObject) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.innerHTML = `
          <div class="card mb-3" id="${productObject._id}">
      <div class="row g-0">
        <div class="col-md-4 d-flex justify-content-center">
          <img
            src="${productObject.imageUrl}"
            class="img-fluid rounded-start object-fit-contain"
            alt="product picture"
            style="max-height: 200px"
          />
        </div>
        <div class="col-md-6">
          <div
            class="card-body h-100 d-flex flex-column justify-content-between"
          >
            <div>
              <h6 class="card-title">${productObject.brand}</h6>
              <h4 class="card-title">${productObject.name}</h4>
              <p class="card-text">${productObject.description}</p>
            </div>
            <div>
              <p class="card-text mt-auto">
                <small class="text-body-secondary"
                  >Price = ${productObject.price}€</small
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-2 d-flex flex-column justify-content-sm-around px-3">
          <button class="btn btn-info" onclick="modifyProduct('${productObject._id}')">
            Modifica<i class="bi bi-pencil-fill ms-2"></i>
          </button>
          <button class="btn btn-danger" onclick="deleteProduct('${productObject._id}')">
            Elimina<i class="bi bi-trash ms-2"></i>
          </button>
        </div>
      </div>
    </div>
        `;
        const row = document.getElementById("product-list");
        row.appendChild(newCol);
      });
    })
    .catch((error) => {
      console.log("ERRORE NELLA FETCH", error);
    });
};

const deleteProduct = function (productId) {
  fetch(productURL + "/" + productId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTk5YjczOWY4NzAwMTU3YWIwOGQiLCJpYXQiOjE3NzY0MTMwODMsImV4cCI6MTc3NzYyMjY4M30.7EscX5UwqW8GsCyztZ2BkfjREjggPTDBnflaaczYOI8",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("PRODOTTO ELIMINATO!");
        document.getElementById(productId).classList.add("d-none");
      } else {
        throw new Error("errore nell'eliminazione del prodotto!");
      }
    })
    .catch((err) => {
      console.log("ERRORE FETCH", err);
    });
};

footerYear();
getProducts();

const modifyProduct = function (productId) {
  {
    fetch(productURL + "/" + productId, {
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
        const btnSalva = document.getElementById("btn-salva");
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
        btnSalva.innerText = "MODIFICA";
      })
      .catch((err) => {
        console.log("ERRORE NEL RIPOPOLAMENTO DEL FORM", err);
      });
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  productID = productId;
};

const resetForm = function () {
  productID = "";
  const btnSalva = document.getElementById("btn-salva");
  btnSalva.innerText = "SALVA";
};
