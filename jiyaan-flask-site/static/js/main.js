/* Jiyaan Institute of Technology - front-end behaviour
   Content is loaded from the Flask API so the site and the chatbot share one source of truth. */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const money = (n) => "INR " + Number(n).toLocaleString("en-IN");

  async function getJSON(url) {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`Request failed: ${url}`);
    return res.json();
  }

  /* ---------- Icons for course cards ---------- */

  const ICONS = {
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',
    table: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/></svg>',
    flow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="5" cy="6" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7 7.5l3.5 8M17 7.5l-3.5 8M7.5 6h9"/></svg>',
    stream: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8h8a4 4 0 010 8H3"/><path d="M13 8h8M13 16h8"/><circle cx="19" cy="12" r="2"/></svg>',
    cluster: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="8.5" y="14" width="7" height="7" rx="1.5"/><path d="M6.5 10v2.5h11V10"/></svg>',
    cert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="9" r="6"/><path d="M8.5 14.5L7 21l5-2.5 5 2.5-1.5-6.5"/></svg>',
  };

  /* ---------- Rendering ---------- */

  /* Brand logos for each course phase, keyed by course title from the database.
     Simple Icons marks are CC0; the GCP mark was supplied with written permission. */
  const COURSE_LOGOS = {
    "SQL Fundamentals": [{ src: "/static/img/skills/postgresql.svg", color: "#4169e1" }],
    "Python & Data Processing": [
      { src: "/static/img/skills/python.svg", color: "#4b8bbe" },
      { src: "/static/img/skills/pandas.svg", color: "#8ab4f8" },
      { src: "/static/img/skills/numpy.svg", color: "#4dabcf" },
    ],
    "Big Data & PySpark": [
      { src: "/static/img/skills/apachespark.svg", color: "#e25a1c" },
      { src: "/static/img/skills/apachehadoop.svg", color: "#fbbc05" },
    ],
    "GCP Cloud Platform": [
      { img: "/static/img/skills/gcp-cloud.png" },
      { src: "/static/img/skills/bigquery.svg", color: "#4285f4" },
    ],
    "DevOps & Tools": [
      { src: "/static/img/skills/linux.svg", color: "#fcc624" },
      { src: "/static/img/skills/git.svg", color: "#f05032" },
      { src: "/static/img/skills/jira.svg", color: "#4c9aff" },
    ],
  };

  function courseBadge(c) {
    const logos = COURSE_LOGOS[c.title];
    if (!logos) {
      return `<div class="course-icon icon-${esc(c.icon)}">${ICONS[c.icon] || ICONS.database}</div>`;
    }
    const marks = logos.map((l) => l.img
      ? `<img class="course-logo-img" src="${esc(l.img)}" alt="" loading="lazy">`
      : `<span class="course-logo" style="--logo: url(${esc(l.src)}); --c: ${l.color}"></span>`
    ).join("");
    return `<div class="course-logos course-logos-${logos.length}">${marks}</div>`;
  }

  function renderCourses(courses) {
    $("#coursesGrid").innerHTML = courses.map((c) => `
      <article class="course-card" data-reveal>
        ${courseBadge(c)}
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.summary)}</p>
        <div class="course-meta">${esc(c.duration)}</div>
      </article>`).join("");
    staggerReveal("#coursesGrid .course-card");
    bindTilt("#coursesGrid .course-card");
  }

  function renderBatches(batches) {
    $("#batchesGrid").innerHTML = batches.map((b) => {
      const pct = Math.round((b.seats_left / 30) * 100);
      return `
      <article class="batch-card" data-reveal>
        <span class="batch-mode">${esc(b.mode)}</span>
        <h3>${esc(b.name)}</h3>
        <dl>
          <dt>Starts</dt><dd>${esc(new Date(b.start_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }))}</dd>
          <dt>Timing</dt><dd>${esc(b.timing)}</dd>
        </dl>
        <div class="seats">
          <div class="seats-bar"><span data-width="${Math.min(100, pct)}"></span></div>
          <small>${esc(b.seats_left)} seats left</small>
        </div>
      </article>`;
    }).join("");
    staggerReveal("#batchesGrid .batch-card");
  }

  function renderPricing(plans) {
    $("#pricingGrid").innerHTML = plans.map((p) => `
      <article class="plan-card ${p.highlight ? "featured" : ""}" data-reveal>
        ${p.highlight ? '<span class="plan-badge">Most popular</span>' : ""}
        <h3>${esc(p.name)}</h3>
        <div class="plan-duration">${esc(p.duration)}</div>
        <div class="price">
          <strong>${esc(money(p.price_inr))}</strong>
          ${p.original_inr ? `<s>${esc(money(p.original_inr))}</s>` : ""}
        </div>
        <ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <a href="#contact" class="btn ${p.highlight ? "btn-primary" : "btn-ghost"}">Choose ${esc(p.name)}</a>
      </article>`).join("");
    staggerReveal("#pricingGrid .plan-card");
    bindTilt("#pricingGrid .plan-card");
  }

  let logosForChips = {};
  function companyChip(company, color) {
    const logo = logosForChips[slugify(company)];
    if (logo) {
      return `<span class="qc-company qc-company-logo" style="--c:${color}"><img src="${esc(logo)}" alt="${esc(company)} logo" loading="lazy"></span>`;
    }
    return `<span class="qc-company" style="--c:${color}">${esc(company)}</span>`;
  }

  function renderTestimonials(items) {
    const grid = $("#testimonialsGrid");
    const COLORS = ["#4285f4", "#34a853", "#fbbc05", "#ea4335"];
    const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
    const card = (t, hidden, i) => {
      const [title, company] = String(t.role).split(" @ ");
      const color = COLORS[i % COLORS.length];
      return `
      <figure class="quote-card" style="--c:${color}"${hidden ? ' aria-hidden="true"' : ""}>
        <div class="qc-top">
          <span class="qc-avatar">${esc(initials(t.name))}</span>
          <span class="qc-quote" aria-hidden="true">&ldquo;</span>
        </div>
        <blockquote>${esc(t.quote)}</blockquote>
        <figcaption class="qc-who">
          <cite>${esc(t.name)}</cite>
          <small>${esc(title || "")}</small>
          ${company ? companyChip(company, color) : ""}
        </figcaption>
      </figure>`;
    };
    // The list is written twice so the scroll can loop without a jump.
    logosReady.then((logos) => {
      logosForChips = logos;
      grid.innerHTML = items.map((t, i) => card(t, false, i)).join("") + items.map((t, i) => card(t, true, i)).join("");
      startTestimonialScroll(grid);
    });
  }

  /* Testimonials scroll on their own. Hovering, dragging or focusing pauses them. */
  function startTestimonialScroll(grid) {
    if (reduceMotion) return;
    grid.classList.add("auto");
    const pixelsPerSecond = 46;
    let position = 0;
    let paused = false;
    let last = null;

    const pause = () => { paused = true; };
    const resume = () => {
      position = grid.scrollLeft; // pick up any manual scrolling
      paused = false;
    };
    grid.addEventListener("pointerenter", pause);
    grid.addEventListener("pointerleave", resume);
    grid.addEventListener("pointerdown", pause);
    grid.addEventListener("pointerup", resume);
    grid.addEventListener("focusin", pause);
    grid.addEventListener("focusout", resume);

    function step(now) {
      if (last === null) last = now;
      const dt = now - last;
      last = now;
      if (!paused) {
        position += (pixelsPerSecond * dt) / 1000;
        const half = grid.scrollWidth / 2;
        if (half > 0 && position >= half) position -= half;
        grid.scrollLeft = position;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function staggerReveal(selector) {
    $$(selector).forEach((el, i) => {
      el.style.setProperty("--delay", `${(i % 3) * 120}ms`);
      el.setAttribute("data-reveal", "");
      revealObserver.observe(el);
    });
  }

  /* ---------- Scroll reveal, counters, parallax ---------- */

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
        if (entry.target.querySelector("[data-count]")) animateCounters(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  $$("[data-reveal]").forEach((el) => revealObserver.observe(el));

  const counted = new WeakSet();
  function animateCounters(root) {
    $$("[data-count]", root).forEach((el) => {
      if (counted.has(el)) return;
      counted.add(el);
      const target = Number(el.dataset.count);
      if (reduceMotion) { el.textContent = target.toLocaleString("en-IN"); return; }
      const start = performance.now();
      const duration = 1600;
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString("en-IN");
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  // The hero stats sit above the fold, so they start on load.
  const heroStats = $(".hero-stats");
  if (heroStats) setTimeout(() => animateCounters(heroStats), 400);

  const parallaxEls = $$("[data-parallax]");
  const progress = $("#scrollProgress");
  const nav = $("#nav");

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("scrolled", y > 40);
    if (!reduceMotion) {
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax);
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      // Logo card rises a little as you scroll past the hero.
      const card = $("#heroVisual");
      if (card && y < window.innerHeight) card.style.transform = `translateY(${y * -0.12}px)`;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 3D tilt ---------- */

  function tiltFromPointer(el, event, strength) {
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * strength;
    const ry = (px - 0.5) * strength;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function bindTilt(selector) {
    if (reduceMotion) return;
    $$(selector).forEach((el) => {
      el.addEventListener("pointermove", (e) => tiltFromPointer(el, e, 9));
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  // Hero logo card follows the pointer in 3D.
  const logoCard = $("#logoCard");
  if (logoCard && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    const hero = $(".hero");
    hero.addEventListener("pointermove", (e) => tiltFromPointer(logoCard, e, 18));
    hero.addEventListener("pointerleave", () => { logoCard.style.transform = ""; });
  }

  /* ---------- Hero network canvas ---------- */

  function startNetwork() {
    const canvas = $("#networkCanvas");
    const ctx = canvas.getContext("2d");
    const colors = ["#4285f4", "#34a853", "#fbbc05", "#ea4335"];
    let nodes = [];
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.5 + Math.random() * 1.8,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      // With reduced motion the nodes stay still, so the frame is only drawn once.
      if (!reduceMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      const maxDist = 150;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            ctx.strokeStyle = `rgba(138, 180, 248, ${(1 - d / maxDist) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 180) {
          ctx.strokeStyle = `rgba(251, 188, 5, ${(1 - md / 180) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.c;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduceMotion) requestAnimationFrame(frame);
    }

    window.addEventListener("resize", () => { resize(); frame(); });
    window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    resize();
    requestAnimationFrame(frame);
  }
  if ($("#networkCanvas") && $("#networkCanvas").getContext) startNetwork();

  /* ---------- Mobile nav ---------- */

  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    navLinks.classList.toggle("open", !open);
  });
  $$(".nav-links a").forEach((a) => a.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  }));

  /* ---------- Enquiry form ---------- */

  const form = $("#enquiryForm");
  const status = $("#enquiryStatus");
  const submitBtn = $("#enquirySubmit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    $$(".field", form).forEach((f) => f.classList.remove("invalid"));
    $$(".error", form).forEach((el) => (el.textContent = ""));
    status.textContent = "";
    status.classList.remove("error-text");

    const payload = Object.fromEntries(new FormData(form).entries());
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        Object.entries(data.errors || {}).forEach(([name, msg]) => {
          const field = form.querySelector(`[name="${name}"]`)?.closest(".field");
          const errEl = form.querySelector(`[data-error-for="${name}"]`);
          if (field) field.classList.add("invalid");
          if (errEl) errEl.textContent = msg;
        });
        status.textContent = "Please fix the highlighted fields.";
        status.classList.add("error-text");
      } else {
        form.reset();
        status.textContent = data.message;
      }
    } catch {
      status.textContent = "Could not send your enquiry. Please check your connection and try again.";
      status.classList.add("error-text");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send enquiry";
    }
  });

  /* ---------- Chatbot ---------- */

  const launcher = $("#chatLauncher");
  const panel = $("#chatPanel");
  const messages = $("#chatMessages");
  const chatForm = $("#chatForm");
  const chatInput = $("#chatInput");
  const chatSend = $("#chatSend");
  const history = [];
  let greeted = false;

  function openChat(open) {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    if (open) {
      if (!greeted) {
        addMessage("bot", "Hi! I can answer questions about our GCP Data Engineering plans, fees, batches and payment policies.");
        greeted = true;
      }
      setTimeout(() => chatInput.focus(), 200);
    }
  }
  launcher.addEventListener("click", () => openChat(panel.hidden));
  $("#chatClose").addEventListener("click", () => openChat(false));

  function addMessage(role, text) {
    const div = document.createElement("div");
    div.className = `msg ${role}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  async function sendChat(text) {
    const question = text.trim();
    if (!question) return;
    addMessage("user", question);
    chatInput.value = "";
    chatSend.disabled = true;

    const typing = document.createElement("div");
    typing.className = "msg bot typing";
    typing.setAttribute("aria-label", "Assistant is typing");
    typing.innerHTML = "<i></i><i></i><i></i>";
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history: history.slice(-8) }),
      });
      const data = await res.json();
      typing.remove();
      if (!res.ok) {
        addMessage("bot error", data.error || "Something went wrong. Please try again.");
        return;
      }
      addMessage("bot", data.reply);
      history.push({ role: "user", content: question });
      history.push({ role: "assistant", content: data.reply });
    } catch {
      typing.remove();
      addMessage("bot error", "Network error. Please check your connection and try again.");
    } finally {
      chatSend.disabled = false;
      chatInput.focus();
    }
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendChat(chatInput.value);
  });
  $$("#chatChips button").forEach((btn) => btn.addEventListener("click", () => {
    if (!panel.hidden) sendChat(btn.textContent);
  }));

  /* ---------- Company wall (moving rows) ---------- */

  const COMPANIES = [
    "TCS", "Infosys", "Wipro", "HCLTech", "Tech Mahindra", "Cognizant", "Accenture", "Capgemini",
    "Deloitte", "EY", "KPMG", "PwC", "LTIMindtree", "Mphasis", "Persistent Systems", "Quantiphi",
    "Sigmoid", "Tiger Analytics", "Tredence", "Datametica", "Fractal Analytics", "LatentView Analytics",
    "Searce", "GlobalLogic", "Publicis Sapient", "Thoughtworks", "Brillio", "Coforge", "Nagarro",
    "Virtusa", "Flipkart", "Swiggy", "Razorpay", "Unacademy", "InMobi", "Practo", "CarDekho",
    "Yellow.ai", "Vedantu", "Meesho", "Atos", "NTT Data", "Hexaware", "Birlasoft", "UST",
    "Zensar Technologies", "Saksoft", "EPAM", "HTC Global Services", "Tavant", "Xebia", "Value Labs",
    "R Systems", "WalkingTree", "Bristlecone", "Infogain", "CGI", "CSG Systems", "CSI Global", "Globant",
    "Snap", "Twitter", "PayPal", "Target", "HSBC", "Deutsche Bank", "Standard Chartered", "Vodafone",
    "Air India", "Mastercard", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "Wells Fargo",
    "Colgate-Palmolive", "PepsiCo", "Bayer", "UPS", "Ford", "General Motors", "Mercedes-Benz R&D",
    "Renault Nissan Tech", "Equifax", "HDFC ERGO", "Hindustan Unilever", "L'Oréal", "Mondelez",
    "AB InBev", "Tata Elxsi",
  ];

  const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  function buildCompanyWall(logos) {
    const wall = $("#companyWall");
    if (!wall) return;
    const rowCount = 3;
    const rows = Array.from({ length: rowCount }, () => []);
    COMPANIES.forEach((name, i) => rows[i % rowCount].push(name));

    wall.innerHTML = rows.map((names, rowIndex) => {
      // Every row is written twice so the scroll loops without a jump.
      const tile = (name) => {
        const logo = logos[slugify(name)];
        const inner = logo
          ? `<img src="${esc(logo)}" alt="${esc(name)} logo" loading="lazy">`
          : `<span>${esc(name)}</span>`;
        return `<div class="co-tile${logo ? " has-logo" : ""}" title="${esc(name)}">${inner}</div>`;
      };
      const items = names.map(tile).join("");
      const direction = rowIndex % 2 === 0 ? "" : " reverse";
      return `<div class="wall-row${direction}" style="--speed: ${38 + rowIndex * 8}s">
        <div class="wall-track">${items}</div>
        <div class="wall-track" aria-hidden="true">${items}</div>
      </div>`;
    }).join("");
  }

  const logosReady = fetch("/api/company-logos")
    .then((res) => (res.ok ? res.json() : {}))
    .catch(() => ({}));
  logosReady.then((logos) => buildCompanyWall(logos));


  /* ---------- End-to-end data flow player ---------- */

  const FLOW_STEPS = [
    { stage: "Data sources", note: "A customer clicks 'add to cart' on the website. The event is captured as a JSON record.",
      code: '{\n  "event": "add_to_cart",\n  "user_id": "u_1042",\n  "sku": "SKU-88",\n  "price_inr": 499,\n  "ts": "2026-10-12T10:02:11Z"\n}' },
    { stage: "Ingest: Pub/Sub", note: "The event is published to a topic. Pub/Sub holds it until the pipeline is ready to read it.",
      code: 'topic: clickstream\nmessage: 1 event (214 bytes)\nacknowledged: yes' },
    { stage: "Store: Cloud Storage", note: "Raw events are also written to the data lake, so the original data is always kept.",
      code: 'gs://jiyaan-lake/raw/2026/10/12/clicks-0001.json\nstatus: written (1 record)' },
    { stage: "Process: Dataflow", note: "Dataflow validates the record and counts cart adds per SKU in one-minute windows.",
      code: '{\n  "sku": "SKU-88",\n  "window": "10:02-10:03",\n  "cart_adds": 37,\n  "revenue_inr": 18463\n}' },
    { stage: "Warehouse: BigQuery", note: "The aggregated row is inserted into a table that analysts and dashboards query.",
      code: 'table: sales.minute_metrics\nrows inserted: 1\nquery time: 0.8 s' },
    { stage: "Analyse: Vertex AI", note: "A forecasting model reads the latest rows and predicts demand for the next hour.",
      code: 'model: demand_forecast\nSKU-88 predicted units (next hour): 42\nconfidence: 0.87' },
    { stage: "Visualise: Looker", note: "The live dashboard tile refreshes, so managers see the new numbers within seconds.",
      code: 'tile: Cart adds (live)\nSKU-88: 37 adds, INR 18,463 revenue\nforecast: 42 units next hour' },
  ];

  function initFlowPlayer() {
    const viz = $("#flowViz");
    if (!viz) return;
    const stages = $$(".pipeline .stage");
    const packet = $("#flowPacket");
    const stageEl = $("#fpStage");
    const codeEl = $("#fpCode");
    const noteEl = $("#fpNote");
    const playBtn = $("#flowPlay");
    const stepBtn = $("#flowStep");
    const count = FLOW_STEPS.length;
    let index = 0;
    let timer = null;
    let playing = !reduceMotion;

    function show(i) {
      index = (i + count) % count;
      const step = FLOW_STEPS[index];
      const pct = ((index + 0.5) / count) * 100;
      packet.style.left = pct + "%";
      stages.forEach((el, k) => el.classList.toggle("live", k === index));
      stageEl.textContent = step.stage;
      codeEl.textContent = step.code;
      noteEl.textContent = step.note;
    }

    function schedule() {
      clearTimeout(timer);
      if (playing) timer = setTimeout(() => { show(index + 1); schedule(); }, 2600);
    }

    function setPlaying(on) {
      playing = on;
      playBtn.textContent = on ? "Pause" : "Play";
      playBtn.setAttribute("aria-label", on ? "Pause animation" : "Play animation");
      schedule();
    }

    playBtn.addEventListener("click", () => setPlaying(!playing));
    stepBtn.addEventListener("click", () => {
      show(index + 1);
      if (playing) schedule();
    });

    // Start the flow only when the section is on screen.
    let started = false;
    const startObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          show(0);
          setPlaying(!reduceMotion);
          startObserver.unobserve(viz);
        }
      });
    }, { threshold: 0.35 });
    show(0);
    if (reduceMotion) playBtn.textContent = "Play";
    startObserver.observe(viz);
  }
  initFlowPlayer();




  /* ---------- Illustrated roadmap: place stops on the road ---------- */

  function initRoadArt() {
    const path = $("#roadPath");
    const group = $("#roadStops");
    if (!path || !group) return;
    const NS = "http://www.w3.org/2000/svg";
    const stops = [
      ["Jiyaan Institute", "Day 0"], ["SQL Analyst", "Days 1–15"], ["Python Coder", "Days 16–30"],
      ["Spark Engineer", "Days 31–46"], ["GCP Builder", "Days 47–60"],
      ["DevOps Ready", "Days 61–76"], ["MNC Job Offer", "Day 90"],
    ];
    const colors = ["#8ab4f8", "#4285f4", "#34a853", "#fbbc05", "#ea4335", "#4285f4", "#34a853"];
    const total = path.getTotalLength();
    const fractions = [0.05, 0.2, 0.36, 0.52, 0.68, 0.84, 0.97];

    stops.forEach(([name, days], i) => {
      const pt = path.getPointAtLength(total * fractions[i]);
      // Labels for stops 2 and 4 sit above the road; the rest sit below, which keeps stops 6 and 7 apart.
      const above = i === 1 || i === 3;
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "road-stop");
      g.style.setProperty("--i", i);
      g.setAttribute("transform-origin", `${pt.x} ${pt.y}`);

      const circle = document.createElementNS(NS, "circle");
      circle.setAttribute("cx", pt.x);
      circle.setAttribute("cy", pt.y);
      circle.setAttribute("r", 26);
      circle.setAttribute("class", "road-stop-circle");
      circle.setAttribute("fill", colors[i]);
      g.appendChild(circle);

      const num = document.createElementNS(NS, "text");
      num.setAttribute("x", pt.x);
      num.setAttribute("y", pt.y + 8);
      num.setAttribute("text-anchor", "middle");
      num.setAttribute("class", "road-stop-num");
      num.textContent = String(i + 1);
      g.appendChild(num);

      const last = i === stops.length - 1;
      // The last stop's label sits to the left, so it doesn't collide with the flag or stop 6.
      const anchorX = last ? pt.x - 34 : pt.x;
      const anchor = last ? "end" : "middle";
      const labelY = above ? pt.y - 52 : pt.y + 62;
      const label = document.createElementNS(NS, "text");
      label.setAttribute("x", anchorX);
      label.setAttribute("y", labelY);
      label.setAttribute("text-anchor", anchor);
      label.setAttribute("class", "road-label-name");
      label.textContent = name;
      g.appendChild(label);

      const sub = document.createElementNS(NS, "text");
      sub.setAttribute("x", anchorX);
      sub.setAttribute("y", labelY + (above ? -20 : 22));
      sub.setAttribute("text-anchor", anchor);
      sub.setAttribute("class", "road-label-days");
      sub.textContent = days;
      g.appendChild(sub);

      group.appendChild(g);
    });

    // Finish flag drawn at the end of the road (pole and pennant, no font glyph).
    const end = path.getPointAtLength(total);
    const flag = document.createElementNS(NS, "g");
    flag.setAttribute("class", "road-finish");
    flag.innerHTML =
      `<line x1="${end.x}" y1="${end.y}" x2="${end.x}" y2="${end.y - 74}" stroke="#eef2ff" stroke-width="4" stroke-linecap="round"/>` +
      `<polygon points="${end.x},${end.y - 74} ${end.x + 46},${end.y - 62} ${end.x},${end.y - 50}" fill="#34a853"/>`;
    group.appendChild(flag);
  }
  initRoadArt();


  /* ---------- Offers by company: logos in bubbles, count-up on view ---------- */
  logosReady.then((logos) => {
    $$(".ob-disc[data-company]").forEach((el) => {
      const name = el.dataset.company;
      const logo = logos[slugify(name)];
      if (logo) el.innerHTML = `<img src="${esc(logo)}" alt="${esc(name)} logo" loading="lazy">`;
    });
  });

  const cloud = $(".offer-cloud");
  if (cloud) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countObs.unobserve(entry.target);
        $$(".ob-count", entry.target).forEach((el) => {
          const target = Number(el.dataset.count);
          if (reduceMotion) { el.textContent = target; return; }
          const start = performance.now();
          const tick = (now) => {
            const t = Math.max(0, Math.min((now - start) / 900, 1));
            el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
            if (t < 1) requestAnimationFrame(tick);
          };
          setTimeout(() => requestAnimationFrame(tick), 300);
        });
      });
    }, { threshold: 0.2 });
    countObs.observe(cloud);
  }

  /* ---------- Initial data ---------- */

  $("#year").textContent = new Date().getFullYear();

  // Remove the intro splash after its animation. The timer is a fallback in case
  // the browser pauses CSS animations (e.g. background tabs).
  const splash = $(".splash");
  if (splash) setTimeout(() => splash.remove(), 2900);

  Promise.allSettled([
    getJSON("/api/courses").then(renderCourses),
    getJSON("/api/batches").then(renderBatches),
    getJSON("/api/pricing").then(renderPricing),
    getJSON("/api/testimonials").then(renderTestimonials),
  ]).then((results) => {
    if (results.some((r) => r.status === "rejected")) {
      console.error("Some content failed to load", results);
    }
  });

  // Start the batch seat bars and the grids once they are on screen.
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      $$("[data-width]", entry.target).forEach((el) => (el.style.width = el.dataset.width + "%"));
      lazyObserver.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  const batchesGrid = $("#batchesGrid");
  if (batchesGrid) lazyObserver.observe(batchesGrid);
})();
