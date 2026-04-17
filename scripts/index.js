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
        <div class="hover-scale position-relative">
        <a href="./details.html?id=${productObject._id}" class="text-decoration-none">
            <div class="card" style="height: 400px;">

                <img src=${productObject.imageUrl} class="card-img-top object-fit-contain h-25 my-4" alt="product picture">
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
         </a>
         </div>
        `;
        const row = document.getElementById("product-row");
        row.appendChild(newCol);
      });
    })
    .catch((error) => {
      console.log("ERRORE NELLA FETCH", error);
    });
};

footerYear();
getProducts();
