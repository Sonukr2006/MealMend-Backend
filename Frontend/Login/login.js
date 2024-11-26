document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const form = document.querySelector("form");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const showPasswordCheckbox = document.querySelector("#showPassword");
  const phoneInput = document.querySelector("#phone");
  //using phone
  const loginwithphone = document.querySelector("#Usingphone");
  loginwithphone.addEventListener("click", (event) => {
    event.preventDefault();
    if (emailInput.type === "email") {
      emailInput.type = "phone";
      emailInput.placeholder = "Enter your phone";
      loginwithphone.innerHTML = "Using Email";
      emailInput.name = "phone";
    } else {
      emailInput.type = "email";
      emailInput.placeholder = "Enter your email";
      loginwithphone.innerHTML = "Using Phone";
      emailInput.name = "email";
      window.location.reload();
    }
  });
  showPasswordCheckbox.addEventListener("change", () => {
    if (showPasswordCheckbox.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const phone = emailInput.value.trim();

    if (!email || !password || !phone) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phone }),
      })
      const result = await response.json();
      console.log(result);
			console.log(result.message.user);
      if (response.ok) {
        if (result.message.user) {
          // Check if result.user exists
          alert("Login successful")
          const { role } = result.message.user; // Access user role from result.user
          if (role === "donor") {
            window.location.href = "../Donor/Donor.html";
          } else if (role === "volunteer") {
            window.location.href = "../Volunteer/Volunteer.html";
          } else if (role === "partner") {
            window.location.href = "../receiver/receiver.html";
          }else if(role === 'Admin'){
            window.location.href = "../Admin/Admin.html"
            alert("Admin login successful.")
          }

        } else {
         alert(result.message )
        }
      } else {
        alert(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid user. Please try again.");
    }
  });
});
