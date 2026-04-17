const footerYear = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear();
};

footerYear();

const productURL = "https://striveschool-api.herokuapp.com/api/product/";
const allTheParameters = new URLSearchParams(location.search);
const productID = allTheParameters.get("id");

const getDetails = function () {
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
        throw new Error("errore nel recupero dettaglio prodotto");
      }
    })
    .then((details) => {
      console.log("DETAILS", details);
      document.getElementById("spinner-section").classList.add("d-none");
      const row = document.getElementById("details");
      row.innerHTML = `
        <div class="col-12 col-md-6">
           <div class="card">
                <img src=${details.imageUrl} class="card-img-top object-fit-contain" alt="product picture" height=200>
                <div class="card-body">
                    <h5 class="card-title">${details.name}</h5>
                    <p class="card-text">${details.description}</p>
                    <p class="card-text">${details.brand} - ${details.price}€</p>
                </div>
            </div>
        </div>
    `;
    })
    .catch((err) => {
      console.log("ERRORE FETCH", err);
    });
};

getDetails();
