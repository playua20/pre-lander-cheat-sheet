// Open/close footer-scoped modals by links with [data-modal]
// Works even with many .c-foot blocks on the same page.
(function () {
    function getFoot(node) {
        return node && typeof node.closest === "function"
            ? node.closest(".c-foot")
            : document.querySelector(".c-foot");
    }

    function closeAll(foot) {
        if (!foot) return;
        foot.querySelectorAll(".c-modal").forEach((m) =>
            m.setAttribute("hidden", "true")
        );
        const ov = foot.querySelector(".c-overlay");
        if (ov) ov.setAttribute("hidden", "true");
    }

    document.addEventListener("click", (e) => {
        // Open
        const open = e.target.closest?.(".c-foot [data-modal]");
        if (open) {
            const foot = getFoot(open);
            const id = open.dataset.modal; // privacy | terms | disclosure | cookies
            const modal = foot?.querySelector(
                `.c-modal[data-modal-id="${id}"]`
            );
            if (foot && modal) {
                foot.querySelector(".c-overlay")?.removeAttribute("hidden");
                modal.removeAttribute("hidden");
                modal.querySelector("[data-close]")?.focus();
                e.preventDefault();
            }
            return;
        }

        // Close by X
        const closeBtn = e.target.closest?.(".c-foot [data-close]");
        if (closeBtn) {
            closeAll(getFoot(closeBtn));
            e.preventDefault();
            return;
        }

        // Close by overlay
        if (e.target.classList?.contains("c-overlay")) {
            closeAll(getFoot(e.target));
            e.preventDefault();
            return;
        }

        // Close by clicking backdrop area (inside .c-modal but outside .c-modal__box)
        const modal = e.target.closest?.(".c-foot .c-modal");
        if (modal && !e.target.closest(".c-modal__box")) {
            closeAll(getFoot(modal));
            e.preventDefault();
        }
    });

    // ESC to close the last opened modal
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        const openModal = document.querySelector(
            ".c-foot .c-modal:not([hidden])"
        );
        if (openModal) closeAll(getFoot(openModal));
    });
})();
