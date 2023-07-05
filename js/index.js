document.addEventListener("DOMContentLoaded",()=>{
    
    GetCars()
})
function GetCars(){

    return fetch("http://localhost:3000/cars")
    .then(res => res.json())
    .then(data => DisplayCars(data))

}
//GetCars();
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
        
        HireBtn.addEventListener("click",(e)=>{
            e.preventDefault()
            if(car.Availability > 0){
                let Price = car.HirePrice
                
                let HireDays = prompt("Enter The Number of Days you Wish To Hire: ")
                if(HireDays > 0){
                    let Hire = parseInt(HireDays)
                    const HiringPrice = (Hire * Price)
                    let ans = prompt(`Your Hiring price is ${HiringPrice} Kshs. Do You Wish to Proceed? Reply with Y for Yes or N for No`)
                    let ans1 = ans.toUpperCase()
                    if(ans1 === 'Y'){
                        alert('Thankyou for your purchase.Your Payment will be processed Shortly.Enjoy Your Ride!')
                        car.Availability -= 1;
                        CarDetail.querySelector("#CarDetail").textContent = `Available Cars : ${car.Availability}`
                    }else if(ans1 === 'N'){
                        alert("Thank you for Your Time.See you soon.")
                    }else{
                        alert("Please enter a Valid Input!!!")
                    }
                }else{
                    alert("Days Cannot be less than 0!!")
                }
                
                //let AvailableCars = 
                // const HiringPrice = (Hire * Price)
                // let ans = prompt(`Your Hiring price is ${HiringPrice} Kshs. Do You Wish to Proceed? YES/NO`)
                // if(ans === "YES".toLowerCase()){
                //     alert('Thankyou for your purchase.Your Payment will be processed Shortly.Enjoy Your Ride!')
                //     car.Availability -= 1;
                //     CarDetail.querySelector("#CarDetail").textContent = `Available Cars : ${car.Availability}`

                // }else if(ans === "NO".toLowerCase()){
                //     alert("Thank you for Your Time.See you soon.")

                // }else{
                //     alert("Please enter a Valid Input!!!")
                // }

            }else{
                alert("Oops!The Selected Car is not Available at the moment.")
            }
        })
        CarDetails.appendChild(CarDetail)

    }
}

document.querySelector("#btn-btn").addEventListener("click",()=>{
    document.querySelector(".modal").style.display = "flex";
});
document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".modal").style.display = "none";
});
let addCar  = document.querySelector("#AddCars")
// console.log(addCar)
// function hello(){
//     console.log("i was clicked!")
// }
addCar.addEventListener("submit",(e)=>{
    e.preventDefault()
    const formdata = new FormData(addCar)
    const data = Object.fromEntries(formdata)
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
