// assets/components/callout/callout.js
import {
    attachCopyChip,
    filterCssByHtmlGeneric,
    equalizeCodeHeights,
    copyTextWithFeedback,
} from "../../js/utils.js";

const C_PATH = {
    css: "assets/components/callout/callout.css",
    btns: "assets/components/buttons/buttons.css", // + кнопки
    ripple: "assets/components/ripple/ripple.js", // + ripple (опціонально)
};

// JS, який копіюємо разом із HTML/CSS (закриття алерта)
const CALLOUTS_JS = `// Dismiss callout
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-dismiss="callout"]');
  if(!btn) return;
  const c = btn.closest('.callout');
  if(c) c.remove();
  e.preventDefault();
});`;

// 10 класичних + 4 квадратні (без округлень)
const ITEMS = [
    {
        html: `<div class="callout info">
  <div class="icon">ℹ</div>
  <div class="body"><strong>Heads up:</strong> This plan was updated recently. <a href="#">See what changed</a>.</div>
  <button class="x" aria-label="Close" data-dismiss="callout">×</button>
</div>`,
    },
    {
        html: `<div class="callout success"><div class="icon">✓</div><div class="body"><strong>Success!</strong> Your preferences were saved.</div></div>`,
    },
    {
        html: `<div class="callout warning"><div class="icon">!</div><div class="body"><strong>Warning:</strong> You’re approaching your monthly limit. <a href="#">Review options</a>.</div></div>`,
    },
    {
        html: `<div class="callout danger"><div class="icon">✕</div><div class="body"><strong>Error:</strong> Payment failed. Please <a href="#">update billing</a> or try again later.<div class="actions"><a class="btn outline" href="#">Retry</a><a class="btn link" href="#">Contact support</a></div></div></div>`,
    },
    {
        html: `<div class="callout neutral"><div class="icon">ⓘ</div><div class="body"><strong>Note:</strong> Results may vary based on your routine and diet.</div></div>`,
    },
    {
        html: `<div class="callout tip"><div class="icon">💡</div><div class="body"><strong>Pro tip:</strong> Drink 2 glasses of water 30 minutes before meals.</div></div>`,
    },
    {
        html: `<div class="callout note"><div class="icon">📝</div><div class="body"><strong>Remember:</strong> Take photos weekly for better progress tracking.</div></div>`,
    },
    {
        html: `<div class="callout promo"><div class="icon">🎁</div><div class="body"><strong>Limited offer:</strong> Save 30% today only.<div class="actions"><a class="btn cta-buy ripple" href="#">Get Deal</a></div></div></div>`,
    },
    {
        html: `<p>New routine is rolling out <span class="callout inline info">Beta</span>. Some features may change.</p>`,
    },
    {
        html: `<div class="callout banner"><div class="icon">⚠</div><div class="body"><strong>Maintenance:</strong> App will be read-only from 01:00–02:00 UTC.</div></div>`,
    },

    // — квадратні версії —
    {
        html: `<div class="callout info square"><div class="icon">ℹ</div><div class="body"><strong>Info:</strong> Square style alert.</div></div>`,
    },
    {
        html: `<div class="callout success square"><div class="icon">✓</div><div class="body"><strong>Success:</strong> Operation completed.</div></div>`,
    },
    {
        html: `<div class="callout warning square"><div class="icon">!</div><div class="body"><strong>Warning:</strong> Please check your inputs.</div></div>`,
    },
    {
        html: `<div class="callout danger square"><div class="icon">✕</div><div class="body"><strong>Error:</strong> Something went wrong.</div></div>`,
    },
];

async function fetchText(url) {
    try {
        const r = await fetch(url, { cache: "no-store" });
        return r.ok ? await r.text() : "";
    } catch {
        return "";
    }
}

export async function initCallouts() {
    const host = document.getElementById("calloutsDemo");
    if (!host || host.dataset.inited) return;
    host.dataset.inited = "1";

    const cssFull = await fetchText(C_PATH.css);
    const btnCssFull = await fetchText(C_PATH.btns);
    const rippleJsFull = await fetchText(C_PATH.ripple);

    host.innerHTML = "";
    ITEMS.forEach((item, i) => {
        const wrap = document.createElement("div");
        wrap.className = "std-demo-item";
        wrap.innerHTML = `<div class="dev-badge">${String(i + 1).padStart(
            2,
            "0"
        )}</div>${item.html}`;
        host.appendChild(wrap);

        const root = wrap.querySelector(".callout, p") || wrap;
        attachCopyChip(
            root,
            () => {
                const needsJs = !!root.querySelector(
                    '[data-dismiss="callout"]'
                );
                const needsRipple = !!root.querySelector(".ripple");

                const clone = root.cloneNode(true);
                clone
                    .querySelectorAll(".copy-chip,.dev-badge,.badge")
                    .forEach((n) => n.remove());
                const htmlOut = (
                    clone.outerHTML ||
                    clone.textContent ||
                    ""
                ).trim();

                // Фільтруємо обидва CSS під конкретний HTML
                const coCss = filterCssByHtmlGeneric(cssFull, htmlOut);
                const btnCss = filterCssByHtmlGeneric(btnCssFull, htmlOut);

                const cssCombined = [coCss, btnCss]
                    .filter(Boolean)
                    .join("\n\n");

                const parts = [
                    `<!-- ===== HTML ===== -->\n${htmlOut}`,
                    cssCombined ? `/* ===== CSS ===== */\n${cssCombined}` : "",
                ];

                if (needsJs) parts.push(`/* ===== JS ===== */\n${CALLOUTS_JS}`);
                if (needsRipple && rippleJsFull)
                    parts.push(
                        `/* ===== JS (ripple, optional) ===== */\n${rippleJsFull}`
                    );

                return parts.filter(Boolean).join("\n\n");
            },
            "Copy Callout"
        );
    });

    // Заповнюємо вкладки CSS/HTML/JS під демкою
    const cssOut = document.getElementById("calloutsCssOutput");
    const htmlOut = document.getElementById("calloutsHtmlOutput");
    const jsOut = document.getElementById("calloutsJsOutput");

    if (cssOut) cssOut.textContent = cssFull || "/* No CSS */";
    if (htmlOut)
        htmlOut.textContent = ITEMS.map(
            (x, i) => `<!-- ${String(i + 1).padStart(2, "0")} -->\n${x.html}`
        ).join("\n\n");
    if (jsOut) jsOut.textContent = CALLOUTS_JS;

    document
        .getElementById("copyCalloutsCssBtn")
        ?.addEventListener("click", () =>
            copyTextWithFeedback(
                cssOut?.textContent || "",
                document.getElementById("copyCalloutsCssBtn")
            )
        );
    document
        .getElementById("copyCalloutsHtmlBtn")
        ?.addEventListener("click", () =>
            copyTextWithFeedback(
                htmlOut?.textContent || "",
                document.getElementById("copyCalloutsHtmlBtn")
            )
        );
    document
        .getElementById("copyCalloutsJsBtn")
        ?.addEventListener("click", () =>
            copyTextWithFeedback(
                jsOut?.textContent || "",
                document.getElementById("copyCalloutsJsBtn")
            )
        );

    equalizeCodeHeights?.();
}
