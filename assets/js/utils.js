/* assets/js/utils.js */

/* ---------- Unscooping ---------- */
export const UNSCOPE_RE = /\.std-demo\s+/g;
export const unscope = (code = "") =>
    String(code || "").replace(UNSCOPE_RE, "");

/* ---------- Універсальний фільтр CSS під HTML (підтримка @media/@supports/@layer/@keyframes) ---------- */
export function filterCssByHtmlGeneric(css, html) {
    css = String(css || "");
    html = String(html || "");

    // 1) Збираємо використані токени з HTML
    const usedClasses = new Set();
    const usedIds = new Set();
    const usedTags = new Set();

    html.replace(/class=["']([^"']+)["']/g, (_, cls) => {
        cls.trim()
            .split(/\s+/)
            .forEach((c) => usedClasses.add(c));
        return "";
    });
    html.replace(/id=["']([^"']+)["']/g, (_, id) => {
        usedIds.add(id);
        return "";
    });
    html.replace(/<([a-z][a-z0-9-]*)\b/gi, (_, tag) => {
        usedTags.add(tag.toLowerCase());
        return "";
    });

    // helpers
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    function descopeSelector(sel) {
        return sel
            .replace(/(^|[,\s])\.std-demo(?=[\s>+~#.:\[]|$)/g, "$1")

            .replace(/(^|[,\s])\.preview\s+\.content\s+/g, "$1")
            .replace(/(^|[,\s])\.content\s+/g, "$1")
            .trim();
    }

    function selectorMatchesNeed(sel) {
        const s = descopeSelector(sel);
        if (/^:root\b/.test(s)) return true;
        // дозволяємо theme-правила, якщо решта класів збігаються
        const classesInSel = Array.from(s.matchAll(/\.([a-z0-9_-]+)/gi))
            .map((m) => m[1])
            .filter(
                (c) => c !== "std-demo" && c !== "preview" && c !== "content"
            );
        const classesToCheck = classesInSel.filter((c) => !/^theme-/.test(c));
        if (classesToCheck.length) {
            // строго: всі класи селектора мають бути у фрагменті HTML
            return classesToCheck.every((c) => usedClasses.has(c));
        }
        // селектори без класів: лишаємо, якщо збігаються id або теги
        for (const id of usedIds) {
            const reId = new RegExp(`(^|[\\s>+~.,#])#${esc(id)}(?![\\w-])`);
            if (reId.test(s)) return true;
        }
        for (const t of usedTags) {
            const reTag = new RegExp(`(^|[\\s>+~])${esc(t)}(?![\\w-])`, "i");
            if (reTag.test(s)) return true;
        }
        return false;
    }

    function stripComments(str) {
        return str.replace(/\/\*[\s\S]*?\*\//g, "");
    }

    function parseBlocks(str) {
        const src = stripComments(str);
        const blocks = [];
        let i = 0,
            n = src.length;
        while (i < n) {
            while (i < n && /\s|;/.test(src[i])) i++;
            if (i >= n) break;
            const start = i;
            while (i < n && src[i] !== "{") i++;
            if (i >= n) break;
            const prelude = src.slice(start, i).trim();
            i++; // skip {
            let depth = 1;
            const bodyStart = i;
            while (i < n && depth > 0) {
                const ch = src[i];
                if (ch === "/" && src[i + 1] === "*") {
                    const j = src.indexOf("*/", i + 2);
                    i = j === -1 ? n : j + 2;
                    continue;
                }
                if (ch === "{") depth++;
                else if (ch === "}") depth--;
                i++;
            }
            const body = src.slice(bodyStart, i - 1);
            blocks.push({ prelude, body });
        }
        return blocks;
    }

    function filterInner(cssChunk) {
        const result = [];
        for (const { prelude, body } of parseBlocks(cssChunk)) {
            const p = prelude.trim();
            if (p.startsWith("@")) {
                const low = p.toLowerCase();
                if (low.startsWith("@keyframes")) {
                    result.push(`${p}{${body}}`);
                    continue;
                }
                if (
                    low.startsWith("@media") ||
                    low.startsWith("@supports") ||
                    low.startsWith("@layer")
                ) {
                    const inner = filterInner(body).trim();
                    if (inner) result.push(`${p}{${inner}}`);
                    continue;
                }
                result.push(`${p}{${body}}`);
                continue;
            }

            const selectors = p
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
            const keep = selectors.filter(selectorMatchesNeed);
            if (keep.length) {
                const cleaned = keep.map(descopeSelector).join(", ");
                result.push(`${cleaned}{${body}}`);
            }
        }
        return result.join("\n");
    }

    return filterInner(css).trim();
}

/* ---------- Copy helpers ---------- */
export function copyTextWithFeedback(text, btn) {
    return navigator.clipboard
        .writeText(String(text || ""))
        .catch(() => {
            const t = document.createElement("textarea");
            t.value = String(text || "");
            document.body.appendChild(t);
            t.select();
            try {
                document.execCommand("copy");
            } finally {
                document.body.removeChild(t);
            }
        })
        .finally(() => {
            if (!btn) return;
            const prev = btn.innerHTML;
            btn.dataset.state = "copied";
            btn.innerHTML = "✓ Скопійовано";
            setTimeout(() => {
                btn.dataset.state = "";
                btn.innerHTML = prev;
            }, 1100);
        });
}

export function attachCopyChip(targetEl, getText, label = "Copy") {
    if (!targetEl) return;
    let btn = targetEl.querySelector(":scope > .copy-chip");
    if (!btn) {
        btn = document.createElement("button");
        btn.className = "copy-chip";
        targetEl.appendChild(btn);
    }
    btn.textContent = label;
    btn.onclick = () => {
        const text =
            typeof getText === "function" ? getText() : String(getText || "");
        navigator.clipboard.writeText(text).then(() => {
            btn.dataset.state = "copied";
            setTimeout(() => (btn.dataset.state = ""), 1500);
        });
    };
}

/* ---------- Layout helpers ---------- */
export function equalizeCodeHeights() {
    const preview = document.getElementById("typoPreview");
    const target = Math.max(620, preview ? preview.offsetHeight : 0);
    [
        "cssOutput",
        "htmlOutput",
        "btnsCssOutput",
        "btnsHtmlOutput",
        "calloutsCssOutput",
        "calloutsHtmlOutput",
        "equalizeCodeHeights",
    ].forEach((id) => {
        const box = document.getElementById(id);
        if (box) box.style.minHeight = target + "px";
    });
}

export function setupTopTabs() {
    const tabs = document.querySelectorAll(".top-tab");
    const panels = Object.fromEntries(
        [
            ["typography", document.getElementById("tab-typography")],
            ["standard", document.getElementById("tab-standard")],
            ["interactive", document.getElementById("tab-interactive")],
        ].filter(([, el]) => !!el)
    );
    tabs.forEach((btn) => {
        if (btn.id === "themeBtn") return;
        btn.addEventListener("click", () => {
            tabs.forEach((b) => b.setAttribute("aria-selected", "false"));
            btn.setAttribute("aria-selected", "true");
            const key = btn.dataset.tab;
            Object.entries(panels).forEach(([k, el]) => {
                if (!el) return;
                el.dataset.active = k === key ? "true" : "";
                el.hidden = k !== key;
            });
            equalizeCodeHeights?.();
        });
    });
}

/* ---------- Small utils ---------- */
export function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
export function lighten(hex, pct = 0.1) {
    return _shade(hex, +pct);
}
export function darken(hex, pct = 0.1) {
    return _shade(hex, -pct);
}
function _shade(hex, pct) {
    const m = String(hex || "").replace("#", "");
    const num = parseInt(
        m.length === 3
            ? m
                  .split("")
                  .map((c) => c + c)
                  .join("")
            : m,
        16
    );
    let r = (num >> 16) & 255,
        g = (num >> 8) & 255,
        b = num & 255;
    r = Math.min(255, Math.max(0, Math.round(r + pct * 255)));
    g = Math.min(255, Math.max(0, Math.round(g + pct * 255)));
    b = Math.min(255, Math.max(0, Math.round(b + pct * 255)));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* ---------- API, на яке розраховують модулі ---------- */
// Для типографіки: відфільтрувати CSS під один елемент .content (або повернути як є)
export function filterCssByHtml(css, html) {
    css = String(css || "");
    html = String(html || "");
    if (!css || !html) return css;
    // Якщо у фрагменті є класи/теги/айді — використаємо потужніший фільтр
    return filterCssByHtmlGeneric(
        css,
        /class=|id=|<[a-z]/i.test(html)
            ? html
            : `<div class="content">${html}</div>`
    );
}
export function prependUsedVars(css) {
    return String(css || "");
}
export function restrictCssToRoots(css) {
    return String(css || "");
}

// Формує (CSS + HTML) у потрібному порядку
export function bundleSnippet(html = "", css = "", order = "css-first") {
    const cssBlock = css?.trim() ? `/* ===== CSS ===== */\n${css.trim()}` : "";
    const htmlBlock = html?.trim()
        ? `<!-- ===== HTML ===== -->\n${html.trim()}`
        : "";
    return order === "html-first"
        ? [htmlBlock, cssBlock].filter(Boolean).join("\n\n")
        : [cssBlock, htmlBlock].filter(Boolean).join("\n\n");
}
export function copyFrom(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    copyTextWithFeedback(el.textContent || "", null);
}
export function filterCssForBlocks(css, html) {
    return filterCssByHtmlGeneric(css, html);
}
