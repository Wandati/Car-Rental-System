// document.addEventListener("DOMContentLoaded",()=>{
    
//     GetCars()
// })
document.addEventListener("DOMContentLoaded",GetCars)
//function to fetch db.json data and convert it to js data
function GetCars(){

    return fetch("http://localhost:3000/cars")
    .then(res => res.json())
    .then(data => DisplayCars(data))

}
//GetCars();
//function that displays the car details in our website
function DisplayCars(cars){
    const CarDetails = document.querySelector(".Display")
    for(let car of cars){
        let CarDetail = document.createElement("div")
        CarDetail.setAttribute("class","CarInfo")
        
        CarDetail.innerHTML = `
        <img src ="${car.image}">
        <h2>${car.name}</h2>
        <h3>${car.make}</h3>
        <h3>Year Of Manufacture : ${car.YearOfManufacture}</h3>
        <h3> <span id ="Price"> Price Per Day : ${car.HirePrice} Kshs</span></h3>
        <h3> <span id ="CarDetail"> Available Cars : ${car.Availability}</span></h3>
        <button class ="Hire"> Hire Now </button>
        `
        let HireBtn = CarDetail.querySelector(".Hire")
       //Event listener for the Hire button  
        HireBtn.addEventListener("click",(e)=>{
            e.preventDefault()
            //Check if there the selected Car is available to be hired
            if(car.Availability > 0){
                let Price = car.HirePrice
                let HireDays = prompt("Enter The Number of Days you Wish To Hire: ")
            //Conditional statent to make sure Numbe of days are greater than 0
                if(HireDays > 0){
                    let Hire = parseInt(HireDays)
                    
                    const HiringPrice = (Hire * Price)
                    let ans = prompt(`Your Hiring price is ${HiringPrice} Kshs. Do You Wish to Proceed? Reply with Y for Yes or N for No`)
                    let ans1 = ans.toUpperCase()
                    if(ans1 === 'Y'){
                        const data = {
                            car: car.name,
                            days : Hire,
                            id : car.id
                           
                        }
                        UpdateData(data)
                        alert('Thankyou for your purchase.Your Payment will be processed Shortly.Enjoy Your Ride!')
                        let Availability = car.Availability
                        Availability -= 1;
                        CarDetail.querySelector("#CarDetail").textContent = `Available Cars : ${Availability}`
                        UpdateAvailability(car.id,Availability)
                    }else if(ans1 === 'N'){
                        alert("Thank you for Your Time.See you soon.")
                    }else{
                        alert("Please enter a Valid Input!!!")
                    }
                }else{
                    alert("Days Cannot be less than 0!!")
                }

            }else{
                alert("Oops!The Selected Car is not Available at the moment.")
            }

        })
        //Adding our child Element to it's Parent 
        CarDetails.appendChild(CarDetail)

    }
}
//Function to update availability in our database
function UpdateAvailability(id,Availability){
    fetch(`http://localhost:3000/cars/${id}`,{
        method : "PATCH",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({Availability : Availability})
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}
//function to Post Hire days and Car hired
function UpdateData(data){
    // const data = {
    //     days : Hire,
    //     id : car.id
    // }
    fetch(`http://localhost:3000/data`,{
        method : `POST`,
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))

}
//Expressions for the Modal form
document.querySelector("#btn-btn").addEventListener("click",()=>{
    document.querySelector(".modal").style.display = "flex";
});
document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".modal").style.display = "none";
});
document.querySelector(".AddCars").addEventListener("click",()=>{
    document.querySelector(".modal").style.display = "none";
});

let addCar  = document.querySelector("#AddCars")
//Event Listener for the Add Cars button
addCar.addEventListener("submit",(e)=>{
     e.preventDefault()
    const formdata = new FormData(addCar)
    const data = Object.fromEntries(formdata)
    //Posting our new car data to the db.json file
    fetch("http://localhost:3000/cars",{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json)
    .then(data =>console.log(data))
    .catch(error => console.log(error))
    
});
