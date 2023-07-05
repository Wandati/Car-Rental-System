let form1 = document.querySelector("#form")
console.log(form1)
// Event listener for the SignUp button
form1.addEventListener('submit',(e)=>{
    e.preventDefault();

    const formData = new FormData(form1);
    const data = Object.fromEntries(formData);
    //Posting the NewForm data to our db.json using POST method
    fetch("http://localhost:3000/Users", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    alert("Account Was Succesfully created!!!Proceed to Log in")
    
})
