// assets/js/typography.js
import { PRESETS, state } from "./state.js";
import {
    filterCssByHtml,
    prependUsedVars,
    bundleSnippet,
    attachCopyChip,
    equalizeCodeHeights,
    copyTextWithFeedback,
    lighten,
    darken,
    randomFrom,
} from "./utils.js";

// ---- safe deep clone helper (глобальний) ----
const clone = (v) => {
    const sc =
        typeof window !== "undefined" ? window.structuredClone : undefined;
    if (typeof sc === "function") return sc(v);
    try {
        return JSON.parse(JSON.stringify(v));
    } catch {
        return v;
    }
};

/* ===== Color schemes (для Random) ===== */
const LIGHT_SCHEMES = [
    { bg: "#ffffff", text: "#1c2430", link: "#0a7c5e" },
    { bg: "#f6f7fb", text: "#101623", link: "#2563eb" },
    { bg: "#f0f4f8", text: "#0f172a", link: "#0ea5e9" },
    { bg: "#fffefb", text: "#16202f", link: "#14b8a6" },
    { bg: "#fafafa", text: "#212121", link: "#007bff" },
    { bg: "#f5f5f5", text: "#1a1a1a", link: "#3498db" },
    { bg: "#f2f7f9", text: "#1c2834", link: "#1abc9c" },
    { bg: "#f9f9e9", text: "#3c3c2f", link: "#c0392b" },
    { bg: "#e0f2fe", text: "#0f172a", link: "#0ea5e9" },
    { bg: "#f8f8f8", text: "#1f2937", link: "#9ca3af" },
    { bg: "#fdfbf6", text: "#2c2c2c", link: "#7b68ee" },
    { bg: "#f0f4f8", text: "#2d3748", link: "#4299e1" },
    { bg: "#f7f9fb", text: "#2c3e50", link: "#16a085" },
    { bg: "#fefdfc", text: "#1a202c", link: "#e67e22" },
    { bg: "#f1f5f9", text: "#101729", link: "#4a90e2" },
    { bg: "#f4f7f9", text: "#232b38", link: "#c16a5d" },
    { bg: "#e8eaf0", text: "#1b263b", link: "#2d7cbf" },
    { bg: "#fcfcfc", text: "#1d1d1d", link: "#6050e0" },
    { bg: "#f9f9f9", text: "#2a2a2a", link: "#5b9c74" },
    { bg: "#e8f3ff", text: "#172031", link: "#0085ff" },
    { bg: "#fff8f2", text: "#2d231e", link: "#ff6b6b" },
    { bg: "#eff6ff", text: "#1a2b3e", link: "#2563eb" },
    { bg: "#fbfcf5", text: "#2e3129", link: "#84cc16" },
    { bg: "#f6f6f6", text: "#2c2c2c", link: "#2b6cb0" },
    { bg: "#fafafa", text: "#1f2d3d", link: "#f59e0b" },
    { bg: "#f1f1f1", text: "#34495e", link: "#9b59b6" },
    { bg: "#e6f0ff", text: "#1c314f", link: "#1052a7" },
    { bg: "#f5f5f0", text: "#33332d", link: "#3498db" },
    { bg: "#fbf0f0", text: "#3c2020", link: "#e74c3c" },
    { bg: "#e6f2f2", text: "#1e3232", link: "#2ecc71" },
    { bg: "#fefefe", text: "#202020", link: "#ff69b4" },
    { bg: "#f0fdf4", text: "#1f2937", link: "#22c55e" },
    { bg: "#fff7ed", text: "#3b2313", link: "#f97316" },
    { bg: "#f5f3ff", text: "#312e81", link: "#6366f1" },
    { bg: "#ecfeff", text: "#0e7490", link: "#06b6d4" },
    { bg: "#fdf2f8", text: "#500724", link: "#db2777" },
    { bg: "#f3f4f6", text: "#111827", link: "#3b82f6" },
    { bg: "#f9fafb", text: "#030712", link: "#6b7280" },
    { bg: "#fffbeb", text: "#422006", link: "#eab308" },
    { bg: "#f7fee7", text: "#1a2e05", link: "#84cc16" },
    { bg: "#ecfccb", text: "#1a2e05", link: "#65a30d" },
    { bg: "#fff7fb", text: "#4a044e", link: "#d946ef" },
    { bg: "#faf5ff", text: "#4c1d95", link: "#8b5cf6" },
    { bg: "#fff1f2", text: "#4c0519", link: "#e11d48" },
    { bg: "#f0f9ff", text: "#0c4a6e", link: "#0ea5e9" },
    { bg: "#eff6ff", text: "#1e3a8a", link: "#3b82f6" },
    { bg: "#f9faff", text: "#2e1065", link: "#7c3aed" },
    { bg: "#fefce8", text: "#422006", link: "#ca8a04" },
    { bg: "#f1f5f9", text: "#0f172a", link: "#64748b" },
    { bg: "#f3e8ff", text: "#4c1d95", link: "#a855f7" },

    // залишимо й початкові “дефолтні” 4, щоб не втратити старі варіанти:
    { bg: "#fafbfe", text: "#1c2430", link: "#0a7c5e" },
    { bg: "#f6f7fb", text: "#232b36", link: "#0c7e7e" },
    { bg: "#fffaf2", text: "#2a2a2a", link: "#0b70c9" },
    { bg: "#ffffff", text: "#1f2937", link: "#4f46e5" },
];

const DARK_SCHEMES = [
    { bg: "#1c1c1e", text: "#e5e5e5", link: "#00a8ff" },
    { bg: "#212121", text: "#f5f5f5", link: "#76e191" },
    { bg: "#18191a", text: "#e9ebed", link: "#99c2ff" },
    { bg: "#242526", text: "#e4e6eb", link: "#51e3c8" },
    { bg: "#0d1222", text: "#c7d6e6", link: "#fcd34d" },
    { bg: "#202022", text: "#d9d9d9", link: "#ea4c89" },
    { bg: "#101014", text: "#d3d3d3", link: "#a3a6fe" },
    { bg: "#0e141a", text: "#e2e8f0", link: "#4dd3b1" },
    { bg: "#2d2d3a", text: "#e0e0e0", link: "#d4af37" },
    { bg: "#151515", text: "#f0f0f0", link: "#8e7cc3" },
    { bg: "#0a0d14", text: "#e6e8eb", link: "#5bd1a8" },
    { bg: "#1a1d23", text: "#e8e8e8", link: "#4aa0e9" },
    { bg: "#1f1b29", text: "#e9e6ec", link: "#d4af37" },
    { bg: "#0c0f16", text: "#ececec", link: "#a78bfa" },
    { bg: "#2b2b2b", text: "#e0e0e0", link: "#c04a44" },
    { bg: "#111827", text: "#f9fafb", link: "#60a5fa" },
    { bg: "#171717", text: "#f3f4f6", link: "#fbbf24" },
    { bg: "#1e1b4b", text: "#e0e7ff", link: "#a78bfa" },
    { bg: "#162e3b", text: "#d1d5db", link: "#34d399" },
    { bg: "#2c1a1d", text: "#fecaca", link: "#f43f5e" },

    // + попередні дефолтні 4:
    { bg: "#0b0c0f", text: "#e6e8ee", link: "#5bd1a8" },
    { bg: "#0e1015", text: "#dce2ea", link: "#35b0c6" },
    { bg: "#0f1115", text: "#e5e7eb", link: "#f59e0b" },
    { bg: "#111827", text: "#e5e7eb", link: "#60a5fa" },
];

// Зручний спільний список з міткою тону (щоб коректно підібрати hover)
const ALL_SCHEMES = [
    ...LIGHT_SCHEMES.map((s) => ({ ...s, __tone: "light" })),
    ...DARK_SCHEMES.map((s) => ({ ...s, __tone: "dark" })),
];

const HIGHLIGHT_CSS = `
.highlight{ padding:0 .25em }
.highlight-1{ background:linear-gradient(180deg,rgba(255,255,255,.0) 60%, rgba(255,239,120,.9) 60%) }
.highlight-2{ background:#ffeb3b; border-radius:4px }
.highlight-3{ box-shadow:inset 0 -8px 0 rgba(91,209,168,.35) }
.highlight-4{ outline:2px solid #5bd1a8; border-radius:6px }
.highlight-5{ text-decoration:underline wavy #ff6d6d 2px }
.highlight-6{ background:#c8e6c9; border-radius:999px; padding:.1em .5em }
.highlight-7{ background:#ffe0b2; border:1px dashed #ff9800; border-radius:6px; padding:.05em .3em }
.highlight-8{ background:linear-gradient(90deg, rgba(91,209,168,.25), rgba(91,209,168,.05)) }
.highlight-9{ background:linear-gradient(180deg, transparent 70%, rgba(0,0,0,.12) 0%) }
.highlight-10{ text-shadow:0 1px 0 #fff; background:linear-gradient(180deg,rgba(255,255,255,.65),rgba(255,255,255,.3)); border-radius:4px }
.highlight-11{ background:#e3f2fd; border-left:3px solid #2196f3; padding:.05em .35em }
.highlight-12{ box-shadow: inset 0 -6px 0 rgba(255,105,180,.35) }
.highlight-13{ background:#fff59d; border:1px dotted #fbc02d }
.highlight-14{ outline:2px dashed #9c27b0; border-radius:8px }
.highlight-15{ text-decoration: underline double #00897b 2px }
.highlight-16{ background:linear-gradient(90deg, rgba(33,150,243,.15), rgba(33,150,243,0)) }
.highlight-17{ background:#fce4ec; border:1px solid #f48fb1; border-radius:6px }
.highlight-18{ box-shadow:inset 0 -10px 0 rgba(76,175,80,.25) }
.highlight-19{ background:linear-gradient(180deg, transparent 65%, rgba(0,0,0,.08) 0%) }
.highlight-20{ background:#fff3e0; border-radius:4px; box-shadow: inset 0 0 0 1px #ffb74d }
`;

// assets/js/typography.js

// ===== add near the top =====
const TYPO_STORAGE_KEY = "typo-state@v1";

function saveTypographyState() {
    try {
        const payload = {
            id: state.current?.id,
            base: state.current?.base,
            overrides: state.overrides,
            colors: state.colorOverrides,
        };
        localStorage.setItem(TYPO_STORAGE_KEY, JSON.stringify(payload));
    } catch {}
}

function loadTypographyState() {
    try {
        const raw = localStorage.getItem(TYPO_STORAGE_KEY);
        if (!raw) return false;
        const saved = JSON.parse(raw);

        // знайдемо відповідний пресет, або fallback
        const preset = PRESETS.find((p) => p.id === saved.id) || PRESETS[0];

        state.current = clone(preset);

        if (typeof saved.base === "number") state.current.base = saved.base;
        if (saved.overrides && typeof saved.overrides === "object") {
            state.overrides = { ...state.overrides, ...saved.overrides };
        }
        if (saved.colors && typeof saved.colors === "object") {
            state.colorOverrides = { ...state.colorOverrides, ...saved.colors };
        }
        return true;
    } catch {
        return false;
    }
}

// ===== helper to re-render everything consistently =====
function reapplyAndPersist() {
    if (!state.current) return;
    applyStyles();
    applyColors();
    renderCSS();
    renderHTML();
    renderListLabels();
    equalizeCodeHeights?.();
    saveTypographyState();
}

// 1) renderFonts — ЄДИНА версія
function renderFonts() {
    const fontList = document.getElementById("fontList");
    if (!fontList) return;
    fontList.innerHTML = "";
    PRESETS.forEach((p, idx) => {
        const b = document.createElement("button");
        b.textContent = p.name;
        if (state.current?.id ? state.current.id === p.id : idx === 0)
            b.classList.add("active");
        b.addEventListener("click", () => {
            state.current = clone(p);
            state.overrides = { ul: "icon", ol: "disc" };
            fontList
                .querySelectorAll("button")
                .forEach((x) => x.classList.toggle("active", x === b));
            reapplyAndPersist(); // ← застосувати стилі + зберегти
            syncControls(); // ← підтягнути значення у селекти
        });
        fontList.appendChild(b);
    });
}

// ===== NEW: провайдер подій для контролів у сайдбарі =====
function wireTypographyControls() {
    // Base size
    const baseSize = document.getElementById("baseSize");
    if (baseSize) {
        baseSize.addEventListener("input", () => {
            const v = parseFloat(baseSize.value);
            if (!isNaN(v) && v > 0) {
                state.current.base = v;
                reapplyAndPersist();
            }
        });
    }

    // h1..h6 / p (size|weight|lh) через data-key
    document.querySelectorAll("[data-key]").forEach((sel) => {
        sel.addEventListener("change", () => {
            const key = sel.dataset.key; // напр. "h1.size" або "p.lh"
            let val = sel.value;
            if (key.endsWith(".size") || key.endsWith(".lh"))
                val = parseFloat(val);
            if (key.endsWith(".weight")) val = parseInt(val, 10);
            state.overrides[key] = val;
            reapplyAndPersist();
        });
    });

    // link / ul / ol
    const linkStyle = document.getElementById("linkStyle");
    const ulStyle = document.getElementById("ulStyle");
    const olStyle = document.getElementById("olStyle");

    if (linkStyle) {
        linkStyle.addEventListener("change", () => {
            state.overrides["link"] = linkStyle.value;
            reapplyAndPersist();
        });
    }
    if (ulStyle) {
        ulStyle.addEventListener("change", () => {
            state.overrides["ul"] = ulStyle.value;
            reapplyAndPersist();
        });
    }
    if (olStyle) {
        olStyle.addEventListener("change", () => {
            state.overrides["ol"] = olStyle.value;
            reapplyAndPersist();
        });
    }
}

// у wireColorPickers(): в кінці handler додай save
function wireColorPickers() {
    const keys = [
        "previewBg",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "a",
        "aHover",
        "bqText",
        "bqBg",
        "bqBorder",
    ];
    keys.forEach((k) => {
        const inp = document.getElementById(`color-${k}`);
        if (!inp) return;
        const handler = () => {
            state.colorOverrides[k] = inp.value;
            applyColors();
            renderCSS();
            saveTypographyState(); // ←
        };
        inp.addEventListener("input", handler);
        inp.addEventListener("change", handler);
    });
}

/* ===== helpers ===== */
function hOf(i) {
    return state.current.h[i];
}
function ensureStyle(id) {
    return (
        document.getElementById(id) ||
        (() => {
            const st = document.createElement("style");
            st.id = id;
            document.head.appendChild(st);
            return st;
        })()
    );
}

// Знімаємо префікс .preview зі стилів кольорів,
// щоб селектори відповідали <div class="content">…</div>
function normalizeColorCssForCopy(css) {
    if (!css) return "";
    // прибираємо rule самої .preview (фон прев’ю нам не потрібен у копії)
    css = css.replace(/\.preview\s*\{[\s\S]*?\}\s*/g, "");
    // знімаємо .preview перед селекторами: ".preview .content …" -> ".content …"
    css = css.replace(/(^|[\s,{])\.preview\s+/g, "$1");
    return css;
}

function ensureHighlightsGrid() {
    const content = document.querySelector("#typoPreview .content");
    if (!content || content.querySelector(".highlight-grid")) return;

    const items = Array.from(content.querySelectorAll("p")).filter((p) =>
        p.querySelector(".highlight")
    );

    if (!items.length) return;

    const grid = document.createElement("div");
    grid.className = "highlight-grid";
    content.insertBefore(grid, items[0]); // вставляємо перед першим прикладом
    items.forEach((p) => grid.appendChild(p)); // переносимо всі p з .highlight всередину
}

function fillSelect(el, arr, value) {
    el.innerHTML = "";
    arr.forEach((v) => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = String(v);
        if (String(v) === String(value)) opt.selected = true;
        el.appendChild(opt);
    });
}

/* ===== селекти параметрів ===== */
function syncControls() {
    const baseSize = document.getElementById("baseSize");
    if (baseSize) baseSize.value = state.current.base;

    const map = [];
    for (let i = 1; i <= 6; i++) {
        map.push(
            [`h${i}.size`, hOf(i).size],
            [`h${i}.weight`, hOf(i).weight],
            [`h${i}.lh`, hOf(i).lh]
        );
    }
    map.push(
        ["p.size", state.current.p.size],
        ["p.weight", state.current.p.weight],
        ["p.lh", state.current.p.lh]
    );

    document.querySelectorAll("[data-key]").forEach((sel) => {
        const found = map.find(([k]) => k === sel.dataset.key);
        if (!found) return;
        const val = state.overrides[sel.dataset.key] ?? found[1];
        if (sel.dataset.key.includes(".size"))
            fillSelect(sel, state.sizeOptions, val);
        else if (sel.dataset.key.includes(".weight"))
            fillSelect(sel, state.weightOptions, val);
        else if (sel.dataset.key.includes(".lh"))
            fillSelect(sel, state.lhOptions, val);
    });

    const linkStyle = document.getElementById("linkStyle");
    const ulStyle = document.getElementById("ulStyle");
    const olStyle = document.getElementById("olStyle");
    if (linkStyle) linkStyle.value = state.overrides["link"] ?? "underline";
    if (ulStyle) ulStyle.value = state.overrides["ul"] ?? "icon";
    if (olStyle) olStyle.value = state.overrides["ol"] ?? "disc";
}

/* ===== застосування стилів ===== */
function applyStyles() {
    const s = ensureStyle("typoStyle");
    const get = (k, f) => (k in state.overrides ? state.overrides[k] : f);

    const base = state.current.base;
    const fam = state.current.family;

    const h = {};
    for (let i = 1; i <= 6; i++) {
        const src = hOf(i);
        h[i] = {
            size: +get(`h${i}.size`, src.size),
            weight: parseInt(get(`h${i}.weight`, src.weight), 10),
            lh: +get(`h${i}.lh`, src.lh),
        };
    }
    const p = {
        size: +get("p.size", state.current.p.size),
        weight: parseInt(get("p.weight", state.current.p.weight), 10),
        lh: +get("p.lh", state.current.p.lh),
    };
    const link = get("link", "underline"),
        ul = get("ul", "icon"),
        ol = get("ol", "disc");

    const scope = document.getElementById("previewScope");
    scope?.classList.toggle(
        "hover-mode",
        link === "hover" || link === "hover-underline"
    );

    const ICON_URL =
        "https://api.iconify.design/ic:baseline-check-circle.svg?color=%23008000";

    let css = `/* Typography applied to .content */
.content{ font-family:${fam}; font-size:${base}px; }
.content h1{ font-size:${(base * h[1].size).toFixed(2)}px; line-height:${
        h[1].lh
    }; font-weight:${h[1].weight}; }
.content h2{ font-size:${(base * h[2].size).toFixed(2)}px; line-height:${
        h[2].lh
    }; font-weight:${h[2].weight}; }
.content h3{ font-size:${(base * h[3].size).toFixed(2)}px; line-height:${
        h[3].lh
    }; font-weight:${h[3].weight}; }
.content h4{ font-size:${(base * h[4].size).toFixed(2)}px; line-height:${
        h[4].lh
    }; font-weight:${h[4].weight}; }
.content h5{ font-size:${(base * h[5].size).toFixed(2)}px; line-height:${
        h[5].lh
    }; font-weight:${h[5].weight}; }
.content h6{ font-size:${(base * h[6].size).toFixed(2)}px; line-height:${
        h[6].lh
    }; font-weight:${h[6].weight}; }
.content p{  font-size:${(base * p.size).toFixed(2)}px; line-height:${
        p.lh
    }; font-weight:${p.weight}; }`;

    if (link === "hover")
        css += `.content a{ text-decoration:none } .content a:hover{ text-decoration:underline }`;
    else if (link === "hover-underline")
        css += `.content a{ text-decoration:underline; text-underline-offset:2px } .content a:hover{ text-decoration:underline; text-underline-offset:3px }`;
    else if (link === "none") css += `.content a{ text-decoration:none }`;
    else css += `.content a{ text-decoration:underline }`;

    if (ul === "icon") {
        css += `
.content ul{ list-style:none; padding-left:0 }
.content ul li{ position:relative; padding-left:28px }
.content ul li::before{
  content:""; position:absolute; top:50%; left:0; transform:translateY(-50%); width:18px; height:18px;
  background:url('${ICON_URL}') no-repeat center / 18px 18px;
}`;
    } else {
        css += `.content ul{ list-style:${ul}; }`;
    }
    css += `.content ol{ list-style:${ol}; }`;

    s.textContent = css;
    renderListLabels();
}

/* ===== рандомні кольори в превʼю ===== */
function applyColors() {
    const c = state.colorOverrides;
    // робимо таргет саме превʼю; якщо ID нема — fallback на .preview
    const hostSel = document.getElementById("typoPreview")
        ? "#typoPreview"
        : ".preview";

    const st = ensureStyle("colorStyle");
    // переміщаємо <style> у кінець <head>, щоб перекрити попередні стилі
    document.head.appendChild(st);

    st.textContent = `
${hostSel}{ background:${c.previewBg}; }
${hostSel} .content{ color:${c.p}; }
${hostSel} .content h1{ color:${c.h1}; }
${hostSel} .content h2{ color:${c.h2}; }
${hostSel} .content h3{ color:${c.h3}; }
${hostSel} .content h4{ color:${c.h4}; }
${hostSel} .content h5{ color:${c.h5}; }
${hostSel} .content h6{ color:${c.h6}; }
${hostSel} .content p{  color:${c.p}; }
${hostSel} .content a{ color:${c.a}; }
${hostSel} .content a:hover{ color:${c.aHover}; }
${hostSel} .content blockquote{ color:${c.bqText}; background:${c.bqBg}; border-left-color:${c.bqBorder}; }`;
}

/* ===== підписи до списків ===== */
function renderListLabels() {
    const ulSel = state.overrides["ul"] ?? "icon";
    const ulMap = {
        icon: "з іконкою",
        disc: "з точками",
        circle: "з точками",
        square: "з точками",
    };
    const ulText = ulMap[ulSel] || "з точками";
    const ulLabel = document.getElementById("ulLabel");
    const olLabel = document.getElementById("olLabel");
    if (ulLabel)
        ulLabel.innerHTML =
            '<span class="badge">&lt;ul&gt; + &lt;li&gt;</span> ' + ulText;
    if (olLabel)
        olLabel.innerHTML =
            '<span class="badge">&lt;ol&gt; + &lt;li&gt;</span> з точками';
}

/* ===== копі-чіпи у превʼю ===== */
export function wireTypographyCopyChips() {
    ensureStyle("highlightStyle").textContent = HIGHLIGHT_CSS;

    const content = document.querySelector("#typoPreview .content");
    if (!content) return;

    const getCssRaw = (isHighlight) => {
        const typoCss = document.getElementById("typoStyle")?.textContent || "";
        const colorCssRaw =
            document.getElementById("colorStyle")?.textContent || "";
        const colorCss = normalizeColorCssForCopy(colorCssRaw);
        const hlCss =
            document.getElementById("highlightStyle")?.textContent || "";

        // Для highlights — тільки їхні правила; інакше — типографіка + кольори + (за потреби) highlights
        return isHighlight
            ? hlCss
            : [typoCss, colorCss, hlCss].filter(Boolean).join("\n");
    };

    // ДОДАНО blockquote
    const targets = "h1,h2,h3,h4,h5,h6,p,ul,ol,blockquote";
    content.querySelectorAll(targets).forEach((el) => {
        el.classList.add("copy-target");

        attachCopyChip(
            el,
            () => {
                // 1) Клон та очищення службових елементів
                const clone = el.cloneNode(true);
                clone
                    .querySelectorAll(".badge, .dev-badge, .copy-chip")
                    .forEach((n) => n.remove());
                clone.classList.remove("copy-target");
                if ((clone.getAttribute("class") || "").trim() === "")
                    clone.removeAttribute("class");

                // 2) Якщо всередині є .highlight — копіюємо лише <span.highlight>
                let nodeToCopy = clone;
                let isHighlight = false;
                const hl = clone.querySelector(".highlight");
                if (hl) {
                    nodeToCopy = hl;
                    isHighlight = true;
                }

                const htmlOut = nodeToCopy.outerHTML.trim();

                // 3) Для highlights — фільтруємо тільки їх; інакше — загортаємо в .content
                const htmlForFilter = isHighlight
                    ? htmlOut
                    : `<div class="content">\n  ${htmlOut}\n</div>`;

                const cssFiltered = filterCssByHtml(
                    getCssRaw(isHighlight),
                    htmlForFilter
                );
                const cssWithVars = prependUsedVars(cssFiltered, el);

                return bundleSnippet(htmlOut, cssWithVars, "html-first");
            },
            "Copy"
        );
    });
}

/* ===== рендер CSS/HTML боксів ===== */
function renderCSS() {
    const baseStyles = `/* Базові стилі */
*{ box-sizing:border-box } html,body{ height:100% } html{ scroll-behavior:smooth }
body{ margin:0 } main{ flex-grow:1 } figure{ margin:0 } img{ max-width:100%; height:auto; display:block }`;
    const dynamic = document.getElementById("typoStyle")?.textContent || "";
    const c = state.colorOverrides;
    const colors = `
/* Кольори типографіки */
.content{ color:${c.p}; }
.content h1{ color:${c.h1}; } .content h2{ color:${c.h2}; } .content h3{ color:${c.h3}; }
.content h4{ color:${c.h4}; } .content h5{ color:${c.h5}; } .content h6{ color:${c.h6}; }
.content p{ color:${c.p}; } .content a{ color:${c.a}; } .content a:hover{ color:${c.aHover}; }
.content blockquote{ color:${c.bqText}; background:${c.bqBg}; border-left-color:${c.bqBorder}; }`;
    const css =
        baseStyles +
        "\n\n/* Типографіка */\n" +
        dynamic +
        "\n" +
        colors +
        "\n\n" +
        HIGHLIGHT_CSS;
    const out = document.getElementById("cssOutput");
    if (out) out.textContent = css;
}
function renderHTML() {
    const scope = document.getElementById("previewScope")?.cloneNode(true);
    if (!scope) return;
    scope.querySelectorAll(".badge, .dev-badge").forEach((n) => n.remove());
    const html = `<div class="content">\n    ${scope.innerHTML.trim()}\n</div>`;
    const out = document.getElementById("htmlOutput");
    if (out) out.textContent = html;
}

/* ===== Внутрішні вкладки типографіки (Preview/CSS/HTML) ===== */
function wireTypographyInnerTabs() {
    const host = document.getElementById("tab-typography");
    if (!host) return;
    const tabs = host.querySelectorAll(".inner-tab");
    const panels = host.querySelectorAll("[data-inner-panel]");
    tabs.forEach((btn) => {
        btn.addEventListener("click", () => {
            tabs.forEach((b) => b.setAttribute("aria-selected", "false"));
            btn.setAttribute("aria-selected", "true");
            const key = btn.dataset.inner;
            panels.forEach((p) => {
                p.hidden = p.dataset.innerPanel !== key;
            });
            equalizeCodeHeights?.();
        });
    });
}

/* ===== Сайдбар типографіки (акордеони, вкладки Шрифт/Кольори) ===== */
function wireTypographySidebar() {
    const host = document.getElementById("tab-typography");
    if (!host) return;

    // Вкладки Шрифт/Кольори
    const fontsTab = document.getElementById("sbFontsTab");
    const colorsTab = document.getElementById("sbColorsTab");
    const fontsPanel = document.getElementById("fontsPanel");
    const colorsPanel = document.getElementById("colorsPanel");

    const switchTo = (which) => {
        fontsTab?.setAttribute("aria-selected", String(which === "fonts"));
        colorsTab?.setAttribute("aria-selected", String(which === "colors"));
        if (fontsPanel) fontsPanel.hidden = which !== "fonts";
        if (colorsPanel) colorsPanel.hidden = which !== "colors";
    };
    fontsTab?.addEventListener("click", (e) => {
        e.preventDefault();
        switchTo("fonts");
    });
    colorsTab?.addEventListener("click", (e) => {
        e.preventDefault();
        switchTo("colors");
    });
    switchTo("fonts");

    // Акордеони
    const headers = host.querySelectorAll(".accordion-hdr");
    headers.forEach((hdr) => {
        // не submit-кнопка
        if (!hdr.getAttribute("type")) hdr.setAttribute("type", "button");

        // Знайти відповідне "тіло"
        const findBody = () => {
            const ctrl = hdr.getAttribute("aria-controls");
            if (ctrl) {
                const panel = document.getElementById(ctrl);
                if (panel) return panel;
            }
            // fallback: просто наступний елемент у DOM
            let n = hdr.nextElementSibling;
            // пропускаємо текстові ноди, якщо раптом
            while (n && n.nodeType !== 1) n = n.nextElementSibling;
            return n || null;
        };

        const body = findBody();

        // Початковий стан з aria-expanded
        const expandedNow = hdr.getAttribute("aria-expanded") === "true";
        if (body) body.hidden = !expandedNow;

        // Один єдиний обробник
        if (!hdr.dataset.wired) {
            hdr.dataset.wired = "1";
            hdr.addEventListener("click", (e) => {
                e.preventDefault();
                const expanded = hdr.getAttribute("aria-expanded") === "true";
                hdr.setAttribute("aria-expanded", String(!expanded));
                if (body) body.hidden = expanded;
            });
        }
    });

    // (необовʼязково) обертання стрілочки
    ensureStyle("accChevStyle").textContent = `
    .accordion-hdr .chev{ display:inline-block; transition:transform .2s ease; }
    .accordion-hdr[aria-expanded="false"] .chev{ transform:rotate(-90deg); }
  `;
}

/* ===== Copy buttons for CSS/HTML boxes ===== */
function wireCopyButtons() {
    document.getElementById("copyCssBtn")?.addEventListener("click", () => {
        copyTextWithFeedback(
            document.getElementById("cssOutput")?.textContent || "",
            document.getElementById("copyCssBtn")
        );
    });
    document.getElementById("copyHtmlBtn")?.addEventListener("click", () => {
        copyTextWithFeedback(
            document.getElementById("htmlOutput")?.textContent || "",
            document.getElementById("copyHtmlBtn")
        );
    });
}

/* ===== Randomize buttons ===== */
// 2) wireRandomize — ЄДИНА версія
function wireRandomize() {
    document
        .getElementById("randomizeTopBtn")
        ?.addEventListener("click", () => {
            const next = randomFrom(PRESETS);
            state.current = clone(next);
            reapplyAndPersist();
            renderFonts();
            syncControls();
        });
    document
        .getElementById("randomizeColorsBtn")
        ?.addEventListener("click", () => {
            const dark = document.body.classList.contains("theme-dark");
            const s = randomFrom(dark ? DARK_SCHEMES : LIGHT_SCHEMES);
            state.colorOverrides.previewBg = s.bg;
            state.colorOverrides.p = s.text;
            state.colorOverrides.h1 =
                state.colorOverrides.h2 =
                state.colorOverrides.h3 =
                state.colorOverrides.h4 =
                state.colorOverrides.h5 =
                state.colorOverrides.h6 =
                    s.text;
            state.colorOverrides.a = s.link;
            state.colorOverrides.aHover = dark
                ? lighten(s.link, 0.12)
                : darken(s.link, 0.12);
            reapplyAndPersist();
        });
}

// 3) initTypography — ЛИШЕ ОДНА export-версія
export function initTypography() {
    // Відновити з localStorage або взяти перший пресет
    if (!loadTypographyState()) {
        state.current = clone(PRESETS[0]);
    }
    renderFonts();
    syncControls();
    applyStyles();
    applyColors();
    renderCSS();
    renderHTML();
    renderListLabels();
    ensureHighlightsGrid();
    equalizeCodeHeights?.();
    wireTypographyCopyChips();
    wireTypographyInnerTabs();
    wireTypographySidebar();
    wireCopyButtons();
    wireRandomize();
    wireColorPickers();
    wireTypographyControls(); // ← підʼєднати обробники сайдбару
}

// ===== Safe auto-boot =====
let __typoBooted = false;

function __safeInitTypography() {
    if (__typoBooted) return;
    __typoBooted = true;
    try {
        initTypography(); // <-- це та ПЕРША export function вище у файлі
    } catch (e) {
        console.error("[typography] init failed:", e);
        __typoBooted = false; // дозволяємо повторити, якщо треба
    }
}

// Автоініт після побудови DOM (і тільки якщо є вкладка типографіки)
function __bootTypographyWhenReady() {
    if (document.getElementById("tab-typography")) {
        __safeInitTypography();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", __bootTypographyWhenReady, {
        once: true,
    });
} else {
    __bootTypographyWhenReady();
}
