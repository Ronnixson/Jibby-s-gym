 // MOBILE MENU
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// SCROLL REVEAL
function reveal() {
document.querySelectorAll(".reveal").forEach(el=>{
 if(el.getBoundingClientRect().top < window.innerHeight-80){
   el.classList.add("active");
 }
});
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// WHATSAPP BUTTON (UGANDA NUMBER)
document.getElementById("whatsappBtn").onclick = () => {

const phone = "2567XXXXXXXX";   // ← PUT YOUR NUMBER HERE

const text =
`Hello Jibby's Gym!
I would like to join the gym.
Please share membership details.`;

window.open(
`https://wa.me/${phone}?text=${encodeURIComponent(text)}`
);
};

// BMI CALCULATOR
function calculateBMI(){
const w = document.getElementById("weight").value;
const h = document.getElementById("height").value/100;

if(!w || !h) return;

const bmi = (w/(h*h)).toFixed(1);

let msg="";

if(bmi<18.5) msg="Underweight";
else if(bmi<25) msg="Normal weight";
else if(bmi<30) msg="Overweight";
else msg="Obese";

document.getElementById("bmiResult").innerHTML =
`Your BMI: <b>${bmi}</b> (${msg})`;
}

// EMAILJS CONTACT FORM
document.getElementById("contactForm")
.addEventListener("submit", function(e){

e.preventDefault();

emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
name: name.value,
email: email.value,
message: message.value
})
.then(()=>{
status.innerHTML="✅ Message Sent!";
this.reset();
})
.catch(()=>{
status.innerHTML="❌ Failed to send";
});
});
