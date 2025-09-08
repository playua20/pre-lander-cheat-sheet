// Disclosure / Advertisement modals (open/close)
(function () {
    function openByTrigger(tr) {
        const id = tr.getAttribute("data-disc-open");
        const host = tr.closest(".disc");
        const modal =
            host?.querySelector(`.disc-modal[data-disc="${id}"]`) ||
            document.querySelector(`.disc-modal[data-disc="${id}"]`);
        if (!modal) return;
        modal.hidden = false;
        modal.querySelector(".disc-x")?.focus();
    }
    function closeModal(node) {
        const m =
            node?.closest(".disc-modal") ||
            node?.closest(".disc")?.querySelector(".disc-modal:not([hidden])");
        if (m) m.hidden = true;
    }

    document.addEventListener("click", (e) => {
        // Open
        const open = e.target.closest?.("[data-disc-open]");
        if (open) {
            openByTrigger(open);
            e.preventDefault();
            return;
        }

        // Close by X or explicit close
        if (e.target.closest?.("[data-disc-close]")) {
            closeModal(e.target);
            e.preventDefault();
            return;
        }

        // Close by overlay
        const ov = e.target.closest?.(".disc-overlay");
        if (ov) {
            closeModal(ov);
            e.preventDefault();
            return;
        }

        // Close by clicking backdrop area (inside .disc-modal but outside .disc-box)
        const modal = e.target.closest?.(".disc-modal");
        if (modal && !e.target.closest(".disc-box")) {
            closeModal(modal);
            e.preventDefault();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        const open = document.querySelector(".disc .disc-modal:not([hidden])");
        if (open) closeModal(open);
    });
})();
