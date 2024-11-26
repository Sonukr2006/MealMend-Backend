document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");

  // Email Validation
  const emailInput = document.getElementById("signup-email");
  const emailError = document.getElementById("emailError");

  emailInput.addEventListener("input", function () {
    const emailValue = emailInput.value.toLowerCase();
    emailInput.value = emailValue;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(emailValue)) {
      emailError.style.display = "block";
      emailError.textContent =
        "Please enter a valid email address ending with gmail.com.";
    } else {
      emailError.style.display = "none";
    }
  });

  // Phone Validation
  const phoneInput = document.getElementById("signup-phone");
  const phoneError = document.getElementById("phoneError");

  phoneInput.addEventListener("input", function () {
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^[0-9]{10}$/; // Must be 10 digits
    if (!phoneRegex.test(phoneValue)) {
      phoneError.style.display = "block";
      phoneError.textContent = "Please enter a valid 10-digit phone number.";
    } else {
      phoneError.style.display = "none";
    }
  });

  // Password Validation
  const passwordInput = document.getElementById("signup-password");
  const passwordError = document.getElementById("passwordError");

  passwordInput.addEventListener("input", function () {
    const passwordValue = passwordInput.value;
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!strongRegex.test(passwordValue)) {
      passwordError.style.display = "block";
      passwordError.textContent =
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.";
    } else {
      passwordError.style.display = "none";
    }
  });

  // Show/Hide Password
  const showPasswordCheckbox = document.getElementById("showPassword");
  showPasswordCheckbox.addEventListener("change", function () {
    passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
  });

  document.getElementById("signup-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const fullName = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const role = document.getElementById("user-role").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const avatar = document.getElementById("avatar").value.trim(); // Handle file uploads
  
    
    if (
      emailError.style.display === "block" ||
      phoneError.style.display === "block" ||
      passwordError.style.display === "block"
    ) {
      alert("Please fix the errors before submitting.");
      return;
    
    }
    
    // Validate fields

    if (!fullName || !email || !password || !role || !phone || !avatar) {
      alert("Please fill out all fields.");
      return;
    }
  
    // Form data to send
    const formData = {
      fullName,
      email,
      password,
      role,
      phone,
      avatar
    };
  
    console.log("Form data being sent:", formData);
  
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text(); // Get the text response
        console.error("Non-JSON response received:", text);
        alert("Error: Received non-JSON response from server.");
        return;
      }
      const result = await response.json();
  
      if (response.ok) {
        alert(`Registration successful for: ${fullName}`);
        window.location.href = "../Login/Login.html"; // Redirect on success
      } else {
        // Display error from server
        console.error("Error response from server:", result);
        alert(`Registration failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred during registration. Please try again.");
    }
  });
  
});