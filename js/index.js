// Fetching data from db.json

document.addEventListener("DOMContentLoaded", GetCars);

// Function to fetch data from db.json and convert it to JS data
function GetCars() {
    fetch("http://localhost:3000/cars")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => DisplayCars(data))
    .catch(error => {
        console.error("Error fetching car data:", error);
        document.querySelector(".Display").innerHTML = `
            <div class="error-message">
                <h3>Unable to load car data. Please check your connection or try again later.</h3>
            </div>`;
    });
}

// Function that displays the car details on our website
function DisplayCars(cars) {
    const CarDetails = document.querySelector(".Display");
    CarDetails.innerHTML = ''; // Clear existing content
    
    if (!cars || cars.length === 0) {
        CarDetails.innerHTML = '<div class="empty-state"><h3>No cars available at the moment</h3></div>';
        return;
    }
    
    for (let car of cars) {
        let CarDetail = document.createElement("div");
        CarDetail.setAttribute("class", "CarInfo");
        
        CarDetail.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h2>${car.name}</h2>
            <h3>${car.make}</h3>
            <h3>Year: ${car.YearOfManufacture}</h3>
            <h3><span id="Price">Price: ${car.HirePrice} Kshs/day</span></h3>
            <h3><span id="CarDetail">Available: ${car.Availability}</span></h3>
            <button class="Hire">Hire Now</button>
        `;
        
        let HireBtn = CarDetail.querySelector(".Hire");
        
        // Event listener for the Hire button  
        HireBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Check if the selected Car is available to be hired
            if (car.Availability > 0) {
                let Price = car.HirePrice;
                let HireDays = prompt("Enter the number of days you wish to hire:");
                
                // Conditional statement to make sure Number of days are greater than 0
                if (HireDays && HireDays > 0) {
                    let Hire = parseInt(HireDays);
                    
                    const HiringPrice = (Hire * Price);
                    let ans = prompt(`Your total hiring price is ${HiringPrice} Kshs.\n\nDo you wish to proceed? Reply with Y for Yes or N for No`);
                    
                    if (ans) {
                        let ans1 = ans.toUpperCase();
                        if (ans1 === 'Y') {
                            const data = {
                                car: car.name,
                                days: Hire,
                                id: car.id
                            };
                            
                            UpdateData(data);
                            
                            let Availability = car.Availability - 1;
                            car.Availability = Availability; // Update the local data
                            
                            CarDetail.querySelector("#CarDetail").textContent = `Available: ${Availability}`;
                            UpdateAvailability(car.id, Availability);
                            
                            alert('Thank you for your purchase! Your payment will be processed shortly. Enjoy your ride!');
                        } else if (ans1 === 'N') {
                            alert("Thank you for your time. See you soon!");
                        } else {
                            alert("Please enter a valid input (Y/N)!");
                        }
                    }
                } else {
                    alert("Please enter a valid number of days greater than 0!");
                }
            } else {
                alert("Oops! The selected car is not available at the moment.");
            }
        });
        
        // Adding our child Element to its Parent 
        CarDetails.appendChild(CarDetail);
    }
}

// Function to update availability in our database
function UpdateAvailability(id, Availability) {
    fetch(`http://localhost:3000/cars/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Availability: Availability })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("Availability updated:", data))
    .catch(error => console.error("Error updating availability:", error));
}

// Function to Post Hire days and Car hired
function UpdateData(data) {
    fetch(`http://localhost:3000/data`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("Hire data saved:", data))
    .catch(error => console.error("Error saving hire data:", error));
}

// Modal form functionality
const modalBtn = document.querySelector("#btn-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const addCarForm = document.querySelector("#AddCars");

// Open modal
modalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Close modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Event Listener for the Add Cars form submission
addCarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formdata = new FormData(addCarForm);
    const data = Object.fromEntries(formdata);
    
    // Convert numeric values to numbers
    data.YearOfManufacture = parseInt(data.YearOfManufacture);
    data.HirePrice = parseInt(data.HirePrice);
    data.Availability = parseInt(data.Availability);
    
    // Posting our new car data to the db.json file
    fetch("http://localhost:3000/cars", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("New car added:", data);
        alert("New car added successfully!");
        modal.style.display = "none";
        addCarForm.reset();
        GetCars(); // Refresh the car list
    })
    .catch(error => {
        console.error("Error adding new car:", error);
        alert("Failed to add new car. Please try again.");
    });
});