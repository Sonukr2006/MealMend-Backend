document.getElementById("send-otp").addEventListener("click", sendOtp);
document
  .getElementById("signup-password")
  .addEventListener("input", checkPasswordStrength);
document.getElementById("signup-form").addEventListener("submit", verifyOtp);

function sendOtp() {
  const email = document.getElementById("signup-email").value;

  if (email) {
    document.getElementById("loading").style.display = "block";

    fetch("/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("loading").style.display = "none";
        if (data.success) {
          alert("OTP sent to your email.");
          document.getElementById("otp-code").style.display = "block";
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      })
      .catch((error) => {
        document.getElementById("loading").style.display = "none";
        console.error("Error:", error);
      });
  } else {
    alert("Please enter your email first.");
  }
}

function checkPasswordStrength() {
  const password = document.getElementById("signup-password").value;
  const strengthText = document.getElementById("password-strength");

  let strength = "Weak";
  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    strength = "Strong";
  } else if (password.length >= 6) {
    strength = "Medium";
  }

  strengthText.textContent = `Password Strength: ${strength}`;
  strengthText.style.display = "block"; // Show strength indicator
}

function verifyOtp(event) {
  event.preventDefault();

  const otp = document.getElementById("otp-code").value;

  if (otp) {
    document.getElementById("loading").style.display = "block";

    fetch("/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("loading").style.display = "none";
        if (data.success) {
          alert("OTP verified successfully. You are now signed up.");
          document.getElementById("signup-form").submit();
        } else {
          alert("Invalid OTP. Please try again.");
        }
      })
      .catch((error) => {
        document.getElementById("loading").style.display = "none";
        console.error("Error:", error);
      });
  } else {
    alert("Please enter the OTP sent to your email.");
  }
}
