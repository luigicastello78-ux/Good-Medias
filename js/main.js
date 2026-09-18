(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // Header shadow + back-to-top
  const header = $(".header");
  const toTop = $(".to-top");
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 10);
    if (toTop) toTop.classList.toggle("show", y > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Mobile menu
  const toggle = $(".menu-toggle");
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$(".nav a[href^='#']").forEach((a) =>
    a.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Active nav link by section
  const navLinks = $$(".nav > ul > li > a[href^='#']");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  // Reveal on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  // Retention ring + counters
  const ring = $(".big-ring .fg");
  const counters = $$("[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        animateCount(e.target);
        if (ring && e.target.closest(".big-ring")) {
          ring.style.strokeDashoffset = 440 - (440 * parseFloat(e.target.dataset.count)) / 100;
        }
        countObserver.unobserve(e.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => countObserver.observe(c));

  // Process steps: highlight the one in view
  const steps = $$(".step");
  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) steps.forEach((s) => s.classList.toggle("is-active", s === e.target));
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  steps.forEach((s) => stepObserver.observe(s));

  // Testimonials slider
  const slides = $$(".t-slide");
  const dots = $(".t-dots");
  if (slides.length && dots) {
    let current = 0;
    let timer;
    slides.forEach(() => dots.appendChild(document.createElement("i")));
    const go = (i) => {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle("is-active", idx === current));
      $$("i", dots).forEach((d, idx) => d.classList.toggle("on", idx === current));
    };
    const auto = () => {
      clearInterval(timer);
      timer = setInterval(() => go(current + 1), 7000);
    };
    $(".t-nav .prev").addEventListener("click", () => { go(current - 1); auto(); });
    $(".t-nav .next").addEventListener("click", () => { go(current + 1); auto(); });
    go(0);
    auto();
  }

  // FAQ accordion
  $$(".faq-item").forEach((item) => {
    const btn = $(".faq-q", item);
    btn.addEventListener("click", () => {
      const open = !item.classList.contains("is-open");
      $$(".faq-item").forEach((i) => {
        i.classList.remove("is-open");
        $(".faq-q", i).setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open);
    });
  });

  // Forms (front-end only — wire to your form backend)
  const cta = $(".cta-form");
  if (cta) {
    cta.addEventListener("submit", (e) => {
      e.preventDefault();
      cta.classList.add("sent");
    });
  }
  const subscribe = $(".subscribe form");
  if (subscribe) {
    subscribe.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("input", e.target);
      input.value = "";
      input.placeholder = "Thanks — you're subscribed!";
    });
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
