/* =====================================================
   TYPING EFFECT (hero role text)
===================================================== */

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
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

if (typingElement) {
    typeEffect();
}


/* =====================================================
   SCROLL-TRIGGERED SECTION / CARD REVEAL
===================================================== */

const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
    });
}, { threshold: 0.2 });

sections.forEach((section) => sectionObserver.observe(section));

const cards = document.querySelectorAll(".card");

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

cards.forEach((card, index) => {
    const isExcluded =
        card.closest("#tech") ||
        card.closest("#why-me") ||
        card.closest("#contact");

    if (!isExcluded) {
        card.style.transitionDelay = `${index * 0.1}s`;
        cardObserver.observe(card);
    }
});


/* =====================================================
   ACTIVE NAV LINK ON SCROLL
===================================================== */

const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        // Normal in-page sections
        if (href === "#" + current) {
            link.classList.add("active");
        }

        // Projects section links to project.html rather than an anchor
        if (current === "projects" && href === "project.html") {
            link.classList.add("active");
        }
    });
});


/* =====================================================
   CURSOR GLOW EFFECT
===================================================== */

const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});


/* =====================================================
   CONTACT FORM SUCCESS MESSAGE
   (shown after formsubmit.co redirects back with ?sent=true)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.search.includes("sent=true")) {
        const successBox = document.getElementById("success-box");

        if (successBox) {
            successBox.classList.add("show");
            setTimeout(() => successBox.classList.remove("show"), 3000);
        }
    }
});


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("open");
        navMenu.classList.toggle("open");
    });

    // Close the menu after a link is clicked
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("open");
            navMenu.classList.remove("open");
        });
    });
}