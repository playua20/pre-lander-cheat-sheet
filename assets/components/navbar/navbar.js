// Хамбургер + ресайз
document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-nav-toggle]");
    if (!t) return;
    const header = t.closest(".c-nav");
    const isOpen = header.classList.toggle("is-open");
    t.setAttribute("aria-expanded", String(isOpen));
    e.preventDefault();
});

let _w = innerWidth;
addEventListener("resize", () => {
    if (innerWidth === _w) return;
    _w = innerWidth;
    if (innerWidth >= 900) {
        document.querySelectorAll(".c-nav.is-open").forEach((n) => {
            n.classList.remove("is-open");
            const btn = n.querySelector("[data-nav-toggle]");
            if (btn) btn.setAttribute("aria-expanded", "false");
        });
    }
});
