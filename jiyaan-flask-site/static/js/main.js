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
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const nowMonth = new Date().getMonth();
    const info = batches.map((b) => {
      const m = parseInt(b.start_date.slice(5, 7), 10) - 1;
      return { b, m, monthName: MONTHS[m], diff: (m - nowMonth + 12) % 12 };
    });
    const sorted = [...info].sort((x, y) => x.diff - y.diff);
    const next = sorted[0];
    const alert = $("#batchAlert");
    if (alert && next) {
      alert.innerHTML = next.diff === 0
        ? `<span class="ba-dot"></span><strong>Starting soon:</strong> ${esc(next.monthName)} batch is going to start this month.`
        : `<span class="ba-dot"></span><strong>Upcoming batch:</strong> ${esc(next.monthName)} is going to start.`;
      alert.hidden = false;
    }
    $("#batchesGrid").innerHTML = info.map((x, i) => {
      const seats = x.b.seats_left;
      const pct = Math.max(0, Math.min(100, Math.round((seats / 30) * 100)));
      const badge = x.diff === 0 ? '<span class="bt-status soon">Starting soon</span>'
                  : x.diff === 1 ? '<span class="bt-status next">Next</span>' : "";
      return `
      <article class="bt-card bt-${i % 3}${x.diff === 0 ? " is-soon" : ""}" data-reveal>
        ${badge}
        <span class="bt-mode">${esc(x.b.mode)}</span>
        <div class="bt-month">${esc(x.monthName)}</div>
        <span class="bt-label">Batch</span>
        <div class="bt-ring" style="--p:${pct}">
          <div class="bt-ring-inner"><strong>${esc(seats)}</strong><small>seats</small></div>
        </div>
        <p class="bt-limit">Limited seats</p>
      </article>`;
    }).join("");
    staggerReveal("#batchesGrid .bt-card");
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
    const walker = $(".road-walker");
    const art = $(".road-art");
    if (!path || !group) return;
    const NS = "http://www.w3.org/2000/svg";
    // Each stop: [title, detail]. A stop's label appears only when the walker reaches it.
    const stops = [
      ["Jiyaan Institute", "Day 0 \u00b7 Start your journey"],
      ["SQL Analyst", "Days 1\u201315 \u00b7 Pro in SQL and coding"],
      ["Python Coder", "Days 16\u201330 \u00b7 Writes Python scripts"],
      ["Spark Engineer", "Days 31\u201346 \u00b7 PySpark and data engineering"],
      ["GCP Data Engineer", "Days 47\u201360 \u00b7 GCP cloud pipelines"],
      ["Job-Ready", "Days 61\u201376 \u00b7 Naukri, resume and LinkedIn"],
      ["Interviews", "Days 77\u201390 \u00b7 Attending interviews"],
      ["MNC Job Offer", "Offer from an MNC company"],
    ];
    const colors = ["#8ab4f8", "#4285f4", "#34a853", "#fbbc05", "#ea4335", "#4285f4", "#34a853", "#ea4335"];
    const total = path.getTotalLength();
    const fractions = [0.03, 0.163, 0.296, 0.429, 0.561, 0.694, 0.827, 0.96];
    const last = stops.length - 1;
    const points = [];
    const stopEls = [];

    stops.forEach(([name, sub], i) => {
      const pt = path.getPointAtLength(total * fractions[i]);
      points.push(pt);
      const isLast = i === last;
      const above = i % 2 === 1;
      const anchorX = isLast ? pt.x - 34 : pt.x;
      const anchor = isLast ? "end" : "middle";
      const labelY = above ? pt.y - 52 : pt.y + 62;

      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "road-stop");
      g.setAttribute("data-stop", String(i));

      const circle = document.createElementNS(NS, "circle");
      circle.setAttribute("cx", pt.x);
      circle.setAttribute("cy", pt.y);
      circle.setAttribute("r", 24);
      circle.setAttribute("class", "road-stop-circle");
      circle.setAttribute("fill", colors[i]);
      g.appendChild(circle);

      const num = document.createElementNS(NS, "text");
      num.setAttribute("x", pt.x);
      num.setAttribute("y", pt.y + 8);
      num.setAttribute("text-anchor", "middle");
      num.setAttribute("class", "road-stop-num");
      num.textContent = i === 0 ? "S" : i === last ? "\u2605" : String(i);
      g.appendChild(num);

      const label = document.createElementNS(NS, "text");
      label.setAttribute("x", anchorX);
      label.setAttribute("y", labelY);
      label.setAttribute("text-anchor", anchor);
      label.setAttribute("class", "road-label-name");
      label.textContent = name;
      g.appendChild(label);

      const subEl = document.createElementNS(NS, "text");
      subEl.setAttribute("x", anchorX);
      subEl.setAttribute("y", labelY + (above ? -20 : 22));
      subEl.setAttribute("text-anchor", anchor);
      subEl.setAttribute("class", "road-label-days");
      subEl.textContent = sub;
      g.appendChild(subEl);

      group.appendChild(g);
      stopEls.push(g);
    });

    // Finish flag at the end of the road.
    const end = path.getPointAtLength(total);
    const flag = document.createElementNS(NS, "g");
    flag.setAttribute("class", "road-finish");
    flag.innerHTML =
      `<line x1="${end.x}" y1="${end.y}" x2="${end.x}" y2="${end.y - 74}" stroke="#eef2ff" stroke-width="4" stroke-linecap="round"/>` +
      `<polygon points="${end.x},${end.y - 74} ${end.x + 46},${end.y - 62} ${end.x},${end.y - 50}" fill="#34a853"/>`;
    group.appendChild(flag);

    if (!walker) return;
    const place = (pt) => walker.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
    const pos = (f) => path.getPointAtLength(total * f);
    const showStop = (i) => stopEls[i].classList.add("shown");
    const hideFrom = (i) => stopEls.forEach((el, k) => { if (k >= i) el.classList.remove("shown"); });

    showStop(0);
    if (reduceMotion) {
      stopEls.forEach((el) => el.classList.add("shown"));
      place(points[last]);
      return;
    }

    // Walk stop to stop. A stop's label appears on arrival. The final arrival triggers the celebration.
    const legs = [{ type: "stop", at: fractions[0], dur: 900 }];
    for (let i = 1; i <= last; i++) {
      legs.push({ type: "move", from: fractions[i - 1], to: fractions[i], dur: 1800, show: i });
      legs.push({ type: "stop", at: fractions[i], dur: i === last ? 1800 : 900, final: i === last });
    }

    function celebrate() {
      if (!art || art.querySelector(".celebrate")) return;
      const box = document.createElement("div");
      box.className = "celebrate";
      box.innerHTML = '<div class="cel-msg">Congratulations! Your MNC job offer is here</div>';
      const colors2 = ["#4285f4", "#34a853", "#fbbc05", "#ea4335", "#ffffff"];
      for (let k = 0; k < 80; k++) {
        const sp = document.createElement("span");
        sp.className = "cel-spark";
        sp.style.setProperty("--x", (Math.random() * 100) + "%");
        sp.style.setProperty("--dx", ((Math.random() - 0.5) * 360) + "px");
        sp.style.setProperty("--dy", (-(Math.random() * 300 + 80)) + "px");
        sp.style.setProperty("--c", colors2[k % colors2.length]);
        sp.style.setProperty("--d", (Math.random() * 0.5) + "s");
        sp.style.setProperty("--r", ((Math.random() * 720) - 360) + "deg");
        box.appendChild(sp);
      }
      art.appendChild(box);
      setTimeout(() => box.remove(), 5000);
    }

    let legIndex = 0;
    let legStart = null;
    function step(now) {
      if (legStart === null) legStart = now;
      const leg = legs[legIndex];
      const t = Math.min((now - legStart) / leg.dur, 1);
      if (leg.type === "move") {
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        place(pos(leg.from + (leg.to - leg.from) * e));
      } else {
        place(pos(leg.at));
      }
      if (t >= 1) {
        if (leg.show !== undefined) showStop(leg.show);
        if (leg.type === "stop" && leg.final) celebrate();
        legIndex++;
        legStart = now;
        if (legIndex >= legs.length) {
          // Pause after the celebration, then replay the journey from the start.
          setTimeout(() => {
            hideFrom(1);
            legIndex = 0;
            legStart = null;
            requestAnimationFrame(step);
          }, 6000);
          return;
        }
      }
      requestAnimationFrame(step);
    }

    place(pos(fractions[0]));
    const startObs = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        startObs.disconnect();
        setTimeout(() => requestAnimationFrame(step), 800);
      }
    }, { threshold: 0.3 });
    startObs.observe(art);
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


  /* ---------- Syllabus panels (SQL, Python) ---------- */

  const SYLLABUS = {
    sql: {
      kicker: "SQL syllabus",
      title: "From first query to window functions",
      root: "SQL",
      branches: [
        { label: "Basics", sub: "Read, write and shape data", color: "#4285f4", items: ["SELECT", "CREATE", "INSERT", "UPDATE", "ALTER", "DELETE", "TRUNCATE", "DROP", "DESCRIBE", "WHERE", "DISTINCT", "LIMIT", "LIKE", "ORDER BY", "IN", "BETWEEN", "AS", "SUM()", "MAX()", "MIN()", "AVG()", "COUNT()", "GROUP BY", "HAVING", "UNION", "UNION ALL", "IS NULL", "NOT NULL", "CASE"] },
        { label: "Intermediate", sub: "Combine tables and reuse logic", color: "#34a853", items: ["3 JOIN", "SUBQUERYS", "CTE's", "VIEW's"] },
        { label: "Data Engineer", sub: "Rank, compare and analyse over rows", color: "#fbbc05", items: ["WINDOWS FUNCTIONS", "ROW_NUMBER()", "RANK()", "DENSE_RANK()", "LAG(column, n)", "LEAD(column, n)"] },
      ],
    },
    python: {
      kicker: "Python syllabus",
      title: "From first line of code to data analysis",
      root: "Python",
      branches: [
        { label: "Basics", sub: "Core language building blocks", color: "#4285f4", items: ["Variables", "Datatypes", "Operators", "Conditional Statements (if, elif, else)", "Loops", "Functions", "Exception handling"] },
        { label: "Advanced", sub: "Structures, functions and files", color: "#34a853", items: ["Data Structures", "Lambda Functions", "Map Function", "Generators", "Iterators", "Decorators", "File Operation: Read and Write Files", "Importing Modules and Packages"] },
        { label: "Data Engineer", sub: "Pandas for real datasets", color: "#fbbc05", items: ["Pandas", "DataFrame", "Data Manipulation", "Data Analysis"] },
      ],
    },
    bigdata: {
      kicker: "Big Data syllabus",
      title: "From the 5 Vs to cloud data platforms",
      root: "Big Data",
      branches: [
        { label: "Basics", sub: "Concepts, sizes and data types", color: "#4285f4", items: ["Volume", "Velocity", "Variety", "Veracity", "Value", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "BB", "Geopbyte", "Batch processing", "Streaming", "Structured data", "Semi-structured data", "Unstructured data", "OLTP", "OLAP"] },
        { label: "Advanced", sub: "File formats, pipelines and storage", color: "#34a853", items: ["CSV", "JSON", "Parquet", "ORC", "Avro", "ETL", "ELT", "Data Lake", "Data Warehouse", "Lakehouse", "Data Ingestion", "Storage", "Processing", "Consumption layers"] },
        { label: "Data Engineer", sub: "Hadoop, distributed storage and cloud", color: "#fbbc05", items: ["Distributed", "Partitioning", "Scalability", "Replication", "Fault tolerance", "High availability", "Moving computation", "HDFS", "GCS", "S3", "ADF", "AWS 2006", "Alibaba 2009", "Azure 2010", "Oracle 2016", "IBM 2017", "GCP 2016-2018"] },
      ],
    },
    pyspark: {
      kicker: "PySpark syllabus",
      title: "From Spark basics to optimised pipelines",
      root: "PySpark",
      branches: [
        { label: "Basics", sub: "What Spark is and how it works", color: "#4285f4", items: ["Spark & its Features", "Features of Apache Spark", "Spark Architecture Overview", "Resilient Distributed Dataset (RDD)"] },
        { label: "Advanced", sub: "Transform, plan and act on data", color: "#34a853", items: ["Spark's Query Plans", "Transformations", "Narrow Transformations", "Wide Transformations", "Repartition", "Coalesce", "Actions"] },
        { label: "Data Engineer", sub: "Execution graphs and tuning", color: "#fbbc05", items: ["DAG", "Spark Optimization Techniques"] },
      ],
    },
    gcp: {
      kicker: "GCP syllabus",
      title: "From cloud storage to data pipelines on Google Cloud",
      root: "GCP Cloud",
      branches: [
        { label: "Basics", sub: "Storage, databases and serverless", color: "#4285f4", items: ["Serverless Cloud Functions", "Cloud Storage", "Cloud SQL"] },
        { label: "Advanced", sub: "Warehousing and analytics", color: "#34a853", items: ["BigQuery", "Looker"] },
        { label: "Data Engineer", sub: "Pipelines, processing and governance", color: "#fbbc05", items: ["Dataflow", "Dataproc", "Dataproc Serverless", "Pub/Sub", "Composer (Airflow)", "Cloud IAM"] },
      ],
    },
    datamodel: {
      kicker: "Data Modelling syllabus",
      title: "From star schemas to slowly changing dimensions",
      root: "Data Modelling",
      branches: [
        { label: "Basics", sub: "Core warehouse design", color: "#4285f4", items: ["Star Schema"] },
        { label: "Advanced", sub: "Normalised dimension design", color: "#34a853", items: ["Snowflake Schema"] },
        { label: "Data Engineer", sub: "Tracking history over time", color: "#fbbc05", items: ["Slowly Changing Dimensions (SCD)"] },
      ],
    },
    devops: {
      kicker: "Developer Skills syllabus",
      title: "From Git basics to agile teamwork",
      root: "DevOps & Tools",
      branches: [
        { label: "Git Foundations", sub: "Commands, branches and remotes", color: "#4285f4", items: ["git init", "git clone", "git status", "git add", "git commit", "git log", "git diff", "git restore", "git reset", "git checkout", "git branch", "git switch", "git push", "git pull"] },
        { label: "Teamwork & CI/CD", sub: "Pull requests, rebase and pipelines", color: "#34a853", items: ["Pull Requests: create", "Pull Requests: review", "Pull Requests: approve", "Pull Requests: merge", "git rebase", "git merge", "CI/CD with Bitbucket Pipelines"] },
        { label: "Agile & Jira", sub: "Sprints, calls, issues and docs", color: "#fbbc05", items: ["Sprint Planning Call", "Daily Standup Call", "Sprint Review / Demo Call", "Sprint Retrospective Call", "Backlog Refinement Call", "Jira: sprints", "Jira: dashboards", "Epic", "Story", "Task", "Sub-task", "Backlog", "Issues", "Bug", "To Do", "In Progress", "Testing", "Deployment", "Done", "Confluence documentation"] },
      ],
    },
    jobprofile: {
      kicker: "Job Profile Building",
      title: "Job profile building",
      root: "Job Profile Building",
      branches: [
        { label: "Resume", sub: "Your document for recruiters", color: "#4285f4", items: ["Resume creation"] },
        { label: "LinkedIn", sub: "Your professional profile", color: "#34a853", items: ["LinkedIn creation"] },
        { label: "Naukri", sub: "Your job portal profile", color: "#fbbc05", items: ["Naukri creation"] },
      ],
    },
    jobready: {
      kicker: "Interview & Job Ready syllabus",
      title: "Real-time projects and job-ready skills",
      root: "Real-time Projects",
      prefix: "jobprofile",
      noStats: true,
      branches: [
        { label: "Hands-on Projects", sub: "Build a real project end to end", color: "#ea4335", items: ["Real-time project hands-on project development"] },
        { label: "Working Environments", sub: "Work across different environments", color: "#8ab4f8", items: ["Working with different ENV"] },
      ],
    },
    linux: {
      kicker: "Linux syllabus",
      title: "Linux basics and the Google Cloud CLI",
      root: "Linux",
      branches: [
        { label: "Linux Basics", sub: "Folders and the screen", color: "#4285f4", items: ["folder <=> directory", "clear"] },
        { label: "Google Cloud CLI", sub: "Sign in and pick a project", color: "#34a853", items: ["gcloud auth login", "gcloud config set project <project-id>"] },
        { label: "Terminal Shortcuts", sub: "Work faster in the shell", color: "#fbbc05", items: ["tab", "up arrow", "down arrow", "Ctrl+Z"] },
      ],
    },
    realtime: {
      kicker: "Real-time Projects syllabus",
      title: "Hands-on real-time projects",
      root: "Real-time Projects",
      branches: [
        { label: "Hands-on Projects", sub: "Build a real project end to end", color: "#ea4335", items: ["Real-time project hands-on project development"] },
        { label: "Working Environments", sub: "Work across different environments", color: "#8ab4f8", items: ["Working with different ENV"] },
      ],
    },
  };
  SYLLABUS.git = Object.assign({}, SYLLABUS.devops, { kicker: "Git syllabus", title: "From Git basics to pull requests and CI/CD", root: "Git", branches: SYLLABUS.devops.branches.slice(0, 2) });
  SYLLABUS.jira = Object.assign({}, SYLLABUS.devops, { kicker: "Jira & Agile syllabus", title: "From sprints and backlogs to Jira workflows", root: "Jira", branches: SYLLABUS.devops.branches.slice(2) });
  SYLLABUS.bdps = Object.assign({}, SYLLABUS.pyspark, { kicker: "Big Data & PySpark syllabus", title: "From big data foundations to Spark pipelines", prefix: "bigdata" });
  SYLLABUS.devopsfull = Object.assign({}, SYLLABUS.devops, { kicker: "DevOps & Tools syllabus", title: "From Linux basics to agile teamwork", prefix: "linux" });

  let currentSubject = "sql";

  function syllabusTreeHtml(key) {
    const sub = SYLLABUS[key];
    const b = sub.branches;
    return `
      <div class="syl-mm">
        <div class="syl-root"><span>${esc(sub.root)}</span></div>
        <div class="syl-stem"></div>
        <div class="syl-bar" style="margin: 0 calc(50% / ${b.length})"></div>
        <div class="syl-cols" style="grid-template-columns: repeat(${b.length}, minmax(0,1fr))">
          ${b.map((x) => `
            <div class="syl-col" style="--c:${x.color}">
              <div class="syl-drop"></div>
              <div class="syl-branch">
                <button type="button" class="syl-node" aria-expanded="false">
                  <span class="syl-dot"></span>
                  <span class="syl-node-text"><strong>${esc(x.label)}</strong><small>${esc(x.sub)}</small></span>
                  <em class="syl-count">${x.items.length}</em>
                  <span class="syl-chev" aria-hidden="true">&#9656;</span>
                </button>
                <div class="syl-leaves"><div class="syl-leaves-inner">
                  <div class="syl-chips">${x.items.map((t) => `<code>${esc(t)}</code>`).join("")}</div>
                </div></div>
              </div>
            </div>`).join("")}
        </div>
      </div>`;
  }

  function buildSyllabusTree(key) {
    const sub = SYLLABUS[key];
    const divider = (label) => '<div class="syl-divider"><span>' + esc(label) + '</span></div>';
    let html = "";
    if (sub.prefix) html += syllabusTreeHtml(sub.prefix) + divider(SYLLABUS[sub.prefix].root + " on top of " + sub.root);
    html += syllabusTreeHtml(key);
    if (sub.suffix) html += divider(SYLLABUS[sub.suffix].root + " below " + sub.root) + syllabusTreeHtml(sub.suffix);
    $("#sqlTree").innerHTML = html;
    $$("#sqlTree .syl-node").forEach((btn) => {
      btn.addEventListener("click", () => setBranch(btn, btn.getAttribute("aria-expanded") !== "true"));
    });
  }

  function setBranch(btn, open) {
    btn.setAttribute("aria-expanded", String(open));
    btn.parentElement.classList.toggle("open", open);
  }

  function setAllBranches(open) {
    $$("#sqlTree .syl-node").forEach((btn) => setBranch(btn, open));
  }

  function openSyllabus(key) {
    const modal = $("#sqlModal");
    if (!modal || !SYLLABUS[key]) return;
    currentSubject = key;
    const sub = SYLLABUS[key];
    $("#sylKicker").textContent = sub.kicker;
    $("#sqlModalTitle").textContent = sub.title;
    sub.branches.forEach((x, i) => {
      $(`#sylLabel${i + 1}`).textContent = x.label;
    });
    document.querySelector(".syl-stats").hidden = !!sub.noStats;
    // Counts add up every tree on the panel, level by level. Unused levels hide their card.
    const layers = [sub.prefix, sub.suffix].filter(Boolean).map((k) => SYLLABUS[k].branches);
    const cards = [$("#sqlCountBasics"), $("#sqlCountInter"), $("#sqlCountWin")];
    cards.forEach((el, i) => {
      const own = sub.branches[i] ? sub.branches[i].items.length : 0;
      const extra = layers.reduce((n, br) => n + (br[i] ? br[i].items.length : 0), 0);
      const card = el.parentElement;
      card.hidden = !(sub.branches[i] || extra);
      el.textContent = own + extra;
    });
    buildSyllabusTree(key);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    setAllBranches(false);
    $("#sqlModalClose").focus();
  }

  function closeSqlModal() {
    const modal = $("#sqlModal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  // Skill tiles (SQL and Python)
  $$(".skill-link[data-syllabus]").forEach((tile) => {
    tile.addEventListener("click", () => openSyllabus(tile.dataset.syllabus));
    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSyllabus(tile.dataset.syllabus); }
    });
  });

  // Course cards (rendered later, so use delegation)
  $("#coursesGrid").addEventListener("click", (e) => {
    const card = e.target.closest(".course-card");
    const title = card?.querySelector("h3")?.textContent.trim() || "";
    if (title === "SQL Fundamentals") openSyllabus("sql");
    if (title === "Python & Data Processing") openSyllabus("python");
    if (title === "Big Data & PySpark") openSyllabus("bdps");
    if (title === "GCP Cloud Platform") openSyllabus("gcp");
    if (title === "DevOps & Tools") openSyllabus("devopsfull");
    if (title === "Interview & Job Ready") openSyllabus("jobready");
  });

  $$(".skill-open[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => openSyllabus(btn.dataset.open));
  });

  $("#sqlExpandAll").addEventListener("click", () => setAllBranches(true));
  $("#sqlCollapseAll").addEventListener("click", () => setAllBranches(false));
  $("#sqlModalClose").addEventListener("click", closeSqlModal);
  $("#sqlModal").addEventListener("click", (e) => { if (e.target.id === "sqlModal") closeSqlModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSqlModal(); });

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
