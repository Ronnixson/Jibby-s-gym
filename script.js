// Mobile menu and aria toggle
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("show");
});

// Scroll reveal
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add("active");
  });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// WhatsApp button
document.getElementById("whatsappBtn").addEventListener("click", () => {
  const phone = "256741503271";
  const text = `Hello Jibby's Gym! I would like to join the gym. Please share membership details.`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
});

// BMI Calculator
function calculateBMI(){
  const w = parseFloat(document.getElementById("weight").value);
  const hVal = parseFloat(document.getElementById("height").value);
  if (!w || !hVal) return;
  const h = hVal / 100;
  const bmi = (w / (h * h)).toFixed(1);
  let msg = "";
  if (bmi < 18.5) msg = "Underweight";
  else if (bmi < 25) msg = "Normal weight";
  else if (bmi < 30) msg = "Overweight";
  else msg = "Obese";
  document.getElementById("bmiResult").innerHTML = `Your BMI: <b>${bmi}</b> (${msg})`;
}

// Lightbox gallery
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach(btn => btn.addEventListener('click', () => {
  const src = btn.getAttribute('data-src');
  lightboxImg.src = src;
  lightboxImg.alt = btn.querySelector('img').alt || 'Gallery image';
  lightbox.setAttribute('aria-hidden', 'false');
}));

lightboxClose.addEventListener('click', () => {
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightboxClose.click();
  }
});

// EmailJS contact form (keep same IDs)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  emailjs.send('GMAIL','XT.ITPATH@GMAIL.COM',{name,email,message})
  .then(()=>{document.getElementById('status').innerHTML='✅ Message Sent!'; contactForm.reset();})
  .catch(()=>{document.getElementById('status').innerHTML='❌ Failed to send';});
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
