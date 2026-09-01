const roles = [
    "GoHighLevel Specialist",
    "Funnel & Pipeline Builder",
    "CRM & Automation Specialist",
    "AI Workflow Automation Specialist",
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
document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        /* Normal sections */
        if (href === "#" + current) {
            link.classList.add("active");
        }

        /* Projects section on about.html */
        if (
            current === "projects" &&
            href === "project.html"
        ) {
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
/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle =
    document.querySelector(".menu-toggle");

const navMenu =
    document.querySelector(".nav-menu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("open");

        navMenu.classList.toggle("open");

    });


    /* Close menu after clicking */

    document.querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("open");

                navMenu.classList.remove("open");

            });

        });

}
/* =====================================================
   GLOBAL 3D MOUSE TILT
===================================================== */

tiltElements.forEach(element => {

    element.addEventListener("mousemove", (e) => {

        const rect = element.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateY =
            ((x - centerX) / centerX) * 4;

        const rotateX =
            ((centerY - y) / centerY) * 4;


        element.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(8px)
        `;

    });


    element.addEventListener("mouseleave", () => {

        element.style.transform = "";

    });

});
/* =====================================================
LIGHTWEIGHT 3D BACKGROUND PARALLAX
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const background =
        document.querySelector(".three-d-background");

    if (!background) return;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", (event) => {

        mouseX =
            (event.clientX / window.innerWidth - 0.5);

        mouseY =
            (event.clientY / window.innerHeight - 0.5);

    }, { passive: true });

    function animate3D() {

        currentX +=
            (mouseX - currentX) * 0.025;

        currentY +=
            (mouseY - currentY) * 0.025;

        const rotateX =
            currentY * -2;

        const rotateY =
            currentX * 2;

        background.style.transform =
            `rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

        requestAnimationFrame(animate3D);
    }

    animate3D();

});
element.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateZ(8px)
`;z