(() => {
  const listEl = document.getElementById("posts-list");
  const contentEl = document.getElementById("post-content");
  const postSlug = new URLSearchParams(location.search).get("post");

  const formatDate = (iso) =>
    new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));

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

  const attachCopyButtons = () => {
    contentEl.querySelectorAll("pre code").forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (pre.querySelector(".copy-code-btn")) {
        return;
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-code-btn";
      btn.textContent = "Copiar código";
      btn.setAttribute("aria-label", "Copiar código");

      btn.addEventListener("click", async () => {
        const original = btn.textContent;
        try {
          await copyToClipboard(codeBlock.innerText);
          btn.textContent = "¡Copiado!";
          btn.classList.add("is-copied");
        } catch {
          btn.textContent = "Error al copiar";
        }
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 2000);
      });

      pre.appendChild(btn);
    });
  };

  const postMeta = (post) => `
    <p class="post-meta">
      <time datetime="${post.date}">${formatDate(post.date)}</time>
      · ${post.readTime} min de lectura
      <span class="post-tags">
        ${post.tags.map((tag) => `<span class="tech-badge">${tag}</span>`).join("")}
      </span>
    </p>
  `;

  const renderList = (posts) => {
    const sorted = [...posts].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    listEl.innerHTML = `
      <ul class="posts-list">
        ${sorted
          .map(
            (post) => `
          <li class="post-card">
            <a class="post-card-link" href="blog.html?post=${post.slug}">
              <h3 class="post-card-title">${post.title}</h3>
            </a>
            <p class="post-card-excerpt">${post.excerpt}</p>
            ${postMeta(post)}
          </li>`
          )
          .join("")}
      </ul>
    `;
  };

  const renderPost = async (posts, slug) => {
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      contentEl.innerHTML = `
        <p class="section-lead">Artículo no encontrado.</p>
        <a class="btn btn-ghost" href="blog.html">Volver a todos los artículos</a>
      `;
      return;
    }

    const md = await fetch(post.contentFile).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.text();
    });

    document.title = `${post.title} · Blog · Mich`;

    contentEl.innerHTML = `
      <a class="btn btn-ghost back-link" href="blog.html">← Volver a todos los artículos</a>
      <article class="post-card post-reader">
        <header class="post-header">
          <p class="eyebrow">&gt;_ ${post.slug}</p>
          <h1 class="post-title">${post.title}</h1>
          ${postMeta(post)}
        </header>
        <div class="post-body">${marked.parse(md)}</div>
      </article>
    `;

    hljs.highlightAll();
    attachCopyButtons();
  };

  const init = async () => {
    try {
      const res = await fetch("data/posts.json");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const posts = await res.json();

      if (postSlug) {
        listEl.hidden = true;
        contentEl.hidden = false;
        await renderPost(posts, postSlug);
      } else {
        contentEl.hidden = true;
        listEl.hidden = false;
        renderList(posts);
      }
    } catch {
      (postSlug ? contentEl : listEl).innerHTML =
        '<p class="section-lead">No se pudo cargar el blog.</p>';
    }
  };

  init();
})();