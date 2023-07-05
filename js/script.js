let form1 = document.querySelector("#form")

form1.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formData = new FormData(form1);
    // console.log(formData.get('Name'))
    const data = Object.fromEntries(formData);
    fetch("http://localhost:3000/Users", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    alert("Account Was Succesfully created!!!")
    //   .catch(error => console.log(error))
    // console.log(data);
})
// let form1 = document.querySelector("#form")
// form1.addEventListener('submit',handleSubmit)

// function handleSubmit(e){
//     console.log('click')
//     e.preventDefault();
//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData)
//     console.log(data)
//     fetch("http://localhost:3000/Users",{
//         method: 'POST' ,
//         headers: {
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(res => res.json())
//     .then(data =>console.log(data))
//     .catch(error =>console.group(error))
// }

