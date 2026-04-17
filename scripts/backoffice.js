const productURL = "https://striveschool-api.herokuapp.com/api/product";
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

  const msg = productID
    ? "Confermi la modifica del prodotto?"
    : "Confermi il salvataggio del nuovo prodotto?";

  if (confirm(msg)) {
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

    const nuovoProdotto = new Product(
      name,
      description,
      brand,
      imageUrl,
      price,
    );
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
  }
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
      const list = document.getElementById("product-list");
      data.forEach((productObject) => {
        const newCol = document.createElement("div");
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
                  <button
                    class="btn btn-info"
                    onclick="modifyProduct('${productObject._id}')"
                  >
                    Modifica<i class="bi bi-pencil-fill ms-2"></i>
                  </button>
                  <button
                    class="btn btn-danger"
                    onclick="deleteProduct('${productObject._id}')"
                  >
                    Elimina<i class="bi bi-trash ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
        `;
        list.appendChild(newCol);
      });
    })
    .catch((error) => {
      console.log("ERRORE NELLA FETCH", error);
    });
};

const deleteProduct = function (productId) {
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(productURL + "/" + productId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTk5YjczOWY4NzAwMTU3YWIwOGQiLCJpYXQiOjE3NzY0MTMwODMsImV4cCI6MTc3NzYyMjY4M30.7EscX5UwqW8GsCyztZ2BkfjREjggPTDBnflaaczYOI8",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("ELIMINATO!");
          document.getElementById(productId).remove();
        }
      })
      .catch((err) => console.log(err));
  }
};

const modifyProduct = function (productId) {
  fetch(productURL + "/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTk5YjczOWY4NzAwMTU3YWIwOGQiLCJpYXQiOjE3NzY0MTMwODMsImV4cCI6MTc3NzYyMjY4M30.7EscX5UwqW8GsCyztZ2BkfjREjggPTDBnflaaczYOI8",
    },
  })
    .then((res) => res.json())
    .then((details) => {
      document.getElementById("name").value = details.name;
      document.getElementById("description").value = details.description;
      document.getElementById("brand").value = details.brand;
      document.getElementById("imageUrl").value = details.imageUrl;
      document.getElementById("price").value = details.price;
      document.getElementById("btn-salva").innerText = "MODIFICA";
      productID = productId;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
};

const resetForm = function (e) {
  if (confirm("Vuoi svuotare il form?")) {
    productID = "";
    document.getElementById("btn-salva").innerText = "SALVA";
  } else {
    e.preventDefault();
  }
};

footerYear();
getProducts();
