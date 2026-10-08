
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const open = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => observer.observe(el));
    } else {
        reveals.forEach(el => el.classList.add("visible"));
    }

    document.querySelectorAll(".progress-bar").forEach(bar => {
        const value = bar.dataset.progress || "0";
        setTimeout(() => {
            bar.style.width = value + "%";
        }, 250);
    });

    const header = document.querySelector(".site-header");
    const updateHeader = () => {
        if (header) header.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", updateHeader);
    updateHeader();

    const form = document.getElementById("contactForm");
    if (form) {
        const success = document.getElementById("formSuccess");
        const error = document.getElementById("formError");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            success.hidden = true;
            error.hidden = true;

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !message) {
                error.textContent = "Please fill in all fields.";
                error.hidden = false;
                return;
            }

            const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!emailOK) {
                error.textContent = "Please enter a valid email address.";
                error.hidden = false;
                return;
            }

            if (name.length > 100 || email.length > 150 || message.length > 2000) {
                error.textContent = "One or more fields are too long.";
                error.hidden = false;
                return;
            }

            form.reset();
            success.hidden = false;
            success.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }
});
