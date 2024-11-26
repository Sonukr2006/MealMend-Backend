document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");
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
  const phoneInput = document.getElementById("signup-phone");
  const phoneError = document.getElementById("phoneError");
  phoneInput.addEventListener("input", function () {
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneValue)) {
      phoneError.style.display = "block";
      phoneError.textContent = "Please enter a valid 10-digit phone number.";
    } else {
      phoneError.style.display = "none";
    }
  });

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
  const showPasswordCheckbox = document.getElementById("showPassword");
  showPasswordCheckbox.addEventListener("change", function () {
    passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
    document
      .getElementById("signup-form")
      .addEventListener("submit", async function (e) {
        e.preventDefault();
        const fullName = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const role = document.getElementById("user-role").value;
        const phone = document.getElementById("signup-phone").value;
        const avatar = document.getElementById("avatar").value;
        const formData = { fullName, email, password, role, phone, avatar };
        try {
          const response = await fetch("/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
          const result = await response.json();
          console.log(result)
          console.log(result.statusCode)
          if (result.statusCode == 200) {
            alert("Registration successful");
            window.location.href = "../Login/Login.html";
          } else {
            console.error("Error response from server:", result);
            alert(`Registration failed: ${result.message || "Unknown error"}`);
          }
        } catch (error) {
          console.error("Error during fetch:", error);
          alert("An error occurred during registration. Please check your connection and try again.");
        }
      });
  });
});
