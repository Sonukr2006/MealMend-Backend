
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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/users/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      const user = data.user;
      document.querySelector('#name').innerHTML = user.fullName;
      document.querySelector('#email').innerHTML = user.email;
      document.querySelector('#phone').innerHTML = user.phone;
      document.querySelector('#profile-pic').src = user.avatar
      console.log(user.email)
    } else {
      alert(`Failed to fetch profile: ${result.message}`);
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    alert("Something went wrong. Please try again later.");
  }
});

document.addEventListener("DOMContentLoaded",async()=>{
  const form = document.getElementById('feedbackForm')
  form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch("/api/users/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        var user = data.user;
      } else {
        alert(`Failed to fetch profile: ${result.message}`);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Something went wrong. Please try again later.");
    }
    const feedback = document.getElementById('feedback').value.trim();
    const fullName = user.fullName;
    const phone = user.phone;
    const userId = user._id;
    const formdata ={
      feedback,
      fullName,
      phone,
      userId,
    };
    console.log(formdata)
    try {
      const response = await fetch("/api/users/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
    
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP Error: ${response.status} - ${text}`);
      }
    
      const result = await response.json();
      console.log(result);
    
      if (result.statusCode === 200) {
        alert("Feedback sent successful");
      } else {
        console.error("Server Error:", result);
        alert(`Request failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred during feedback sent request. Please try again.");
    }

  })
})