const footerYear = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear();
};

const productURL = "https://striveschool-api.herokuapp.com/api/product/";

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
            <div class="card">
                <img src=${productObject.imageUrl} class="card-img-top object-fit-contain" alt="product picture" height=200>
                <div class="card-body">
                    <h5 class="card-title">${productObject.name}</h5>
                    <p class="card-text">${productObject.description}</p>
                    <p class="card-text">${productObject.brand} - ${productObject.price}€</p>
                    <a href="./details.html?id=${productObject._id}" class="btn btn-primary">VAI AI DETTAGLI</a>
                </div>
            </div>
        `;
        const row = document.getElementById("product-row");
        row.appendChild(newCol);
      });
    })
    .catch((error) => {
      // qui significa che abbiamo riscontrato un problema
      console.log("ERRORE NELLA FETCH", error);
    });
};

footerYear();
getProducts();
