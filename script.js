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

// ===== VIBE CHECK: Real-Time Capacity Meter =====
function initCapacityMeter() {
  const capacityFill = document.getElementById('capacityFill');
  const capacityPercent = document.getElementById('capacityPercent');
  const capacityStatus = document.getElementById('capacityStatus');
  const memberCount = document.getElementById('memberCount');

  // Simulate real-time capacity (normally would come from a server)
  function updateCapacity() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    // Historical occupancy pattern (0-100%)
    let baseOccupancy = 30; // minimum
    
    if (timeInMinutes >= 360 && timeInMinutes < 480) baseOccupancy = 25; // 6-8 AM quiet
    else if (timeInMinutes >= 480 && timeInMinutes < 720) baseOccupancy = 45; // 8 AM-12 PM
    else if (timeInMinutes >= 720 && timeInMinutes < 900) baseOccupancy = 50; // 12 PM-3 PM
    else if (timeInMinutes >= 900 && timeInMinutes < 1080) baseOccupancy = 65; // 3-6 PM
    else if (timeInMinutes >= 1080 && timeInMinutes < 1200) baseOccupancy = 95; // 6-8 PM peak
    else if (timeInMinutes >= 1200 && timeInMinutes < 1320) baseOccupancy = 70; // 8-10 PM
    else baseOccupancy = 15; // late night/early morning

    // Add small random fluctuation
    const occupancy = Math.max(10, Math.min(100, baseOccupancy + (Math.random() - 0.5) * 10));
    const members = Math.round(occupancy * 1.5); // assume ~150 max capacity

    // Update UI
    capacityFill.style.width = occupancy + '%';
    capacityPercent.textContent = Math.round(occupancy);
    memberCount.textContent = `~${members} members`;

    // Update status message
    let status = '';
    if (occupancy < 30) {
      status = '✅ Very quiet • Perfect for beginners';
    } else if (occupancy < 50) {
      status = '😌 Moderate crowd • Good time to visit';
    } else if (occupancy < 75) {
      status = '⚡ Getting busy • Expect wait for equipment';
    } else {
      status = '⚠️ Peak hours • Very crowded • Come back later';
    }
    capacityStatus.textContent = status;
  }

  // Update every 30 seconds
  updateCapacity();
  setInterval(updateCapacity, 30000);
}

// ===== VIBE CHECK: Quiet Hours Heatmap =====
function initHeatmap() {
  const heatmapGrid = document.getElementById('heatmapGrid');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    { label: '6-8 AM', occupancy: 20 },
    { label: '8-10 AM', occupancy: 35 },
    { label: '10-12 PM', occupancy: 40 },
    { label: '12-2 PM', occupancy: 55 },
    { label: '2-4 PM', occupancy: 45 },
    { label: '4-6 PM', occupancy: 65 },
    { label: '6-8 PM', occupancy: 95 },
    { label: '8-10 PM', occupancy: 70 }
  ];

  // Different patterns for each day
  const dayPatterns = {
    Monday: [18, 32, 38, 52, 42, 62, 92, 68],
    Tuesday: [20, 35, 40, 55, 45, 65, 95, 70],
    Wednesday: [19, 33, 39, 53, 43, 63, 93, 69],
    Thursday: [22, 36, 41, 56, 46, 66, 96, 72],
    Friday: [25, 38, 43, 58, 48, 68, 98, 75],
    Saturday: [45, 55, 60, 70, 65, 80, 85, 65],
    Sunday: [40, 50, 55, 65, 60, 75, 80, 60]
  };

  // Clear existing grid
  heatmapGrid.innerHTML = '';

  // Create heatmap
  days.forEach((day, dayIndex) => {
    const dayColDiv = document.createElement('div');
    dayColDiv.className = 'heatmap-day';

    // Day label
    const dayLabel = document.createElement('div');
    dayLabel.className = 'heatmap-day-label';
    dayLabel.textContent = day.slice(0, 3);
    dayColDiv.appendChild(dayLabel);

    // Time slots for this day
    const occupancies = dayPatterns[day];
    occupancies.forEach((occupancy, slotIndex) => {
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.title = `${day} ${timeSlots[slotIndex].label}: ${occupancy}% occupied`;

      // Color based on occupancy
      const color = getHeatColor(occupancy);
      cell.style.backgroundColor = color;

      cell.addEventListener('mouseenter', () => {
        cell.style.boxShadow = `0 0 16px ${color}`;
      });

      dayColDiv.appendChild(cell);
    });

    heatmapGrid.appendChild(dayColDiv);
  });
}

function getHeatColor(occupancy) {
  // Return color based on occupancy percentage
  if (occupancy < 25) return '#1a3a1a'; // Very quiet - dark green
  if (occupancy < 45) return '#2d5a2d'; // Quiet - medium green
  if (occupancy < 65) return '#f5c518'; // Moderate - yellow
  if (occupancy < 85) return '#d4a017'; // Busy - dark yellow
  return '#a67016'; // Very busy - brown
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initCapacityMeter();
  initHeatmap();
});
