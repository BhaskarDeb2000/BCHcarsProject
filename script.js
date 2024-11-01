class Car {
  constructor(license, maker, model, owner, price, color, year) {
    this.license = license;
    this.maker = maker;
    this.model = model;
    this.owner = owner;
    this.price = price;
    this.color = color;
    this.year = year;
  }

  // Method to calculate discounted price based on car's age
  getDiscountedPrice() {
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - this.year;

    if (carAge > 10) {
      return (this.price * 0.85).toFixed(2); // 15% discount
    }
    return null; // No discount
  }
}

const carArray = [];

const carForm = document.getElementById("carForm");
const carTableBody = document.querySelector("#carTable tbody");
const searchBtn = document.getElementById("searchBtn");
const searchResult = document.getElementById("searchResult");
const formError = document.getElementById("formError");

// Function to add a car to the table
function addCarToTable(car) {
  const discountedPrice = car.getDiscountedPrice();
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${car.license}</td>
        <td>${car.maker}</td>
        <td>${car.model}</td>
        <td>${car.owner}</td>
        <td>$${car.price.toFixed(2)}</td>
        <td>${discountedPrice ? `$${discountedPrice}` : "N/A"}</td>
        <td>${car.color}</td>
        <td>${car.year}</td>
    `;
  carTableBody.appendChild(row);
}

// Error handling for form submission
function validateForm(license, maker, model, owner, price, color, year) {
  const currentYear = new Date().getFullYear();
  if (!license || !maker || !model || !owner || !price || !color || !year) {
    return "All fields are required.";
  }
  if (price <= 0) {
    return "Price must be a positive number.";
  }
  if (year < 1886 || year > currentYear) {
    return `Year must be between 1886 and ${currentYear}.`;
  }
  return null;
}

// Handle form submission
carForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const license = document.getElementById("license").value;
  const maker = document.getElementById("maker").value;
  const model = document.getElementById("model").value;
  const owner = document.getElementById("owner").value;
  const price = parseFloat(document.getElementById("price").value);
  const color = document.getElementById("color").value;
  const year = parseInt(document.getElementById("year").value);

  const errorMessage = validateForm(
    license,
    maker,
    model,
    owner,
    price,
    color,
    year
  );
  if (errorMessage) {
    formError.textContent = errorMessage;
    return;
  }

  formError.textContent = ""; // Clear any previous error message

  const newCar = new Car(license, maker, model, owner, price, color, year);
  carArray.push(newCar);

  addCarToTable(newCar);

  carForm.reset();
});

// Search car by license plate
searchBtn.addEventListener("click", function () {
  const searchLicense = document.getElementById("searchLicense").value.trim();

  if (!searchLicense) {
    searchResult.className = "error";
    searchResult.innerHTML = "Please enter a valid license plate.";
    return;
  }

  const car = carArray.find((c) => c.license === searchLicense);

  if (car) {
    const discountedPrice = car.getDiscountedPrice();
    searchResult.className = "success";
    searchResult.innerHTML =
      `Car Found: ${car.maker}, <br> 
Model: ${car.model}, <br>
Owned By: ${car.owner}. <br>
Price: $${car.price.toFixed(2)}, <br>` +
      (discountedPrice ? ` Discounted Price: $${discountedPrice}` : "");
  } else {
    searchResult.className = "error";
    searchResult.innerHTML = "No car found with that license plate.";
  }
});
