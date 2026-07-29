const roles = [
    "Tech Virtual Assistant",
    "AI Automation Specialist",
    "CRM Manager",
    "Workflow Architect",
    "Business Systems Builder"
];

const typingElement = document.getElementById("typing");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typingElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

if (typingElement) {
    typeEffect();
}

const uploadInput =
document.getElementById("profileUpload");

const profilePreview =
document.getElementById("profilePreview");

if (uploadInput && profilePreview) {

    uploadInput.addEventListener("change", function(){

        const file = this.files[0];

        if(file){

            const reader = new FileReader();

            reader.onload = function(e){
                profilePreview.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }

    });

}

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.classList?.remove;
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }

    });

}, {
    threshold: 0.2
});

sections.forEach((section) => {
    observer.observe(section);
});
const navLinks =
document.querySelectorAll("nav a");

window.addEventListener("scroll", ()=>{

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 200;

        if(scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            === "#" + current
        ){
            link.classList.add("active");
        }

    });

});
const cards = document.querySelectorAll(".card");

const cardObserver =
new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");
        }

    });

},{
    threshold:0.15
});

const glow =
document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});
cards.forEach((card,index)=>{

    if(
        !card.closest("#tech") &&
        !card.closest("#why-me") &&
        !card.closest("#contact")
    ){
        card.style.transitionDelay =
        `${index * 0.1}s`;

        cardObserver.observe(card);
    }
});
;
document.addEventListener("DOMContentLoaded", () => {

    if (window.location.search.includes("sent=true")) {

        const successBox =
        document.getElementById("success-box");

        if (successBox) {

            successBox.classList.add("show");

            setTimeout(() => {
                successBox.classList.remove("show");
            }, 3000);

        }

    }

});