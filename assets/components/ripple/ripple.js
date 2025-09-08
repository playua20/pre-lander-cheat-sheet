// assets/components/ripple/ripple.js
(() => {
    "use strict";

    // Делегований ripple для .btn.ripple
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn.ripple");
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const ink = document.createElement("span");
        const size = Math.max(rect.width, rect.height);

        ink.className = "ripple-ink";
        Object.assign(ink.style, {
            position: "absolute",
            borderRadius: "50%",
            transform: "scale(0)",
            pointerEvents: "none",
            width: `${size}px`,
            height: `${size}px`,
            left: `${e.clientX - rect.left - size / 2}px`,
            top: `${e.clientY - rect.top - size / 2}px`,
            background: "rgba(255,255,255,.45)",
            animation: "ripple .6s ease-out",
        });

        // забезпечуємо позиціонування
        if (getComputedStyle(btn).position === "static") {
            btn.style.position = "relative";
        }
        btn.style.overflow = "hidden"; // ripple не виходить за межі кнопки

        btn.appendChild(ink);
        setTimeout(() => ink.remove(), 650);
    });

    // Додаємо CSS лише раз
    if (!document.getElementById("ripple-style")) {
        const st = document.createElement("style");
        st.id = "ripple-style";
        st.textContent = `
      @keyframes ripple {
        to { transform: scale(3); opacity: 0; }
      }
      .btn.ripple { position: relative; overflow: hidden; }
      .ripple-ink { will-change: transform, opacity; }
    `;
        document.head.appendChild(st);
    }

    console.info("[ripple] ready");
})();
