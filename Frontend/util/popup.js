function openPopup(message, description) {
  var popup = document.getElementById("popup");
  document.getElementById("message").textContent = message;
  document.getElementById("description").textContent = description;
  popup.classList.add("open-popup");
}
function closePopup() {
  var popup = document.getElementById("popup");
  popup.classList.remove("open-popup");
}
document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".btn-popup");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      openPopup(
        button.getAttribute("data-message"),
        button.getAttribute("data-description")
      );
    });
  });
});
