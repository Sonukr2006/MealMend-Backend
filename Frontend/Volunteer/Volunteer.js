
// Sample data for tasks
const tasks = [
  {
    id: 1,
    type: "Pickup",
    details: "Pickup from John Smith at 123 Main St.",
    completed: false,
  },
  {
    id: 2,
    type: "Delivery",
    details: "Deliver to Jane Doe at 456 Oak St.",
    completed: false,
  },
];

// Function to populate tasks into the dashboard
function populateTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear existing tasks
  tasks.forEach((task) => {
    if (!task.completed) {
      const li = document.createElement("li");
      li.textContent = task.details;
      li.onclick = () => showTaskDetails(task);
      taskList.appendChild(li);
    }
  });
}

// Function to show task details
function showTaskDetails(task) {
  document.getElementById("task-info").textContent = `Task Type: ${task.type}`;
  document.getElementById("pickup-delivery-info").textContent = task.details;
  document.getElementById("task-details").style.display = "block";
}

// Event listener for completing a task
document.getElementById("complete-task").addEventListener("click", function () {
  const taskId = tasks.find(
    (task) =>
      task.details ===
      document.getElementById("pickup-delivery-info").textContent,
  ).id;

  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.completed = true; // Mark task as completed
    alert("Task completed!");

    const completedTaskList = document.getElementById("completed-task-list");
    const li = document.createElement("li");
    li.textContent = task.details;
    completedTaskList.appendChild(li);

    populateTasks(); // Refresh task list
    document.getElementById("task-details").style.display = "none"; // Hide task details
  }
});

// Function to get geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to show location on the page
function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.getElementById("location").textContent =
    `Latitude: ${lat}, Longitude: ${lon}`;

  const map = document.getElementById("map");
  map.innerHTML = `Map would be displayed here (Lat: ${lat}, Lon: ${lon})`; // Placeholder for actual map
}

// Event listener for feedback submission
document
  .getElementById("feedback-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh
    const feedback = document.getElementById("feedback").value;
    console.log("Feedback submitted:", feedback);
    alert("Thank you for your feedback!");
    document.getElementById("feedback").value = ""; // Clear feedback input
  });

// Load tasks on page load
window.onload = populateTasks;


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
