document.addEventListener("DOMContentLoaded", function () {
  const openMenu = document.getElementById("open");
  const closeMenu = document.getElementById("close");
  const navLinks = document.querySelector(".nav-links");

  openMenu.addEventListener("click", (event) => {
    navLinks.classList.add("open");
    openMenu.style.display = "none";
    closeMenu.style.display = "block";

    event.stopPropagation();
  });

  closeMenu.addEventListener("click", (event) => {
    navLinks.classList.remove("open");
    closeMenu.style.display = "none";
    openMenu.style.display = "block";

    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (navLinks.classList.contains("open")) {
      if (!navLinks.contains(event.target) && event.target !== openMenu) {
        navLinks.classList.remove("open");
        closeMenu.style.display = "none";
        openMenu.style.display = "block";
      }
    }
  });
});

const btn = document.getElementById("button");
btn.addEventListener("click", (e) => {
  e.stopPropagation();
  const value = document.getElementById("location").value;
  alert(`Your Location:)${value}`);
});
const slide = document.querySelector(".carousel-slide");
let totalWidth = 0;

const cards = document.querySelectorAll(".image-card");
cards.forEach((card) => {
  totalWidth += card.offsetWidth + 16;
});

slide.style.width = `${totalWidth}px`;

function startSliding() {
  let currentTranslateX = 0;
  const slideInterval = setInterval(() => {
    currentTranslateX -= 1; // Move left
    slide.style.transform = `translateX(${currentTranslateX}px)`;

    if (Math.abs(currentTranslateX) >= totalWidth) {
      currentTranslateX = 0; // Reset to start
    }
  }, 10);
}

startSliding();

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("background-video");
  const videoSource = document.getElementById("video-source");
  const videos = ["../images/project1.mp4", "../images/project2.mp4"];
  let currentVideoIndex = 0;

  video.addEventListener("ended", () => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    videoSource.src = videos[currentVideoIndex];
    video.load();
    video.play();
  });
  video.play();
  // Form submit handler
  const form = document.querySelector("#contact-form");
  const nameField = document.querySelector("#name");
  const messageField = document.querySelector("#message");
  const emailField = document.querySelector("#email");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = {
      fullName: nameField.value.trim(), // Correctly assign the value
      email: emailField.value.trim(), // Correctly assign the value
      message: messageField.value.trim(), // Correctly assign the value
    };

    if (!formData.fullName || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Backend API par request send karna
      const response = await fetch("/api/users/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Data ko JSON mein convert karna
      });

      const result = await response.json();
      console.log(result); // Response ko handle karna (e.g., success ya error message)

      if (response.ok) {
        alert("Message sent successfully!");
        // Redirect to another page, e.g.:
        // window.location.href = '../Donor/Donor.html';
      } else {
        alert(`Message failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  });
});
