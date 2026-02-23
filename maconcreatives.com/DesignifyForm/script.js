const checkboxes = document.querySelectorAll(".service-check");
const quantities = document.querySelectorAll(".quantity");
const plusButtons = document.querySelectorAll(".plus");
const minusButtons = document.querySelectorAll(".minus");
const subtotalDisplay = document.getElementById("subtotal");

function updateSubtotal() {
  let total = 0;
  checkboxes.forEach((checkbox, i) => {
    if (checkbox.checked) {
      const price = parseInt(checkbox.dataset.price);
      const qty = parseInt(quantities[i].textContent);
      total += price * qty;
    }
  });
  subtotalDisplay.textContent = `₹${total}`;
}

// Quantity buttons
plusButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    let qty = parseInt(quantities[i].textContent);
    quantities[i].textContent = qty + 1;
    updateSubtotal();
  });
});

minusButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    let qty = parseInt(quantities[i].textContent);
    if (qty > 1) quantities[i].textContent = qty - 1;
    updateSubtotal();
  });
});

checkboxes.forEach(box => {
  box.addEventListener("change", updateSubtotal);
});

// ===== Modal (Custom Alert) =====
const buyNowBtn = document.getElementById("buyNowBtn");
const paymentModal = document.getElementById("paymentModal");
const closeModal = document.getElementById("closeModal");

buyNowBtn.addEventListener("click", () => {
  paymentModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  paymentModal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === paymentModal) {
    paymentModal.style.display = "none";
  }
});
