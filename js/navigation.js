// Navigation active et indicateur de débordement horizontal.
(function () {
  const nav = document.querySelector("header nav");
  const wrap = document.querySelector("header .wrap");
  if (!nav || !wrap) return;

  function updateOverflow() {
    const overflows = nav.scrollWidth > nav.clientWidth + 2;
    wrap.classList.toggle("nav-overflows", overflows && nav.scrollLeft < nav.scrollWidth - nav.clientWidth - 2);
  }

  updateOverflow();
  window.addEventListener("resize", updateOverflow, { passive: true });
  nav.addEventListener("scroll", updateOverflow, { passive: true });
})();

(function () {
  const links = document.querySelectorAll('nav a[href^="#"]');
  const sections = Array.from(links)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
})();
