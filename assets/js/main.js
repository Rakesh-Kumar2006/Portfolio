// ===============================
// FETCH SITE DATA
// ===============================

fetch("assets/data/site.json")
  .then((response) => response.json())

  .then((data) => {

    // ===============================
    // HERO SECTION
    // ===============================

    document.getElementById("heroName").innerText =
      data.name;

    document.getElementById("heroDesc").innerText =
      data.description;

    // ===============================
    // TYPING EFFECT
    // ===============================

    startTypingEffect(data.typingTexts);

    // ===============================
    // CONTACT SECTION
    // ===============================

    document.getElementById("contactEmail").innerHTML =
      `
      <i class="bi bi-envelope-fill"></i>
      ${data.contact.email}
      `;

      document.getElementById("contactlocation").innerHTML =
  `
  <i class="bi bi-geo-alt-fill"></i>
  ${data.contact.location}
  `;

    // ===============================
    // SOCIAL LINKS
    // ===============================

    const socialIcons =
      document.querySelector(".social-icons");

    socialIcons.innerHTML = `

      <a
        href="${data.socialLinks.github}"
        target="_blank"
      >
        <i class="bi bi-github"></i>
      </a>

      <a
        href="${data.socialLinks.linkedin}"
        target="_blank"
      >
        <i class="bi bi-linkedin"></i>
      </a>

      <a
        href="${data.socialLinks.instagram}"
        target="_blank"
      >
        <i class="bi bi-instagram"></i>
      </a>

    `;

    // ===============================
    // LOAD DATA
    // ===============================

    loadExpertise(data.expertise);

    loadSkills(data.skills);

    loadProjects(data.projects);

  })

  .catch((error) => {

    console.log(
      "JSON Fetch Error:",
      error
    );

  });

// ===============================
// LOAD EXPERTISE
// ===============================

function loadExpertise(expertise) {

  let output = "";

  expertise.forEach((item, index) => {

    output += `

      <div
        class="col-md-6 col-lg-4"
        data-aos="fade-up"
        data-aos-delay="${index * 100}"
      >

        <div class="glass-card text-center h-100">

          <i
            class="bi ${item.icon} skill-icon"
          ></i>

          <h4>${item.title}</h4>

          <p>${item.description}</p>

        </div>

      </div>

    `;

  });

  document.getElementById(
    "expertiseContainer"
  ).innerHTML = output;

}

// ===============================
// LOAD SKILLS
// ===============================

function loadSkills(skills) {

  let output = "";

  skills.forEach((skill, index) => {

    output += `

      <div
        class="mb-4"
        data-aos="fade-up"
        data-aos-delay="${index * 100}"
      >

        <div
          class="d-flex justify-content-between mb-2"
        >

          <h5>${skill.name}</h5>

          <span>${skill.percentage}%</span>

        </div>

        <div class="progress custom-progress">

          <div
            class="progress-bar custom-progress-bar"
            style="width: ${skill.percentage}%"
          ></div>

        </div>

      </div>

    `;

  });

  document.getElementById(
    "skillsContainer"
  ).innerHTML = output;

}

// ===============================
// LOAD PROJECTS
// ===============================

function loadProjects(projects) {

  let output = "";

  projects.forEach((project, index) => {

    output += `

      <div
        class="col-md-6 col-lg-4"
        data-aos="zoom-in"
        data-aos-delay="${index * 100}"
      >

        <div class="glass-card h-100">

          <img
            src="${project.image}"
            class="img-fluid w-100"
            alt="${project.title}"
          >

          <div class="mt-4">

            <h4>${project.title}</h4>

            <a
              href="${project.link}"
              target="_blank"
              class="btn btn-primary custom-btn mt-3"
            >
              View Project
            </a>

          </div>

        </div>

      </div>

    `;

  });

  document.getElementById(
    "projectContainer"
  ).innerHTML = output;

}

// ===============================
// TYPING EFFECT
// ===============================

function startTypingEffect(words) {

  let i = 0;

  let j = 0;

  let currentWord = "";

  let isDeleting = false;

  function type() {

    currentWord = words[i];

    if (isDeleting) {

      j--;

    } else {

      j++;

    }

    document.getElementById(
      "typing"
    ).innerHTML =
      currentWord.substring(0, j);

    if (
      !isDeleting &&
      j === currentWord.length
    ) {

      isDeleting = true;

      setTimeout(type, 1000);

      return;

    }

    if (
      isDeleting &&
      j === 0
    ) {

      isDeleting = false;

      i++;

      if (i === words.length) {

        i = 0;

      }

    }

    setTimeout(
      type,
      isDeleting ? 60 : 120
    );

  }

  type();

}

// ===============================
// ACTIVE NAVBAR LINK
// ===============================

const sections =
  document.querySelectorAll("section");

const navLinks =
  document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 150;

    const sectionHeight =
      section.clientHeight;

    if (
      pageYOffset >= sectionTop
      &&
      pageYOffset <
      sectionTop + sectionHeight
    ) {

      current =
        section.getAttribute("id");

    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (
      link.getAttribute("href")
      === `#${current}`
    ) {

      link.classList.add("active");

    }

  });

});

// ===============================
// NAVBAR BACKGROUND
// ===============================

window.addEventListener("scroll", () => {

  const navbar =
    document.querySelector(".custom-nav");

  if (window.scrollY > 50) {

    navbar.style.background =
      "rgba(15, 23, 42, 0.9)";

    navbar.style.backdropFilter =
      "blur(15px)";

  } else {

    navbar.style.background =
      "rgba(255,255,255,0.08)";

  }

});

// ===============================
// SCROLL PROGRESS BAR
// ===============================

window.addEventListener("scroll", () => {

  let scrollTop =
    document.documentElement.scrollTop;

  let scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  let progress =
    (scrollTop / scrollHeight) * 100;

  document.getElementById(
    "progressBar"
  ).style.width =
    progress + "%";

});

// ===============================
// DARK / LIGHT MODE
// ===============================

const toggleBtn =
  document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {

  document.body.classList.toggle(
    "light-mode"
  );

  localStorage.setItem(

    "theme",

    document.body.classList.contains(
      "light-mode"
    )
      ? "light"
      : "dark"

  );

});

// Load Saved Theme

window.onload = () => {

  let theme =
    localStorage.getItem("theme");

  if (theme === "light") {

    document.body.classList.add(
      "light-mode"
    );

  }

};

// ===============================
// SCROLL TO TOP BUTTON
// ===============================

const scrollBtn =
  document.createElement("button");

scrollBtn.innerHTML =
  '<i class="bi bi-arrow-up"></i>';

scrollBtn.classList.add(
  "scroll-top-btn"
);

document.body.appendChild(scrollBtn);

// Button Styling

scrollBtn.style.position = "fixed";
scrollBtn.style.right = "20px";
scrollBtn.style.bottom = "20px";
scrollBtn.style.width = "50px";
scrollBtn.style.height = "50px";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.border = "none";
scrollBtn.style.background = "#38bdf8";
scrollBtn.style.color = "#fff";
scrollBtn.style.fontSize = "20px";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";
scrollBtn.style.zIndex = "999";

// Show Button

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {

    scrollBtn.style.display =
      "block";

  } else {

    scrollBtn.style.display =
      "none";

  }

});

// Scroll To Top

scrollBtn.addEventListener("click", () => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

});

// ===============================
// MOBILE NAVBAR AUTO CLOSE
// ===============================

const navItems =
  document.querySelectorAll(".nav-link");

const navbarCollapse =
  document.querySelector(
    ".navbar-collapse"
  );

navItems.forEach((item) => {

  item.addEventListener("click", () => {

    if (
      navbarCollapse.classList.contains(
        "show"
      )
    ) {

      new bootstrap.Collapse(
        navbarCollapse
      ).hide();

    }

  });

});