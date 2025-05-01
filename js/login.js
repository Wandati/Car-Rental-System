let loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  fetch("http://localhost:3000/Users")
    .then((res) => res.json())
    .then((users) => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        alert(`Welcome, ${user.username || "User"}!`);
        // You can store the logged-in user info in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "../index.html"; // Redirect to home or dashboard
      } else {
        alert("Invalid email or password!");
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      alert("Login failed. Please try again.");
    });
});
