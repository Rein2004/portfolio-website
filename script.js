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
   AUTOMATIC STATS (counted from project.html)
   - Projects  = every .build-card and .project-card on project.html
   - Platforms = every .platform-section on project.html
   Add a project card or a platform section there and the
   numbers on the home page update by themselves.
   The numbers written in index.html are only a fallback
   (shown if project.html can't be loaded).
===================================================== */

function animateCount(el, target) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
        el.textContent = target;
        return;
    }
    const start = performance.now();
    const duration = 2200;
    function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        // fast at first, then slows down as it lands on the exact number
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = Math.round(target * eased);
        if (t < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target;
        }
    }
    requestAnimationFrame(tick);
}

async function loadAutoStats() {
    const targets = document.querySelectorAll("[data-stat]");
    if (!targets.length) return;

    // Start every number at 0 so the count visibly runs up to the real value
    const fallbacks = new Map();
    targets.forEach((el) => {
        fallbacks.set(el, el.textContent);
        el.textContent = "0";
    });

    const restoreFallbacks = () => {
        targets.forEach((el) => { el.textContent = fallbacks.get(el); });
    };

    try {
        const res = await fetch("project.html", { cache: "no-cache" });
        if (!res.ok) { restoreFallbacks(); return; }

        const doc = new DOMParser().parseFromString(await res.text(), "text/html");

        const stats = {
            projects: doc.querySelectorAll(".build-card, .project-card").length,
            platforms: doc.querySelectorAll(".platform-section").length
        };

        // Count up when each number scrolls into view (once)
        const statObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                obs.unobserve(el);
                const value = stats[el.dataset.stat];
                if (value > 0) {
                    animateCount(el, value);
                } else {
                    el.textContent = fallbacks.get(el);
                }
            });
        }, { threshold: 0.6 });

        targets.forEach((el) => statObserver.observe(el));
    } catch (err) {
        // Keep the fallback numbers written in index.html
        restoreFallbacks();
    }
}

loadAutoStats();


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


/* =====================================================
   "WATCH IT WORK" PREVIEWS
   Each card shows its screenshot, then plays a muted
   loop of the demo video while it is on screen.
   Skipped for reduced-motion and data-saver visitors.
===================================================== */

(function () {
    const vids = document.querySelectorAll(".demo-media video");
    if (!vids.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection && navigator.connection.saveData;
    if (reduce || saveData) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const v = entry.target;
            if (entry.isIntersecting) {
                if (!v.getAttribute("src")) v.src = v.dataset.src;
                const p = v.play();
                if (p && p.then) {
                    p.then(() => v.classList.add("is-playing")).catch(() => {});
                }
            } else {
                v.pause();
            }
        });
    }, { threshold: 0.5 });

    vids.forEach((v) => {
        v.muted = true;
        // if the file is missing, the screenshot simply stays visible
        v.addEventListener("error", () => v.classList.remove("is-playing"));
        io.observe(v);
    });
})();