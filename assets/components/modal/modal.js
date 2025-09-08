// Глобальні модалки через data-modal-*
document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-modal-open]");
    if (open) {
        const name = open.getAttribute("data-modal-open");
        const m = document.querySelector(`.c-modal[data-modal="${name}"]`);
        if (m) m.hidden = false;
        e.preventDefault();
        return;
    }
    const close = e.target.closest("[data-modal-close]");
    if (close) {
        const m = close.closest(".c-modal");
        if (m) m.hidden = true;
        e.preventDefault();
    }
});
