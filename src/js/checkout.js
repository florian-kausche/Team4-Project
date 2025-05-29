// checkout.js - Handles checkout form validation and error checking

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  form.addEventListener("submit", function(event) {
    let valid = true;
    let messages = [];
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const address = form.elements["address"].value.trim();
    const card = form.elements["card"].value.trim();

    if (!name) {
      valid = false;
      messages.push("Name is required.");
    }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      valid = false;
      messages.push("A valid email is required.");
    }
    if (!address) {
      valid = false;
      messages.push("Address is required.");
    }
    if (!card || !/^\d{16}$/.test(card)) {
      valid = false;
      messages.push("A valid 16-digit card number is required.");
    }

    const errorDiv = document.getElementById("checkoutErrors");
    if (!valid) {
      event.preventDefault();
      errorDiv.innerHTML = messages.map(msg => `<p>${msg}</p>`).join("");
      errorDiv.style.display = "block";
    } else {
      errorDiv.style.display = "none";
    }
  });
});
