// checkout.js - Handles checkout form validation and error checking
import { loadHeaderFooter } from "../js/utils.mjs";
loadHeaderFooter();

// Error checking and validation for checkout
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: "servicesError", message: res.statusText };
  }
}

function alertMessage(message, scroll = true) {
  let alert = document.getElementById("checkoutAlert");
  if (!alert) {
    alert = document.createElement("div");
    alert.id = "checkoutAlert";
    alert.style.position = "fixed";
    alert.style.top = "0";
    alert.style.left = "0";
    alert.style.width = "100%";
    alert.style.background = "#e53935";
    alert.style.color = "#fff";
    alert.style.fontWeight = "bold";
    alert.style.fontSize = "1.1em";
    alert.style.padding = "1em 0";
    alert.style.textAlign = "center";
    alert.style.zIndex = "9999";
    alert.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
    document.body.appendChild(alert);
  }
  alert.textContent = message;
  alert.style.display = "block";
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearAlertMessage() {
  const alert = document.getElementById("checkoutAlert");
  if (alert) alert.style.display = "none";
}

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

export { convertToJson, alertMessage, clearAlertMessage };
