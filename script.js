console.log("Portfolio JavaScript loaded");

const projects = [
    {
        title: "Personal Portfolio",
        description: "A responsive portfolio page built with semantic HTML, custom CSS, and JavaScript interactions."
    },
    {
        title: "Contact Form Validation",
        description: "A contact form that checks user input in real time and shows clear error messages before submission."
    },
    {
        title: "Interactive UI Features",
        description: "Dark mode, show/hide content, filters, and dynamic project content controlled through DOM manipulation."
    }
];

const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    const themeToggle = select(".theme-toggle");
    themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");

    localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
}

function setupThemeToggle() {
    const savedTheme = localStorage.getItem("portfolioTheme");
    setTheme(savedTheme === "dark");

    select(".theme-toggle").addEventListener("click", () => {
        setTheme(!document.body.classList.contains("dark-mode"));
    });
}

function setupAboutToggle() {
    const button = select("#aboutToggle");
    const detail = select("#extraDetail");
    const photo = select(".profile-photo");
    const hint = select("#photoHint");

    button.addEventListener("click", () => {
        const isHidden = detail.classList.toggle("hidden");
        button.textContent = isHidden ? "Show More" : "Show Less";
    });

    photo.addEventListener("mouseenter", () => {
        photo.classList.add("highlight");
        hint.textContent = "Web development learner focused on HTML, CSS, and JavaScript.";
    });

    photo.addEventListener("mouseleave", () => {
        photo.classList.remove("highlight");
        hint.textContent = "Hover over the photo for a quick profile highlight.";
    });
}

function setupSkillFilters() {
    const filterButtons = selectAll(".skill-filter");
    const skillItems = selectAll("#skillList li");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            filterButtons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            skillItems.forEach((skill) => {
                const shouldShow = category === "all" || skill.dataset.category === category;
                skill.classList.toggle("hidden", !shouldShow);
            });
        });
    });
}

function renderProject(index) {
    select("#projectTitle").textContent = projects[index].title;
    select("#projectDescription").textContent = projects[index].description;
    select("#projectCount").textContent = `Project ${index + 1} of ${projects.length}`;
}

function setupProjectSlider() {
    let currentProject = 0;

    renderProject(currentProject);

    select("#previousProject").addEventListener("click", () => {
        currentProject = (currentProject - 1 + projects.length) % projects.length;
        renderProject(currentProject);
    });

    select("#nextProject").addEventListener("click", () => {
        currentProject = (currentProject + 1) % projects.length;
        renderProject(currentProject);
    });
}

function showError(input, message) {
    const errorElement = select(`#${input.id}Error`);
    errorElement.textContent = message;
    input.classList.toggle("invalid", Boolean(message));
}

function validateName() {
    const name = select("#name");
    const value = name.value.trim();

    if (value.length < 2) {
        showError(name, "Please enter at least 2 characters.");
        return false;
    }

    showError(name, "");
    return true;
}

function validateEmail() {
    const email = select("#email");
    const value = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
        showError(email, "Please enter a valid email address.");
        return false;
    }

    showError(email, "");
    return true;
}

function validateMessage() {
    const message = select("#message");
    const value = message.value.trim();

    if (value.length < 10) {
        showError(message, "Message must be at least 10 characters long.");
        return false;
    }

    showError(message, "");
    return true;
}

function setupFormValidation() {
    const form = select("#contactForm");
    const status = select("#formStatus");

    select("#name").addEventListener("input", validateName);
    select("#email").addEventListener("input", validateEmail);
    select("#message").addEventListener("input", validateMessage);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const validationResults = [validateName(), validateEmail(), validateMessage()];
        const isValid = validationResults.every(Boolean);

        if (!isValid) {
            status.textContent = "Please fix the highlighted fields.";
            return;
        }

        status.textContent = "Thank you! Your message is ready to send.";
        form.reset();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupThemeToggle();
    setupAboutToggle();
    setupSkillFilters();
    setupProjectSlider();
    setupFormValidation();
});
