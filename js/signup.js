let signupForm = document.querySelector("#signupForm");

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData);
  const email = data.email;

  // Step 1: Check if user with this email already exists
  fetch(`http://localhost:3000/Users?email=${encodeURIComponent(email)}`)
    .then(res => res.json())
    .then(users => {
      if (users.length > 0) {
        // Email already exists
        alert("An account with this email already exists. Please log in or use a different email.");
      } else {
        // Step 2: Email is unique, proceed to create new account
        return fetch("http://localhost:3000/Users", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(() => {
            alert("Account was successfully created! Redirecting to login...");
            window.location.href = "../login.html";
          });
      }
    })
    .catch(error => {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    });
});

