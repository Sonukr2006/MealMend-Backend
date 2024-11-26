document.addEventListener("DOMContentLoaded", function () {
  const dryFoodBtn = document.getElementById("dry-food");
  const wetFoodBtn = document.getElementById("wet-food");
  const dryFoodForm = document.getElementById("dry-food-form");
  const wetFoodForm = document.getElementById("wet-food-form");

  dryFoodBtn.addEventListener("click", function () {
    dryFoodForm.style.display = "block";
    wetFoodForm.style.display = "none";
  });

  wetFoodBtn.addEventListener("click", function () {
    wetFoodForm.style.display = "block";
    dryFoodForm.style.display = "none";
  });

  dryFoodForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const foodName = document.getElementById("food-name").value;
    const quantity = document.getElementById("food-quantity").value;
    const date = document.getElementById("pickup-date").value;
    const status = "Pending";

    addHistory(foodName, quantity, "Dry", status, date);
    // dryFoodForm.save();
    dryFoodForm.style.display = "none";
  });

  wetFoodForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const foodName = document.getElementById("wet-name").value;
    const quantity = document.getElementById("wet-quantity").value;
    const quality = document.getElementById("wet-quality").value;
    const date = document.getElementById("date").value;
    const status = "Pending";

    addHistory(foodName, quantity, quality, status, date);
    // wetFoodForm.save();
    wetFoodForm.style.display = "none";
  });

  function addHistory(foodName, quantity, quality, status, date) {
    const historyTable = document.getElementById("history-table");
    const newRow = historyTable.insertRow();
    newRow.innerHTML = `
					<td>${foodName}</td>
					<td>${quantity} kg</td>
					<td>${quality}</td>
					<td>${status}</td>
					<td>${date}</td>
			`;
  }
});
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
      let user = data.user;
      document.querySelector("#donor-name").innerHTML = user.fullName;
      document.querySelector("#donor-email").innerHTML = user.email;
      document.querySelector("#donor-number").innerHTML = user.phone;
      document.querySelector("#profile-pic").src = user.avatar;
      console.log(user.email);
    } else {
      alert(`Failed to fetch profile: ${result.message}`);
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    alert("Something went wrong. Please try again later.");
  }
});
document.addEventListener("DOMContentLoaded", function () {});

document.addEventListener("DOMContentLoaded", async () => {
 document.getElementById('dry-food').addEventListener('click', async()=>{
  const form = document.getElementById('dry-food-form')
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
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const userId = user._id
    const role = user.role
    const itemType = document.getElementById('type').value.trim();
    const itemName = document.getElementById('food-name').value.trim();
    const quality = document.getElementById('food-quality').value.trim();
    const quantity = document.getElementById('food-quantity').value.trim();
    const address = document.getElementById('food-address').value.trim();
    const itemDescription = document.getElementById('ItemDescription').value.trim();
    const phone = document.getElementById('contact-number').value.trim();
    const pickupDate = document.getElementById('pickup-date').value.trim();
    const formData = {
      userId,
      role,
      itemType,
      itemName,
      quantity,
      quality,
      address,
      itemDescription,
      phone,
      pickupDate,
    };
    console.log(formData)
    try {
      const response = await fetch("/api/users/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP Error: ${response.status} - ${text}`);
      }
    
      const result = await response.json();
      console.log(result);
    
      if (result.statusCode === 200) {
        alert("Request sent successful");
      } else {
        console.error("Server Error:", result);
        alert(`Request failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred during registration for request. Please try again.");
    }

  });
 }) 
 document.getElementById('wet-food').addEventListener('click', async()=>{
  const form = document.getElementById('wet-food-form')
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
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const userId = user._id
    const role = user.role
    const itemType = document.getElementById('wet-type').value.trim();
    const itemName = document.getElementById('wet-name').value.trim();
    const quality = document.getElementById('wet-quality').value.trim();
    const quantity = document.getElementById('wet-quantity').value.trim();
    const address = document.getElementById('wet-address').value.trim();
    const itemDescription = document.getElementById('wet-itemDescription').value.trim();
    const phone = document.getElementById('number').value.trim();
    const pickupDate = document.getElementById('date').value.trim();
    const formData = {
      userId,
      role,
      itemType,
      itemName,
      quantity,
      quality,
      address,
      itemDescription,
      phone,
      pickupDate,
    };
    console.log(formData)
    try {
      const response = await fetch("/api/users/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP Error: ${response.status} - ${text}`);
      }
    
      const result = await response.json();
      console.log(result);
    
      if (result.statusCode === 200) {
        alert("Request sent successful");
      } else {
        console.error("Server Error:", result);
        alert(`Request failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred during registration for request. Please try again.");
    }

  });
 })
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