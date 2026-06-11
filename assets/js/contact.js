const form = document.getElementById("contactForm");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const emailMsg = document.getElementById("emailMsg");
const phoneMsg = document.getElementById("phoneMsg");
const submitBtn = document.getElementById("submitBtn");

let emailOk = false;
let phoneOk = false;
let timer;

submitBtn.disabled = true;

// debounce
function debounce(fn, delay = 500) {
  clearTimeout(timer);
  timer = setTimeout(fn, delay);
}

// ==========================
// 🔍 DUPLICATE CHECK
// ==========================
async function checkDuplicate() {
  try {
    const e = email.value.trim().toLowerCase();
    const p = phone.value.replace(/\D/g, "").slice(-10);

    if (!e && !p) return;

    const res = await fetch("/.netlify/functions/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e,
        phone: p,
        checkOnly: true,
      }),
    });

    const data = await res.json();

    // email
    if (data.emailExists) {
      emailMsg.innerText = "Email already exists";
      emailMsg.style.color = "red";
      emailOk = false;
    } else {
      emailMsg.innerText = "Email available";
      emailMsg.style.color = "green";
      emailOk = true;
    }

    // phone
    if (p.length === 10) {
      if (data.phoneExists) {
        phoneMsg.innerText = "Phone already exists";
        phoneMsg.style.color = "red";
        phoneOk = false;
      } else {
        phoneMsg.innerText = "Phone available";
        phoneMsg.style.color = "green";
        phoneOk = true;
      }
    } else {
      phoneOk = false;
    }

    submitBtn.disabled = !(emailOk && phoneOk);

  } catch (err) {
    console.error("Duplicate check failed", err);
  }
}

email.addEventListener("input", () => debounce(checkDuplicate));
phone.addEventListener("input", () => debounce(checkDuplicate));

// ==========================
// 🚀 SUBMIT
// ==========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!emailOk || !phoneOk) {
    alert("Fix duplicate fields first");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  try {
    const payload = {
      fullName: document.getElementById("name").value,
      email: email.value,
      phone: phone.value,
      course: document.getElementById("course").value,
      message: document.getElementById("message").value,
    };

    const res = await fetch("/.netlify/functions/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.status === 409) {
      alert(result.message);
    } else if (res.ok) {
      alert("Saved successfully ✅");

      form.reset();
      emailMsg.innerText = "";
      phoneMsg.innerText = "";

      emailOk = false;
      phoneOk = false;
    } else {
      alert(result.message || "Error");
    }

  } catch (err) {
    alert("Network error. Try again.");
  }

  submitBtn.disabled = true;
  submitBtn.innerText = "Submit";
});