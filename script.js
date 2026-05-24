const cursor = document.querySelector("#cursor");
const cursorFollower = document.querySelector("#cursorFollower");
const nav = document.querySelector("#nav");
const reveal = document.querySelectorAll(".reveal");
const menuBtn = document.querySelector("#menuBtn");
const mobileMenu = document.querySelector("#mobileMenu");
const skillsGrid = document.querySelector("#skillsGrid");
const projectsList = document.querySelector("#projectsList");
const counterNum = document.querySelectorAll(".counter-num");

const skills = [
  {
    icon: "🎨",
    name: "UI/UX Design",
    desc: "Creating intuitive and beautiful interfaces",
    tags: [
      "Figma",
      "Prototyping",
      "Wireframing",
      "Photoshop",
      "Adobe XD",
      "Illustrator",
    ],
  },
  {
    icon: "💻",
    name: "Frontend Development",
    desc: "Building fast and responsive web interfaces",
    tags: ["HTML", "CSS", "JavaScript", "Typescript", "Angular", "Git"],
  },
  {
    icon: "✦",
    name: "Design Systems",
    desc: "Creating consistent and scalable visual languages",
    tags: ["Typography", "Color Theory", "Components", "Accessibility"],
  },
];

const projects = [
  {
    num: "01",
    name: "FX Dashboard",
    desc: "Currency exchange dashboard with live rates and historical charts",
    tags: ["JavaScript", "Chart.js", "API"],
    link: "https://github.com/alexanderStamenkov/fx-dashboard",
  },
  {
    num: "02",
    name: "Post Component",
    desc: "Social feed component with likes, comments and localStorage persistence",
    tags: ["JavaScript", "CSS", "localStorage"],
    link: "https://github.com/alexanderStamenkov",
  },
  {
    num: "03",
    name: "Github profile search",
    desc: "Search for profiles in Github and check their public repos",
    tags: ["JavaScript", "API"],
    link: "https://github.com/alexanderStamenkov/github-profile-searcher",
  },
  {
    num: "04",
    name: "Dance Lessons Booking",
    desc: "Modern web platform for booking dance lessons with an intuitive scheduling system and seamless user experience",
    tags: ["REST API", "Booking System", "Mobile Responsive"],
    link: "https://magi.oblaka.win/",
  },
  {
    num: "05",
    name: "CineMix",
    desc: "A fast and minimal movie search app powered by the OMDb API. Search any title and instantly browse results with posters, release years, and content type badges.",
    tags: ["JS", "Vite", "REST API"],
    link: "https://alexanderstamenkov.github.io/movie-search/",
  },
  {
    num: "06",
    name: "Weather app",
    desc: "A dynamic weather app that detects your location automatically and adapts its visual theme to current conditions. Search any city for live temperature, humidity, wind speed, and feels-like data.",
    tags: ["JS", "Vite", "OpenWeather API"],
    link: "https://alexanderstamenkov.github.io/weather-app/",
  },
  {
    num: "07",
    name: "SnipVault",
    desc: "A personal code snippet manager with live search, language filtering, and persistent storage. Built from scratch with TypeScript — no frameworks.",
    tags: ["TypeScript", "localStorage", "Netlify"],
    link: "https://snipvault-as.netlify.app",
  },
  {
    num: "08",
    name: "Portfolio",
    desc: "Personal portfolio with custom cursor, scroll animations and clean design",
    tags: ["JavaScript", "CSS", "Design"],
    link: "#",
  },
];

if (!window.matchMedia("(hover: none)").matches) {
  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  });
}

window.addEventListener("scroll", function (e) {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

reveal.forEach(function (el) {
  observer.observe(el);
});

menuBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("open");
  menuBtn.classList.toggle("open");
});

document.querySelectorAll(".mobile-link").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
    menuBtn.classList.remove("open");
  });
});

const renderSkills = function () {
  let html = "";
  skills.forEach((skill) => {
    html += `
      <div class="skill-card reveal">
        <div class="skill-icon">${skill.icon}</div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-desc">${skill.desc}</div>
        <div class="skill-tags">
          ${skill.tags.map((tag) => `<span class="skill-tag">${tag}</span>`).join("")}
        </div>
      </div>
    `;
  });

  skillsGrid.innerHTML = html;
};
const renderProjects = function () {
  let html = "";
  projects.forEach((project) => {
    html += `
      <a href="${project.link}" target="_blank" class="project-item reveal">
        <span class="project-num">${project.num}</span>
        <div class="project-info">
          <div class="project-name">${project.name}</div>
          <div class="project-desc">${project.desc}</div>
        </div>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
        </div>
        <span class="project-arrow">→</span>
      </a>
    `;
  });

  projectsList.innerHTML = html;
};

const animateCounter = function (el) {
  const target = parseInt(el.getAttribute("data-target"));
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const interval = setInterval(function () {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
};

const counterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

counterNum.forEach(function (el) {
  counterObserver.observe(el);
});

renderSkills();
renderProjects();

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});
