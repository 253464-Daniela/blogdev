(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const STORAGE_KEY = "theme";

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    );
  };

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
  }

  toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  const navToggle = document.getElementById("nav-toggle");
  const navList = document.getElementById("site-nav");
  if (navToggle && navList) {
    const setNav = (open) => {
      navList.classList.toggle("is-open", open);
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute(
        "aria-label",
        open ? "Cerrar menú" : "Abrir menú"
      );
    };

    navToggle.addEventListener("click", () => {
      setNav(!navList.classList.contains("is-open"));
    });

    navList.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        setNav(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setNav(false);
      }
    });
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    const label = copyBtn.querySelector(".copy-label");
    const email = copyBtn.dataset.email;

    const copyToClipboard = async (text) => {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    };

    const resetLabel = () => {
      copyBtn.classList.remove("is-copied");
      label.textContent = email;
    };

    copyBtn.addEventListener("click", async () => {
      try {
        await copyToClipboard(email);
        copyBtn.classList.add("is-copied");
        label.textContent = "¡Copiado!";
      } catch {
        label.textContent = "Error al copiar";
      }
      setTimeout(resetLabel, 2000);
    });
  }
const projectsGrid = document.getElementById("projects-grid");
  if (projectsGrid) {
    const projectCard = (project, index) => `
      <article class="project-card">
        <p class="project-card-code">&gt;_ 0${index + 1}</p>
        <h3 class="project-card-title">${project.title}</h3>
        <div class="project-problem">
          <span class="project-label">Problema</span>
          <p>${project.problem}</p>
        </div>
        <div class="project-solution">
          <span class="project-label">Solución</span>
          <p>${project.solution}</p>
        </div>
        <ul class="project-tags" aria-label="Tecnologías">
          ${project.tags.map((tag) => `<li class="tech-badge">${tag}</li>`).join("")}
        </ul>
        <div class="project-card-links">
          <a class="project-card-link" href="${project.githubUrl}" rel="noopener noreferrer" target="_blank">GitHub</a>
          ${project.demoUrl && project.demoUrl !== "#"
            ? `<a class="project-card-link" href="${project.demoUrl}" rel="noopener noreferrer" target="_blank">Demo</a>`
            : ""}
        </div>
      </article>
    `;

    fetch("data/projects.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((projects) => {
        projectsGrid.innerHTML = projects.map(projectCard).join("");
      })
      .catch(() => {
        projectsGrid.innerHTML =
          '<p class="section-lead">No se pudieron cargar los proyectos.</p>';
      });
  }
const latestList = document.getElementById("latest-posts-list");
  if (latestList) {
    const formatDate = (iso) =>
      new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(iso));

    fetch("data/posts.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((posts) => {
        const recent = [...posts]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 2);
        latestList.innerHTML = recent
          .map(
            (post) => `
          <article class="latest-card">
            <a class="latest-card-link" href="blog.html?post=${post.slug}">
              <h3 class="latest-card-title">${post.title}</h3>
            </a>
            <p class="latest-card-excerpt">${post.excerpt}</p>
            <p class="latest-card-meta">
              <time datetime="${post.date}">${formatDate(post.date)}</time>
              · ${post.readTime} min de lectura
            </p>
          </article>`
          )
          .join("");
      })
      .catch(() => {
        latestList.innerHTML =
          '<p class="section-lead">No se pudieron cargar los artículos.</p>';
      });
  }
})();