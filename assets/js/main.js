// ===============================
// FETCH SITE DATA
// ===============================
let contactEmailAddress = "mahtorakeshkumar926@gmail.com";

fetch("assets/data/site.json")
  .then((response) => response.json())
  .then((data) => {
    // Brand & Hero
    if (data.shortName) document.getElementById("brandName").innerText = data.shortName;
    if (data.availability) document.getElementById("availabilityText").innerText = data.availability;
    document.getElementById("heroDesc").innerText = data.description;

    // Contact Details
    contactEmailAddress = data.contact.email;
    document.getElementById("contactEmail").innerHTML = `<i class="bi bi-envelope"></i> <span>${data.contact.email}</span>`;
    document.getElementById("contactPhone").innerHTML = `<i class="bi bi-telephone"></i> <span>${data.contact.phone}</span>`;
    document.getElementById("contactlocation").innerHTML = `<i class="bi bi-geo-alt"></i> <span>${data.contact.location}</span>`;

    if (data.socialLinks?.github) {
      document.getElementById("githubHeaderLink").href = data.socialLinks.github;
    }
    if (data.socialLinks?.resume) {
      document.getElementById("resumeBtn").href = data.socialLinks.resume;
    }

    // Load Sections
    loadExpertise(data.expertise);
    loadSkills(data.skills);
    loadTools(data.tools);
    loadProjects(data.projects);
  })
  .catch((error) => {
    console.error("JSON Fetch Error:", error);
  });

// ===============================
// LOAD EXPERTISE
// ===============================
function loadExpertise(expertise) {
  let output = "";

  expertise.forEach((item, index) => {
    const num = String(index + 1).padStart(2, "0");
    output += `
      <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="surface-card">
          <div class="expertise-top">
            <div class="expertise-icon-box">
              <i class="bi ${item.icon}"></i>
            </div>
            <span class="card-index">${num}</span>
          </div>
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      </div>
    `;
  });

  document.getElementById("expertiseContainer").innerHTML = output;
}

// ===============================
// LOAD SKILLS
// ===============================
function loadSkills(skills) {
  const categoryTitles = {
    frontend: "Frontend",
    frameworks: "Frameworks & Libraries",
    backend: "Backend",
    database: "Database"
  };

  let output = "";

  Object.keys(skills).forEach((category, index) => {
    const title = categoryTitles[category] || category;
    output += `
      <div class="skill-group-card" data-aos="fade-up" data-aos-delay="${index * 80}">
        <h3 class="skill-group-title">${title}</h3>
        <div class="skill-tags">
          ${skills[category].map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
        </div>
      </div>
    `;
  });

  document.getElementById("skillsContainer").innerHTML = output;
}

// ===============================
// LOAD TOOLS
// ===============================
function loadTools(tools) {
  if (!tools) return;

  let totalTools = 0;
  let output = "";

  tools.forEach((group, index) => {
    totalTools += group.items.length;

    const itemsHtml = group.items
      .map(
        (tool) => `
        <div class="tool-item-row">
          <span class="tool-badge">
            <img
              src="${tool.logo}"
              alt="${tool.name} logo"
              class="tool-logo ${tool.invertDark ? "invert-on-dark" : ""}"
              loading="lazy"
            >
          </span>
          <span class="tool-name">${tool.name}</span>
        </div>
      `
      )
      .join("");

    output += `
      <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="surface-card">
          <h4 class="mb-4">${group.category}</h4>
          <div>${itemsHtml}</div>
        </div>
      </div>
    `;
  });

  document.getElementById("toolsCount").innerText = totalTools;
  document.getElementById("toolsContainer").innerHTML = output;
}

// ===============================
// LOAD PROJECTS
// ===============================
function loadProjects(projects) {
  let output = "";

  projects.forEach((project, index) => {
    const num = String(index + 1).padStart(2, "0");
    const tagsHtml = (project.tags || [])
      .map((tag) => `<span class="project-tag">${tag}</span>`)
      .join("");

    output += `
      <div class="project-row-card" data-aos="fade-up" data-aos-delay="${index * 80}">
        <div class="row g-0 align-items-stretch">
          <div class="col-lg-6">
            <div class="project-media-wrap">
              <span class="project-index-badge">${num}</span>
              <img
                src="${project.image}"
                alt="${project.title}"
                onerror="this.onerror=null; this.src='https://placehold.co/800x520/13141c/8b7cf6?text=${encodeURIComponent(project.title)}';"
              >
            </div>
          </div>
          <div class="col-lg-6">
            <div class="project-content">
              <span class="project-category">${project.category || "WEB PROJECT"}</span>
              <h3 class="project-title">${project.title}</h3>
              <p class="project-desc">${project.description || ""}</p>
              <div class="project-tags">${tagsHtml}</div>
              <div class="d-flex flex-wrap gap-2">
                <a href="${project.link}" target="_blank" class="btn-project-github">
                  <i class="bi bi-github"></i> GitHub
                </a>
                ${
                  project.live
                    ? `<a href="${project.live}" target="_blank" class="btn-project-live">
                        Live website <i class="bi bi-box-arrow-up-right"></i>
                      </a>`
                    : ""
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("projectContainer").innerHTML = output;
}

// ===============================
// ACTIVE NAVBAR LINK & PROGRESS BAR
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  // Progress bar
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;
});

// ===============================
// DARK / LIGHT MODE
// ===============================
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function updateThemeIcon() {
  if (document.body.classList.contains("light-mode")) {
    themeIcon.className = "bi bi-moon-stars";
  } else {
    themeIcon.className = "bi bi-sun";
  }
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
  updateThemeIcon();
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}
updateThemeIcon();

// ===============================
// SCROLL TO TOP BUTTON
// ===============================
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
scrollBtn.classList.add("scroll-top-btn");
scrollBtn.setAttribute("aria-label", "Scroll to top");
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 350 ? "flex" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===============================
// MOBILE NAVBAR AUTO CLOSE
// ===============================
const navbarCollapse = document.querySelector(".navbar-collapse");
navLinks.forEach((item) => {
  item.addEventListener("click", () => {
    if (navbarCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

// ===============================
// EMAIL BUTTON (FIXED ADDRESS)
// ===============================
document.getElementById("emailBtn").addEventListener("click", function (e) {
  e.preventDefault();
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = `mailto:${contactEmailAddress}?subject=Portfolio%20Inquiry&body=Hello%20Rakesh,%0A%0AI%20want%20to%20connect%20with%20you.`;
  } else {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmailAddress)}&su=Portfolio%20Inquiry&body=Hello%20Rakesh,%0A%0AI%20want%20to%20connect%20with%20you.`,
      "_blank"
    );
  }
});

// ===============================
// LOADER
// ===============================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 450);
});