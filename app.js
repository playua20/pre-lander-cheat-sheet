// app.js
document.addEventListener("DOMContentLoaded", () => {
    // ===== УТИЛІТИ ДЛЯ "РОБОЧОГО" ЕКСПОРТУ (без .std-demo) =====
    const UNSCOPE_RE = /\.std-demo\s+/g; // прибирає лише префікс-прев'ю
    const unscope = (code = "") => code.replace(UNSCOPE_RE, "");

    // ===== Пресети (Verdana попереду) =====
    const PRESETS = [
        {
            id: "verdana-pro-tight",
            name: "Verdana Pro Tight",
            family: "Verdana, Geneva, Tahoma, sans-serif",
            base: 16,
            h: {
                1: { size: 2.4, weight: 800, lh: 1.12 },
                2: { size: 2.0, weight: 700, lh: 1.18 },
                3: { size: 1.68, weight: 700, lh: 1.22 },
                4: { size: 1.4, weight: 700, lh: 1.26 },
                5: { size: 1.18, weight: 700, lh: 1.3 },
                6: { size: 1.0, weight: 700, lh: 1.34 },
            },
            p: { size: 1.0, weight: 400, lh: 1.65 },
            link: "underline",
            ul: "disc",
            ol: "disc",
        },
        {
            id: "verdana-spacious",
            name: "Verdana Spacious",
            family: "Verdana, Geneva, Tahoma, sans-serif",
            base: 16,
            h: {
                1: { size: 2.5, weight: 800, lh: 1.12 },
                2: { size: 2.05, weight: 700, lh: 1.18 },
                3: { size: 1.75, weight: 700, lh: 1.22 },
                4: { size: 1.45, weight: 700, lh: 1.26 },
                5: { size: 1.2, weight: 700, lh: 1.3 },
                6: { size: 1.0, weight: 700, lh: 1.34 },
            },
            p: { size: 1.02, weight: 400, lh: 1.75 },
            link: "hover",
            ul: "disc",
            ol: "disc",
        },
        {
            id: "verdana-clean",
            name: "Verdana Clean",
            family: "Verdana, Geneva, Tahoma, sans-serif",
            base: 16,
            h: {
                1: { size: 2.35, weight: 800, lh: 1.15 },
                2: { size: 1.95, weight: 700, lh: 1.2 },
                3: { size: 1.6, weight: 700, lh: 1.25 },
                4: { size: 1.35, weight: 700, lh: 1.3 },
                5: { size: 1.15, weight: 700, lh: 1.35 },
                6: { size: 1.0, weight: 700, lh: 1.4 },
            },
            p: { size: 1.0, weight: 400, lh: 1.7 },
            link: "underline",
            ul: "disc",
            ol: "disc",
        },
        {
            id: "tahoma-compact",
            name: "Tahoma Compact",
            family: "Tahoma, Verdana, Segoe, sans-serif",
            base: 16,
            h: {
                1: { size: 2.2, weight: 800, lh: 1.15 },
                2: { size: 1.85, weight: 700, lh: 1.2 },
                3: { size: 1.55, weight: 700, lh: 1.25 },
                4: { size: 1.3, weight: 700, lh: 1.3 },
                5: { size: 1.12, weight: 700, lh: 1.35 },
                6: { size: 1.0, weight: 700, lh: 1.4 },
            },
            p: { size: 0.98, weight: 400, lh: 1.65 },
            link: "underline",
            ul: "disc",
            ol: "disc",
        },
        {
            id: "trebuchet-modern",
            name: "Trebuchet Modern",
            family: '"Trebuchet MS","Segoe UI",Tahoma,sans-serif',
            base: 16,
            h: {
                1: { size: 2.45, weight: 800, lh: 1.12 },
                2: { size: 2.0, weight: 700, lh: 1.18 },
                3: { size: 1.65, weight: 700, lh: 1.22 },
                4: { size: 1.38, weight: 700, lh: 1.28 },
                5: { size: 1.18, weight: 700, lh: 1.32 },
                6: { size: 1.0, weight: 700, lh: 1.36 },
            },
            p: { size: 1.02, weight: 400, lh: 1.7 },
            link: "hover",
            ul: "disc",
            ol: "disc",
        },
        {
            id: "arial-neutral",
            name: "Arial Neutral",
            family: "Arial, Helvetica, sans-serif",
            base: 16,
            h: {
                1: { size: 2.3, weight: 800, lh: 1.15 },
                2: { size: 1.9, weight: 700, lh: 1.2 },
                3: { size: 1.6, weight: 700, lh: 1.25 },
                4: { size: 1.35, weight: 700, lh: 1.28 },
                5: { size: 1.15, weight: 700, lh: 1.32 },
                6: { size: 1.0, weight: 700, lh: 1.36 },
            },
            p: { size: 1.0, weight: 400, lh: 1.68 },
            link: "underline",
            ul: "disc",
            ol: "disc",
        },
        {
            id: "system-ui",
            name: "System UI",
            family: 'system-ui,-apple-system,"Segoe UI",Roboto,Ubuntu,Cantarell,"Noto Sans","Helvetica Neue",Arial,sans-serif',
            base: 16,
            h: {
                1: { size: 2.4, weight: 800, lh: 1.12 },
                2: { size: 2.0, weight: 700, lh: 1.18 },
                3: { size: 1.7, weight: 700, lh: 1.22 },
                4: { size: 1.4, weight: 700, lh: 1.26 },
                5: { size: 1.2, weight: 700, lh: 1.3 },
                6: { size: 1.0, weight: 700, lh: 1.34 },
            },
            p: { size: 1.0, weight: 400, lh: 1.7 },
            link: "hover",
            ul: "disc",
            ol: "disc",
        },
        {
            id: "georgia-classic",
            name: "Georgia Classic (serif)",
            family: 'Georgia,"Times New Roman",Times,serif',
            base: 16,
            h: {
                1: { size: 2.5, weight: 800, lh: 1.12 },
                2: { size: 2.05, weight: 700, lh: 1.18 },
                3: { size: 1.75, weight: 700, lh: 1.2 },
                4: { size: 1.45, weight: 700, lh: 1.26 },
                5: { size: 1.2, weight: 700, lh: 1.3 },
                6: { size: 1.0, weight: 700, lh: 1.34 },
            },
            p: { size: 1.02, weight: 400, lh: 1.8 },
            link: "underline",
            ul: "disc",
            ol: "disc",
        },
        {
            id: "times-editorial",
            name: "Times Editorial (serif)",
            family: '"Times New Roman",Times,Georgia,serif',
            base: 16,
            h: {
                1: { size: 2.6, weight: 800, lh: 1.1 },
                2: { size: 2.1, weight: 700, lh: 1.16 },
                3: { size: 1.8, weight: 700, lh: 1.2 },
                4: { size: 1.5, weight: 700, lh: 1.26 },
                5: { size: 1.22, weight: 700, lh: 1.3 },
                6: { size: 1.0, weight: 700, lh: 1.34 },
            },
            p: { size: 1.02, weight: 400, lh: 1.78 },
            link: "underline",
            ul: "disc",
            ol: "disc",
        },
        {
            id: "palatino-readable",
            name: "Palatino Readable (serif)",
            family: '"Palatino Linotype","Book Antiqua",Palatino,Georgia,serif',
            base: 16,
            h: {
                1: { size: 2.45, weight: 800, lh: 1.12 },
                2: { size: 2.0, weight: 700, lh: 1.18 },
                3: { size: 1.7, weight: 700, lh: 1.22 },
                4: { size: 1.42, weight: 700, lh: 1.26 },
                5: { size: 1.18, weight: 700, lh: 1.3 },
                6: { size: 1.0, weight: 700, lh: 1.34 },
            },
            p: { size: 1.02, weight: 400, lh: 1.8 },
            link: "hover",
            ul: "disc",
            ol: "disc",
        },
        {
            id: "mono-doc",
            name: "Monospace Document",
            family: '"Courier New",Courier,"Lucida Console",Monaco,monospace',
            base: 16,
            h: {
                1: { size: 2.1, weight: 800, lh: 1.12 },
                2: { size: 1.8, weight: 700, lh: 1.18 },
                3: { size: 1.55, weight: 700, lh: 1.22 },
                4: { size: 1.35, weight: 700, lh: 1.28 },
                5: { size: 1.15, weight: 700, lh: 1.32 },
                6: { size: 1.0, weight: 700, lh: 1.36 },
            },
            p: { size: 0.98, weight: 400, lh: 1.7 },
            link: "none",
            ul: "square",
            ol: "disc",
        },
    ];

    // ===== Опції для селектів =====
    const sizeOptions = [
        0.9, 1.0, 1.05, 1.1, 1.15, 1.2, 1.3, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6,
    ];
    const weightOptions = [300, 400, 500, 600, 700, 800, 900];
    const lhOptions = [
        1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.5, 1.6, 1.7, 1.8,
    ];

    // ===== Стан =====
    let current = structuredClone(PRESETS[0]);
    let overrides = { ul: "icon", ol: "disc" };
    let colorOverrides = {
        previewBg: "#fafbfe",
        h1: "#1c2430",
        h2: "#1c2430",
        h3: "#1c2430",
        h4: "#1c2430",
        h5: "#1c2430",
        h6: "#1c2430",
        p: "#1c2430",
        a: "#0a7c5e",
        aHover: "#085f48",
        bqText: "#1c2430",
        bqBg: "#f1f4f8",
        bqBorder: "#b8c2cc",
    };

    // ===== Елементи =====
    const tabs = document.querySelectorAll(".top-tab");
    const tabPanels = {
        typography: document.getElementById("tab-typography"),
        standard: document.getElementById("tab-standard"),
        interactive: document.getElementById("tab-interactive"),
    };

    tabs.forEach((btn) => {
        if (btn.id === "themeBtn") return;
        btn.addEventListener("click", () => {
            tabs.forEach((b) => b.setAttribute("aria-selected", "false"));
            btn.setAttribute("aria-selected", "true");
            const key = btn.dataset.tab;
            Object.entries(tabPanels).forEach(([k, el]) => {
                el.dataset.active = k === key ? "true" : "";
                el.hidden = k !== key;
            });
            equalizeCodeHeights();
            addComponentNumbers();
        });
    });

    // Тема (світла/темна)
    document.getElementById("themeBtn").addEventListener("click", () => {
        const body = document.body;
        if (body.classList.contains("theme-dark")) {
            body.classList.remove("theme-dark");
            body.classList.add("theme-light");
            document.getElementById("themeBtn").textContent = "Тема: Light";
        } else {
            body.classList.remove("theme-light");
            body.classList.add("theme-dark");
            document.getElementById("themeBtn").textContent = "Тема: Dark";
        }
    });

    // ===== Сайдбар (між Шрифт/Кольори) =====
    const sbFontsTab = document.getElementById("sbFontsTab");
    const sbColorsTab = document.getElementById("sbColorsTab");
    const fontsPanel = document.getElementById("fontsPanel");
    const colorsPanel = document.getElementById("colorsPanel");
    sbFontsTab.addEventListener("click", () => {
        sbFontsTab.setAttribute("aria-selected", "true");
        sbColorsTab.setAttribute("aria-selected", "false");
        fontsPanel.hidden = false;
        colorsPanel.hidden = true;
    });
    sbColorsTab.addEventListener("click", () => {
        sbFontsTab.setAttribute("aria-selected", "false");
        sbColorsTab.setAttribute("aria-selected", "true");
        fontsPanel.hidden = true;
        colorsPanel.hidden = false;
    });

    // ===== Акордеон в Шрифт =====
    function toggleAccordion(openId) {
        const pairs = [
            ["accFonts", "accFontsBody"],
            ["accStyles", "accStylesBody"],
        ];
        pairs.forEach(([hdrId, bodyId]) => {
            const hdr = document.getElementById(hdrId);
            const body = document.getElementById(bodyId);
            const open = hdrId === openId;
            hdr.setAttribute("aria-expanded", open ? "true" : "false");
            body.hidden = !open;
        });
    }
    document
        .getElementById("accFonts")
        .addEventListener("click", () => toggleAccordion("accFonts"));
    document
        .getElementById("accStyles")
        .addEventListener("click", () => toggleAccordion("accStyles"));

    // ===== Рендер списку шрифтів =====
    const fontList = document.getElementById("fontList");
    function renderFonts() {
        fontList.innerHTML = "";
        PRESETS.forEach((p) => {
            const b = document.createElement("button");
            b.textContent = p.name;
            if (p.id === current.id) b.classList.add("active");
            b.addEventListener("click", () => {
                current = structuredClone(PRESETS.find((x) => x.id === p.id));
                overrides = { ul: "icon", ol: "disc" };
                applyStyles();
                syncControls();
                renderCSS();
                renderHTML();
                renderListLabels();
                renderFonts();
                equalizeCodeHeights();
            });
            fontList.appendChild(b);
        });
    }
    renderFonts();

    // ===== Допоміжні =====
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

    function syncControls() {
        document.getElementById("baseSize").value = current.base;
        const map = [
            ["h1.size", current.h[1].size],
            ["h2.size", current.h[2].size],
            ["h3.size", current.h[3].size],
            ["h4.size", current.h[4].size],
            ["h5.size", current.h[5].size],
            ["h6.size", current.h[6].size],
            ["h1.weight", current.h[1].weight],
            ["h2.weight", current.h[2].weight],
            ["h3.weight", current.h[3].weight],
            ["h4.weight", current.h[4].weight],
            ["h5.weight", current.h[5].weight],
            ["h6.weight", current.h[6].weight],
            ["h1.lh", current.h[1].lh],
            ["h2.lh", current.h[2].lh],
            ["h3.lh", current.h[3].lh],
            ["h4.lh", current.h[4].lh],
            ["h5.lh", current.h[5].lh],
            ["h6.lh", current.h[6].lh],
            ["p.size", current.p.size],
            ["p.weight", current.p.weight],
            ["p.lh", current.p.lh],
        ];
        document.querySelectorAll("[data-key]").forEach((sel) => {
            const found = map.find(([k]) => k === sel.dataset.key);
            if (!found) return;
            const val = overrides[sel.dataset.key] ?? found[1];
            if (sel.dataset.key.includes(".size"))
                fillSelect(sel, sizeOptions, val);
            else if (sel.dataset.key.includes(".weight"))
                fillSelect(sel, weightOptions, val);
            else if (sel.dataset.key.includes(".lh"))
                fillSelect(sel, lhOptions, val);
        });
        document.getElementById("linkStyle").value =
            overrides["link"] ?? current.link;
        document.getElementById("ulStyle").value =
            overrides["ul"] ?? current.ul;
        document.getElementById("olStyle").value =
            overrides["ol"] ?? current.ol;
    }

    function applyStyles() {
        const s = document.getElementById("typoStyle");
        const get = (k, fallback) => (k in overrides ? overrides[k] : fallback);
        const base = current.base;
        const fam = current.family;

        const h = {};
        for (let i = 1; i <= 6; i++) {
            h[i] = {
                size: parseFloat(get(`h${i}.size`, current.h[i].size)),
                weight: parseInt(get(`h${i}.weight`, current.h[i].weight), 10),
                lh: parseFloat(get(`h${i}.lh`, current.h[i].lh)),
            };
        }
        const p = {
            size: parseFloat(get("p.size", current.p.size)),
            weight: parseInt(get("p.weight", current.p.weight), 10),
            lh: parseFloat(get("p.lh", current.p.lh)),
        };
        const link = get("link", current.link);
        const ul = get("ul", current.ul);
        const ol = get("ol", current.ol);

        const scope = document.getElementById("previewScope");
        scope.classList.toggle(
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
.content p{ font-size:${(base * p.size).toFixed(2)}px; line-height:${
            p.lh
        }; font-weight:${p.weight}; }
`;

        if (link === "hover") {
            css += `.content a{ text-decoration:none }
.content a:hover{ text-decoration:underline }`;
        } else if (link === "hover-underline") {
            css += `.content a{ text-decoration:underline; text-underline-offset:2px }
.content a:hover{ text-decoration:underline; text-underline-offset:3px }`;
        } else if (link === "none") {
            css += `.content a{ text-decoration:none }`;
        } else {
            css += `.content a{ text-decoration:underline }`;
        }

        if (ul === "icon") {
            css += `
.content ul{ list-style:none; padding-left:0 }
.content ul li{ position:relative; padding-left:28px }
.content ul li::before{
  content:""; position:absolute; top:50%; left:0; transform:translateY(-50%); width:18px; height:18px;
  background:url('${ICON_URL}') no-repeat center / 18px 18px;
}`;
        } else {
            css += `
.content ul{ list-style:${ul}; }`;
        }
        css += `
.content ol{ list-style:${ol}; }`;

        s.textContent = css;
        renderListLabels();
    }

    function renderListLabels() {
        const ulSel = overrides["ul"] ?? current.ul;
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

    // Події контролів шрифтів
    document.getElementById("baseSize").addEventListener("input", (e) => {
        const v = Math.max(12, Math.min(22, Number(e.target.value || 16)));
        current.base = v;
        applyStyles();
        renderCSS();
        equalizeCodeHeights();
    });
    document.querySelectorAll("[data-key]").forEach((sel) => {
        sel.addEventListener("change", (e) => {
            const key = sel.dataset.key;
            overrides[key] = Number(e.target.value);
            applyStyles();
            renderCSS();
            equalizeCodeHeights();
        });
    });
    document.getElementById("linkStyle").addEventListener("change", (e) => {
        overrides["link"] = e.target.value;
        applyStyles();
        renderCSS();
        equalizeCodeHeights();
    });
    document.getElementById("ulStyle").addEventListener("change", (e) => {
        overrides["ul"] = e.target.value;
        applyStyles();
        renderCSS();
        equalizeCodeHeights();
    });
    document.getElementById("olStyle").addEventListener("change", (e) => {
        overrides["ol"] = e.target.value;
        applyStyles();
        renderCSS();
        equalizeCodeHeights();
    });
    document.getElementById("resetBtn").addEventListener("click", () => {
        overrides = { ul: "icon", ol: "disc" };
        applyStyles();
        syncControls();
        renderCSS();
        renderListLabels();
        equalizeCodeHeights();
    });

    // ===== Рандомна типографіка =====
    function randomizeAll() {
        const rand = (min, max, step = 0.01) =>
            Math.round((min + Math.random() * (max - min)) / step) * step;
        current.base = Math.round(rand(15, 18, 1));
        const h6 = rand(1.0, 1.06, 0.01);
        const h5 = rand(h6 + 0.1, 1.25, 0.01);
        const h4 = rand(h5 + 0.1, 1.45, 0.01);
        const h3 = rand(h4 + 0.15, 1.75, 0.01);
        const h2 = rand(h3 + 0.2, 2.1, 0.01);
        const h1 = rand(h2 + 0.25, 2.6, 0.01);
        overrides["h1.size"] = h1;
        overrides["h2.size"] = h2;
        overrides["h3.size"] = h3;
        overrides["h4.size"] = h4;
        overrides["h5.size"] = h5;
        overrides["h6.size"] = h6;
        [1, 2, 3, 4, 5, 6].forEach((i) => {
            overrides[`h${i}.weight`] = [600, 700, 800][
                Math.floor(Math.random() * 3)
            ];
            overrides[`h${i}.lh`] = [1.12, 1.15, 1.18, 1.22, 1.26, 1.3, 1.34][
                Math.floor(Math.random() * 7)
            ];
        });
        overrides["p.size"] = rand(0.96, 1.06, 0.01);
        overrides["p.weight"] = [400, 400, 500][Math.floor(Math.random() * 3)];
        overrides["p.lh"] = [1.6, 1.65, 1.7, 1.75, 1.8][
            Math.floor(Math.random() * 5)
        ];
        overrides["link"] = ["underline", "hover", "hover-underline", "none"][
            Math.floor(Math.random() * 4)
        ];
        overrides["ul"] = ["disc", "circle", "square", "icon"][
            Math.floor(Math.random() * 4)
        ];
        overrides["ol"] = [
            "disc",
            "decimal",
            "decimal-leading-zero",
            "lower-alpha",
        ][Math.floor(Math.random() * 4)];
        applyStyles();
        syncControls();
        renderCSS();
        renderListLabels();
        equalizeCodeHeights();
    }
    document
        .getElementById("randomizeTopBtn")
        .addEventListener("click", randomizeAll);

    // ===== Кольори (preview-only) =====
    const colorIds = [
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
    colorIds.forEach((key) => {
        const el = document.getElementById("color-" + key);
        if (!el) return;
        el.addEventListener("input", (e) => {
            colorOverrides[key] = e.target.value;
            applyColors();
            renderCSS();
        });
    });

    function applyColors() {
        const c = colorOverrides;
        const s = document.getElementById("colorStyle");
        s.textContent = `/* Кольори застосовані лише до Preview (не зачіпають бейджі) */
.preview{ background:${c.previewBg}; }
.preview .content{ color:${c.p}; }
.preview .content h1{ color:${c.h1}; }
.preview .content h2{ color:${c.h2}; }
.preview .content h3{ color:${c.h3}; }
.preview .content h4{ color:${c.h4}; }
.preview .content h5{ color:${c.h5}; }
.preview .content h6{ color:${c.h6}; }
.preview .content p{ color:${c.p}; }
.preview .content a{ color:${c.a}; }
.preview .content a:hover{ color:${c.aHover}; }
.preview .content blockquote{ color:${c.bqText}; background:${c.bqBg}; border-left-color:${c.bqBorder}; }`;
    }

    // Рандомні кольори (корисні утиліти)
    function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }
    function hex(n) {
        n = clamp(Math.round(n), 0, 255);
        return n.toString(16).padStart(2, "0");
    }
    function lighten(col, amt) {
        const r = parseInt(col.slice(1, 3), 16),
            g = parseInt(col.slice(3, 5), 16),
            b = parseInt(col.slice(5, 7), 16);
        const k = amt;
        return (
            "#" +
            hex(r + (255 - r) * k) +
            hex(g + (255 - g) * k) +
            hex(b + (255 - b) * k)
        );
    }
    function darken(col, amt) {
        const r = parseInt(col.slice(1, 3), 16),
            g = parseInt(col.slice(3, 5), 16),
            b = parseInt(col.slice(5, 7), 16);
        const k = 1 - amt;
        return "#" + hex(r * k) + hex(g * k) + hex(b * k);
    }

    // ---- Highlight variants (в окремому стилі для прев’ю і копіювання)
    const HIGHLIGHT_CSS = `
/* Highlight variants */
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

    function ensureHighlightStyle() {
        let st = document.getElementById("highlightStyle");
        if (!st) {
            st = document.createElement("style");
            st.id = "highlightStyle";
            document.head.appendChild(st);
        }
        st.textContent = HIGHLIGHT_CSS;
    }

    function filterCssByHtml(css, html, opts = {}) {
        css = String(css || "").replace(/\/\*[\s\S]*?\*\//g, "");
        const host = document.createElement("div");
        host.innerHTML = String(html || "");
        const keepScope = !!opts.keepScope;

        const usedAnimations = new Set();
        const keyframesMap = new Map();

        const stripScope = (sel) => {
            // якщо keepScope=true — НЕ знімаємо .std-demo/.content; прибираємо лише .preview
            let s = sel;
            if (!keepScope) {
                s = s
                    .replace(/(^|[\s>+~])\.std-demo(?=[\s>+~.#[:]|$)/g, "$1")
                    .replace(/(^|[\s>+~])\.content(?=[\s>+~.#[:]|$)/g, "$1");
            }
            s = s
                .replace(/(^|[\s>+~])\.preview(?=[\s>+~.#[:]|$)/g, "$1__DROP__")
                .replace(/\s+/g, " ")
                .replace(/^[>+~]\s*/, "")
                .trim();
            return s;
        };

        const selectorMatches = (sel) => {
            const q = stripScope(sel);
            if (!q || q.includes("__DROP__")) return false;
            try {
                return host.querySelector(q) !== null;
            } catch {
                return false; // некоректні селектори пропускаємо
            }
        };

        const collectAnimations = (body) => {
            const scan = (prop) => {
                let m;
                const re = new RegExp(prop + "\\s*:\\s*([^;]+);", "g");
                while ((m = re.exec(body))) {
                    const chunk = m[1];
                    chunk.split(",").forEach((part) => {
                        part.trim()
                            .split(/\s+/)
                            .forEach((t) => {
                                if (
                                    /^[a-zA-Z_][\w-]*$/.test(t) && // схоже на ім'я
                                    !/^(none|infinite|normal|reverse|alternate|forwards|backwards|both|running|paused|ease|linear|ease-in|ease-out|ease-in-out|initial|inherit|unset|revert)$/i.test(
                                        t
                                    ) &&
                                    !/^\d+m?s$/.test(t) &&
                                    !/^\d+(\.\d+)?$/.test(t) &&
                                    !/(steps|cubic-bezier|var)\(/.test(t)
                                ) {
                                    usedAnimations.add(t);
                                }
                            });
                    });
                }
            };
            scan("animation");
            scan("animation-name");
        };

        const processSegment = (seg) => {
            let i = 0;
            const n = seg.length;
            const out = [];

            const readBlock = () => {
                if (seg[i] !== "{") return "";
                let depth = 0;
                const start = i;
                while (i < n) {
                    const ch = seg[i++];
                    if (ch === "{") depth++;
                    else if (ch === "}") {
                        depth--;
                        if (depth === 0) break;
                    }
                }
                return seg.slice(start + 1, i - 1);
            };

            while (i < n) {
                // пропустити пробіли
                while (i < n && /\s/.test(seg[i])) i++;
                if (i >= n) break;

                if (seg[i] === "@") {
                    const m = seg.slice(i).match(/^@([a-zA-Z-]+)/);
                    if (!m) {
                        i++;
                        continue;
                    }
                    const at = m[1];
                    i += m[0].length;

                    // прелюдія (умова) до блоку
                    const preludeStart = i;
                    while (i < n && seg[i] !== "{" && seg[i] !== ";") i++;
                    const prelude = seg.slice(preludeStart, i).trim();

                    if (seg[i] === ";") {
                        i++;
                        continue;
                    }
                    if (seg[i] === "{") {
                        const inner = readBlock();

                        if (/keyframes$/i.test(at)) {
                            const name =
                                (prelude.match(/([a-zA-Z_][\w-]*)/) || [])[1] ||
                                prelude;
                            keyframesMap.set(
                                name,
                                `@${at} ${prelude}{${inner}}`
                            );
                        } else if (at === "media" || at === "supports") {
                            const filteredInner = processSegment(inner);
                            if (filteredInner.trim()) {
                                out.push(
                                    `@${at} ${prelude}{\n${filteredInner}\n}`
                                );
                            }
                        } else if (at === "font-face" || at === "page") {
                            // залишаємо як є (може знадобитись)
                            out.push(`@${at} ${prelude}{${inner}}`);
                        } else {
                            // інші @-блоки — теж як є
                            out.push(`@${at} ${prelude}{${inner}}`);
                        }
                    }
                } else {
                    // звичайне правило
                    const selStart = i;
                    while (i < n && seg[i] !== "{") i++;
                    const selectors = seg.slice(selStart, i).trim();
                    const body = readBlock();
                    if (!selectors || !body) continue;

                    const kept = [];
                    selectors
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .forEach((s) => {
                            if (s.includes(".preview")) return;
                            if (selectorMatches(s)) {
                                const outSel = stripScope(s);
                                if (outSel && outSel !== "__DROP__")
                                    kept.push(outSel);
                            }
                        });

                    if (kept.length) {
                        collectAnimations(body);
                        out.push(
                            `${Array.from(new Set(kept)).join(", ")}{${body}}`
                        );
                    }
                }
            }

            return out.join("\n");
        };

        const filteredCore = processSegment(css);

        // додати :root якщо у відібраному CSS є var(--...)
        let rootBlock = "";
        const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
        if (rootMatch && /var\(--/.test(filteredCore)) {
            rootBlock = `:root{${rootMatch[1]}}`;
        }

        // додати лише потрібні keyframes
        const kfOut = [];
        usedAnimations.forEach((name) => {
            if (keyframesMap.has(name)) kfOut.push(keyframesMap.get(name));
        });

        return [rootBlock, filteredCore, kfOut.join("\n")]
            .filter(Boolean)
            .join("\n");
    }

    // Залишає лише селектори, що містять хоча б один з "root" токенів (.nav, .crumbs, ...)
    function restrictCssToRoots(css, roots = []) {
        if (!roots || !roots.length) return css;
        const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const keepSel = (sel) => {
            const s = sel.trim();
            if (!s) return false;
            // дозволяємо глобальні речі, якщо лишилися (рідко)
            if (/^@/.test(s)) return true;
            // хоча б один root-токен у селекторі
            return roots.some((token) => {
                const re = new RegExp(
                    `(^|[\\s>+~.,#\\[])+${esc(token)}(?=$|[\\s>+~.,#:\\[])`
                );
                return re.test(s);
            });
        };

        // легкий парсер: @-блоки обробляємо рекурсивно
        function pass(seg) {
            let i = 0,
                out = "",
                n = seg.length;
            const readBlock = () => {
                let depth = 0,
                    start = i;
                while (i < n) {
                    const ch = seg[i++];
                    if (ch === "{") depth++;
                    else if (ch === "}" && --depth === 0) break;
                }
                return seg.slice(start + 1, i - 1);
            };
            while (i < n) {
                while (/\s/.test(seg[i] || "")) i++;
                if (i >= n) break;

                if (seg[i] === "@") {
                    const m = seg.slice(i).match(/^@([a-zA-Z-]+)/);
                    if (!m) {
                        i++;
                        continue;
                    }
                    const at = m[1];
                    i += m[0].length;
                    const preludeStart = i;
                    while (i < n && seg[i] !== "{" && seg[i] !== ";") i++;
                    const prelude = seg.slice(preludeStart, i).trim();
                    if (seg[i] === ";") {
                        i++;
                        continue;
                    }
                    const inner = readBlock();
                    if (/keyframes$/i.test(at)) {
                        // keyframes пропускаємо як є (ми вже відсікли зайве до цього)
                        out += `@${at} ${prelude}{${inner}}\n`;
                    } else {
                        const filtered = pass(inner).trim();
                        if (filtered)
                            out += `@${at} ${prelude}{\n${filtered}\n}\n`;
                    }
                } else {
                    const selStart = i;
                    while (i < n && seg[i] !== "{") i++;
                    const sels = seg.slice(selStart, i).trim();
                    const body = readBlock();
                    if (!sels || !body) continue;
                    const kept = sels
                        .split(",")
                        .map((s) => s.trim())
                        .filter(keepSel);
                    if (kept.length) out += `${kept.join(", ")}{${body}}\n`;
                }
            }
            return out;
        }
        return pass(css);
    }

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
    ];

    const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    function randomizeColors() {
        const useDark = Math.random() < 0.35;
        const s = useDark
            ? randomFrom(DARK_SCHEMES)
            : randomFrom(LIGHT_SCHEMES);
        const baseText = s.text;
        const accent = s.link;
        colorOverrides.previewBg = s.bg;
        colorOverrides.h1 = darken(baseText, useDark ? -0.2 : 0.2);
        colorOverrides.h2 = darken(baseText, useDark ? -0.15 : 0.15);
        colorOverrides.h3 = baseText;
        colorOverrides.h4 = baseText;
        colorOverrides.h5 = lighten(baseText, useDark ? -0.05 : 0.05);
        colorOverrides.h6 = lighten(baseText, useDark ? -0.08 : 0.08);
        colorOverrides.p = baseText;
        colorOverrides.a = accent;
        colorOverrides.aHover = useDark
            ? lighten(accent, 0.1)
            : darken(accent, 0.15);
        colorOverrides.bqText = baseText;
        colorOverrides.bqBg = useDark ? "#1b1f2a" : "#f1f4f8";
        colorOverrides.bqBorder = useDark ? "#3a4150" : "#b8c2cc";
        applyColors();
        renderCSS();
    }
    document
        .getElementById("randomizeColorsBtn")
        .addEventListener("click", randomizeColors);

    // ===== Внутрішні вкладки (типографіка + всі std-групи) — СКОПЛЕНО =====
    document.body.addEventListener("click", (e) => {
        const btn = e.target.closest(".inner-tab");
        if (!btn) return;

        // працюємо тільки в межах поточної групи або панелі типографіки
        const scope = btn.closest(".std-group") || btn.closest(".panel");
        if (!scope) return;

        scope
            .querySelectorAll(".inner-tab")
            .forEach((b) => b.setAttribute("aria-selected", "false"));
        btn.setAttribute("aria-selected", "true");

        const key = btn.dataset.inner;
        scope
            .querySelectorAll("[data-inner-panel]")
            .forEach((p) => (p.hidden = p.dataset.innerPanel !== key));

        equalizeCodeHeights();
    });

    // ===== Копіювання =====
    async function copyFrom(id) {
        const el = document.getElementById(id);
        const txt = el.textContent;
        try {
            await navigator.clipboard.writeText(txt);
        } catch (e) {
            const t = document.createElement("textarea");
            t.value = txt;
            document.body.appendChild(t);
            t.select();
            try {
                document.execCommand("copy");
            } finally {
                document.body.removeChild(t);
            }
        }
    }
    // ===== Копіювання з фідбеком =====
    async function copyTextWithFeedback(text, btn) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (e) {
            const t = document.createElement("textarea");
            t.value = text;
            document.body.appendChild(t);
            t.select();
            try {
                document.execCommand("copy");
            } finally {
                document.body.removeChild(t);
            }
        }
        if (btn) {
            const prev = btn.innerHTML;
            btn.dataset.state = "copied";
            btn.innerHTML = "✓ Скопійовано";
            setTimeout(() => {
                btn.dataset.state = "";
                btn.innerHTML = prev;
            }, 1100);
        }
    }

    // Прив’язка існуючих кнопок "Copy CSS/HTML/JS" з фідбеком
    function bindCopy(btnId, boxId) {
        const b = document.getElementById(btnId);
        if (!b) return;
        b.addEventListener("click", () => {
            const el = document.getElementById(boxId);
            copyTextWithFeedback(el?.textContent || "", b);
        });
    }
    [
        ["copyCssBtn", "cssOutput"],
        ["copyHtmlBtn", "htmlOutput"],
        ["copyHeadCssBtn", "headCssOutput"],
        ["copyHeadHtmlBtn", "headHtmlOutput"],
        ["copyHeadJsBtn", "headJsOutput"],
        ["copyCrumbsCssBtn", "crumbsCssOutput"],
        ["copyCrumbsHtmlBtn", "crumbsHtmlOutput"],
        ["copyFootCssBtn", "footCssOutput"],
        ["copyFootHtmlBtn", "footHtmlOutput"],
        ["copyAdsCssBtn", "adsCssOutput"],
        ["copyAdsHtmlBtn", "adsHtmlOutput"],
        ["copyImgsCssBtn", "imgsCssOutput"],
        ["copyImgsHtmlBtn", "imgsHtmlOutput"],
        ["copyImgsJsBtn", "imgsJsOutput"],
        ["copyBtnsCssBtn", "btnsCssOutput"],
        ["copyBtnsHtmlBtn", "btnsHtmlOutput"],
    ].forEach(([b, o]) => bindCopy(b, o));

    // ===== Експорт CSS/HTML (типографіка) =====
    function renderCSS() {
        const baseStyles = `/* Базові стилі: */
* { box-sizing: border-box; }
html, body { height: 100%; }
html { scroll-behavior: smooth; }
body { margin: 0; background: ${colorOverrides.previewBg}; }
main { flex-grow: 1; }
figure { margin: 0; }
img { max-width: 100%; height: auto; display: block; }`;
        const dynamic = document.getElementById("typoStyle").textContent;
        const colors = (() => {
            const c = colorOverrides;
            return `
/* Кольори типографіки */
.content{ color:${c.p}; }
.content h1{ color:${c.h1}; }
.content h2{ color:${c.h2}; }
.content h3{ color:${c.h3}; }
.content h4{ color:${c.h4}; }
.content h5{ color:${c.h5}; }
.content h6{ color:${c.h6}; }
.content p{ color:${c.p}; }
.content a{ color:${c.a}; }
.content a:hover{ color:${c.aHover}; }
.content blockquote{ color:${c.bqText}; background:${c.bqBg}; border-left-color:${c.bqBorder}; }`;
        })();

        const highlights = HIGHLIGHT_CSS;

        const css =
            baseStyles +
            "\n\n/* Типографіка */\n" +
            dynamic +
            "\n" +
            colors +
            "\n\n" +
            highlights;
        document.getElementById("cssOutput").textContent = css;
    }

    function wireTypographyCopyChips() {
        ensureHighlightStyle(); // про всяк випадок

        const content = document.querySelector("#typoPreview .content");
        if (!content) return;

        const getCssRaw = (isHighlight) => {
            const typoCss =
                document.getElementById("typoStyle")?.textContent || "";
            const hlCss =
                document.getElementById("highlightStyle")?.textContent || "";
            return isHighlight ? hlCss : typoCss + "\n" + hlCss;
        };

        const targets = "h1,h2,h3,h4,h5,h6,p,ul,ol,blockquote,span.highlight";
        content.querySelectorAll(targets).forEach((el) => {
            el.classList.add("copy-target");

            attachCopyChip(
                el,
                () => {
                    const clone = el.cloneNode(true);
                    clone
                        .querySelectorAll(".badge,.dev-badge")
                        .forEach((n) => n.remove());

                    const isHighlight = clone.matches(
                        "span.highlight, .highlight"
                    );
                    const htmlOut = clone.outerHTML.trim(); // ← у копію йде «чистий» елемент

                    // для фільтра — підмінимо тільки контекст
                    const htmlForFilter = isHighlight
                        ? htmlOut
                        : `<div class="content">\n  ${htmlOut}\n</div>`;

                    const cssRaw = getCssRaw(isHighlight);
                    const css = filterCssByHtml(cssRaw, htmlForFilter);

                    return bundleSnippet(htmlOut, css, "");
                },
                "Copy"
            );
        });
    }

    // Корисно повторно чіпляти після змін типографіки (бо CSS міняється)
    function refreshTypographyChips() {
        document
            .querySelectorAll("#typoPreview .copy-chip")
            .forEach((n) => n.remove());
        wireTypographyCopyChips();
    }
    // Викличи refreshTypographyChips() наприкінці renderCSS()/applyStyles() де в тебе зручно:
    const _renderCSS = renderCSS;
    renderCSS = function () {
        _renderCSS();
        refreshTypographyChips();
    };

    function renderHTML() {
        const scope = document.getElementById("previewScope").cloneNode(true);
        scope.querySelectorAll(".badge, .dev-badge").forEach((n) => n.remove());
        const html = `<div class="content">
    ${scope.innerHTML.trim()}
</div>`;
        document.getElementById("htmlOutput").textContent = html;
    }

    function equalizeCodeHeights() {
        const preview = document.getElementById("typoPreview");
        const target = Math.max(620, preview ? preview.offsetHeight : 0);
        ["cssOutput", "htmlOutput", "btnsCssOutput", "btnsHtmlOutput"].forEach(
            (id) => {
                const box = document.getElementById(id);
                if (box) box.style.minHeight = target + "px";
            }
        );
    }

    // ===== Кнопки (набір) =====
    const BUTTONS = [
        { cls: "btn primary", label: "Get Offer" },
        { cls: "btn outline", label: "Learn More" },
        { cls: "btn ghost", label: "View Details" },
        { cls: "btn gradient", label: "Claim Discount" },
        { cls: "btn shadow", label: "Buy Now" },
        { cls: "btn raised", label: "Start Trial" },
        { cls: "btn pill primary", label: "Unlock Deal" },
        { cls: "btn link", label: "Read Story" },
        { cls: "btn success", label: "Download Guide" },
        { cls: "btn warning", label: "Limited Time" },
        { cls: "btn square primary", label: "Add to Cart" },
        { cls: "btn square outline", label: "Compare Plans" },
        { cls: "btn square dashed", label: "More Info" },
        { cls: "btn square info", label: "Get Support" },
        { cls: "btn square danger", label: "Cancel Anytime" },
        { cls: "btn square ghost", label: "Secondary" },
        { cls: "btn square neon", label: "Night Mode" },
        { cls: "btn square glass", label: "Frosted CTA" },
        { cls: "btn square icon-left", label: "Try Demo" },
        { cls: "btn square icon-right", label: "Next Step" },
        { cls: "btn cta-offer", label: "Get Offer Now" },
        { cls: "btn cta-buy ripple", label: "Buy Now" },
        { cls: "btn cta-discount", label: "Claim Discount" },
        { cls: "btn cta-trial", label: "Start Free Trial" },
        { cls: "btn cta-eligibility", label: "Check Eligibility" },
        { cls: "btn cta-bonus", label: "Unlock Bonus" },
        { cls: "btn cta-cart", label: "Add to Cart" },
        { cls: "btn cta-download", label: "Download Guide" },
        { cls: "btn cta-waitlist", label: "Join Waitlist" },
        { cls: "btn cta-sample", label: "Get Free Sample" },
    ];

    function renderButtons() {
        const grid = document.getElementById("btnsGrid");
        grid.innerHTML = "";
        BUTTONS.forEach((b, i) => {
            const wrap = document.createElement("div");
            wrap.style.display = "flex";
            wrap.style.flexDirection = "column";
            wrap.style.gap = "4px";
            const num = document.createElement("div");
            num.style.fontSize = "12px";
            num.style.opacity = "0.7";
            num.textContent = String(i + 1).padStart(2, "0");
            const a = document.createElement("a");
            a.href = "#";
            a.className = b.cls;
            a.textContent = b.label;
            a.addEventListener("click", (e) => e.preventDefault());
            wrap.appendChild(num);
            wrap.appendChild(a);
            grid.appendChild(wrap);
        });
    }

    function renderButtonsCSS() {
        const css = `/* Бібліотека кнопок (01–30) — CTA для pre-landers */
.btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:12px 16px; font-weight:700; border-radius:12px; border:1px solid rgba(0,0,0,.1); background:#fff; color:#1c2430; cursor:pointer; user-select:none; text-decoration:none; transition:background-color .25s, color .25s, border-color .25s, box-shadow .25s, transform .2s; }
.btn.square{ border-radius:6px; }
.btn.pill{ border-radius:999px; }
.btn.full{ width:100%; }
.btn.ghost{ background:transparent; }
.btn:active{ transform:translateY(1px); }

/* 01. Primary */
.btn.primary{ background:#5bd1a8; border-color:#5bd1a8; color:#0a0e0c; }
.btn.primary:hover{ filter:brightness(.95); box-shadow:0 8px 18px rgba(91,209,168,.35); }

/* 02. Outline */
.btn.outline{ background:transparent; border:2px solid #1c2430; color:#1c2430; }
.btn.outline:hover{ background:rgba(28,36,48,.06); }

/* 03. Ghost */
.btn.ghost:hover{ background:rgba(28,36,48,.08); }

/* 04. Gradient */
.btn.gradient{ background:linear-gradient(90deg,#5bd1a8,#09c2a1); border-color:transparent; color:#0a0e0c; background-size:200% 100%; }
.btn.gradient:hover{ background-position:100% 0; }

/* 05. Shadow */
.btn.shadow{ box-shadow:0 8px 16px rgba(0,0,0,.15); }
.btn.shadow:hover{ box-shadow:0 10px 22px rgba(0,0,0,.2); transform:translateY(-1px); }

/* 06. 3D Raised */
.btn.raised{ box-shadow:0 4px 0 #0f7f66; background:#14b8a6; border-color:#0f7f66; color:#0a0e0c; }
.btn.raised:active{ transform:translateY(2px); box-shadow:0 2px 0 #0f7f66; }

/* 07. Pill Primary */
.btn.pill.primary{ background:#0ea5e9; border-color:#0ea5e9; color:#fff; }
.btn.pill.primary:hover{ filter:brightness(.95); }

/* 08. Link */
.btn.link{ background:transparent; border-color:transparent; color:#0a7c5e; text-decoration:underline; }

/* 09. Success */
.btn.success{ background:#22c55e; border-color:#22c55e; color:#0a0e0c; }
.btn.success:hover{ filter:brightness(.95); }

/* 10. Warning */
.btn.warning{ background:#ffb020; border-color:#ffb020; color:#1c2430; }
.btn.warning:hover{ filter:brightness(.95); }

/* 11. Square Primary */
.btn.square.primary{ background:#2563eb; border-color:#2563eb; color:#fff; }
.btn.square.primary:hover{ filter:brightness(.95); }

/* 12. Square Outline */
.btn.square.outline{ background:transparent; border:2px solid #1c2430; color:#1c2430; }
.btn.square.outline:hover{ background:rgba(28,36,48,.06); }

/* 13. Square Dashed */
.btn.square.dashed{ border-style:dashed; }
.btn.square.dashed:hover{ background:rgba(28,36,48,.06); }

/* 14. Square Info */
.btn.square.info{ background:#3b82f6; border-color:#3b82f6; color:#fff; }
.btn.square.info:hover{ filter:brightness(.95); }

/* 15. Square Danger */
.btn.square.danger{ background:#ef4444; border-color:#ef4444; color:#fff; }
.btn.square.danger:hover{ filter:brightness(.95); }

/* 16. Square Ghost */
.btn.square.ghost{ background:transparent; }
.btn.square.ghost:hover{ background:rgba(28,36,48,.08); }

/* 17. Square Neon */
.btn.square.neon{ background:#111; color:#5bd1a8; text-shadow:0 0 8px #5bd1a8; border-color:#333; box-shadow:0 0 0 0 rgba(91,209,168,.0); }
.btn.square.neon:hover{ box-shadow:0 0 18px 4px rgba(91,209,168,.4); }

/* 18. Square Glass */
.btn.square.glass{ background:rgba(255,255,255,.35); backdrop-filter: blur(6px); border-color:rgba(255,255,255,.5); }

/* 19–20. Icons */
.btn.icon-left::before{ content:"↗"; }
.btn.icon-right::after{ content:"→"; }

/* ===== Нові 21–30 ===== */

/* 21. cta-offer — пульсуючий акцент */
.btn.cta-offer{ background:#16a34a; border-color:#16a34a; color:#fff; box-shadow:0 0 0 0 rgba(22,163,74,.5); }
@keyframes pulseCta{ from{ box-shadow:0 0 0 0 rgba(22,163,74,.5);} to{ box-shadow:0 0 0 16px rgba(22,163,74,0);} }
.btn.cta-offer:hover{ animation:pulseCta 1s ease-out; }
@media (hover:none){ .btn.cta-offer:active{ animation:pulseCta .8s ease-out; } }

/* 22. cta-buy — яскравий + ripple (клас .ripple) */
.btn.cta-buy{ background:#e11d48; border-color:#e11d48; color:#fff; position:relative; overflow:hidden; }
.btn.ripple .ripple-ink{ position:absolute; border-radius:50%; transform:scale(0); background:rgba(255,255,255,.45); animation:ripple .6s ease-out; pointer-events:none; }
@keyframes ripple{ to{ transform:scale(3); opacity:0; } }
@media (hover:hover){ .btn.cta-buy:hover{ filter:brightness(.95); } }

/* 23. cta-discount — «рухомий» градієнт */
.btn.cta-discount{ color:#0a0e0c; background:linear-gradient(90deg,#ffe259,#ffa751); border-color:transparent; background-size:200% 100%; }
.btn.cta-discount:hover{ background-position:100% 0; }

/* 24. cta-trial — скляний + підйом */
.btn.cta-trial{ background:rgba(14,165,233,.12); border:2px solid rgba(14,165,233,.6); color:#0a0e0c; backdrop-filter:blur(6px); }
.btn.cta-trial:hover{ transform:translateY(-1px); box-shadow:0 10px 22px rgba(14,165,233,.25); }

/* 25. cta-eligibility — темний з інверсією */
.btn.cta-eligibility{ background:#0f172a; color:#facc15; border-color:#0f172a; }
.btn.cta-eligibility:hover{ background:#111827; color:#fde68a; }

/* 26. cta-bonus — неонове сяйво */
.btn.cta-bonus{ background:#111; color:#22c55e; border-color:#333; box-shadow:0 0 12px rgba(34,197,94,.35); }
.btn.cta-bonus:hover{ box-shadow:0 0 18px rgba(34,197,94,.6); }

/* 27. cta-cart — підйом + тінь */
.btn.cta-cart{ background:#0ea5e9; color:#fff; border-color:#0ea5e9; }
.btn.cta-cart:hover{ transform:translateY(-2px); box-shadow:0 10px 22px rgba(14,165,233,.35); }

/* 28. cta-download — «стрілка вперед» */
.btn.cta-download{ background:#10b981; color:#0a0e0c; border-color:#10b981; }
.btn.cta-download::after{ content:"→"; margin-left:6px; transition:transform .2s; }
.btn.cta-download:hover::after{ transform:translateX(3px); }

/* 29. cta-waitlist — світна обводка */
.btn.cta-waitlist{ background:transparent; color:#1c2430; border:2px solid #8b5cf6; box-shadow:0 0 0 0 rgba(139,92,246,.0); }
.btn.cta-waitlist:hover{ box-shadow:0 0 0 4px rgba(139,92,246,.18); }

/* 30. cta-sample — діагональний «shine» */
.btn.cta-sample{ position:relative; overflow:hidden; background:#f59e0b; color:#1c2430; border-color:#f59e0b; }
.btn.cta-sample::before{ content:""; position:absolute; inset:-40%; transform:translateX(-120%) rotate(12deg); background:linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.6) 50%, rgba(255,255,255,0) 100%); }
.btn.cta-sample:hover::before{ transform:translateX(60%) rotate(12deg); transition:transform .6s ease; }

/* Тач-фідбек */
@media (hover:none){
  .btn:hover{ transform:none; box-shadow:none; }
  .btn:active{ transform:scale(.98); }
}

/* reduce-motion */
@media (prefers-reduced-motion:reduce){
  .btn, .btn::before, .btn::after{ transition:none !important; animation:none !important; }
}`;
        document.getElementById("btnsCssOutput").textContent = css;
        document.getElementById("btnKitStyle").textContent = css; // для прев’ю
    }

    function renderButtonsHTML() {
        const html = BUTTONS.map(
            (b, i) =>
                `<!-- ${String(i + 1).padStart(2, "0")} --><a href="#" class="${
                    b.cls
                }">${b.label}</a>`
        ).join("\n");
        document.getElementById("btnsHtmlOutput").textContent = html;
    }

    // Копіювання для кнопок
    document
        .getElementById("copyBtnsCssBtn")
        .addEventListener("click", () => copyFrom("btnsCssOutput"));
    document
        .getElementById("copyBtnsHtmlBtn")
        .addEventListener("click", () => copyFrom("btnsHtmlOutput"));

    // Ripple для кнопок із класом .ripple (прев’ю + ваші сторінки, якщо додасте цей шматок)
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn.ripple");
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const ink = document.createElement("span");
        ink.className = "ripple-ink";
        const size = Math.max(rect.width, rect.height);
        ink.style.width = ink.style.height = size + "px";
        ink.style.left = e.clientX - rect.left - size / 2 + "px";
        ink.style.top = e.clientY - rect.top - size / 2 + "px";
        btn.appendChild(ink);
        setTimeout(() => ink.remove(), 650);
    });

    /* Делегований обробник для гамбургера у прев’ю */
    document.addEventListener("click", (e) => {
        const t = e.target.closest("[data-nav-toggle]");
        if (!t) return;
        const hdr = t.closest(".nav");
        if (!hdr) return;
        const isOpen = hdr.classList.toggle("open");
        t.setAttribute("aria-expanded", String(isOpen));
        e.preventDefault();
    });

    /* На ресайз закриваємо меню, якщо повернулись на десктоп (прев’ю) */
    let _lastW = innerWidth;
    addEventListener("resize", () => {
        if (innerWidth === _lastW) return;
        _lastW = innerWidth;
        document.querySelectorAll(".std-demo .nav.open").forEach((n) => {
            if (innerWidth >= 900) {
                n.classList.remove("open");
                const btn = n.querySelector("[data-nav-toggle]");
                if (btn) btn.setAttribute("aria-expanded", "false");
            }
        });
    });

    /* ===================== STANDARD COMPONENTS ===================== */

    // ------- 1) HEADER / NAVBAR -------
    const HEAD_HTML = `
<!-- 01. Minimal -->
<header class="nav nav-minimal">
  <div class="brand"><span class="logo">📣</span> <strong>News</strong></div>
  <a class="btn cta-buy ripple" href="#">Subscribe</a>
  <button class="nav-toggle" data-nav-toggle aria-expanded="false" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <nav class="links" role="navigation">
    <a href="#">Politics</a><a href="#">Video</a><a href="#">Entertainments</a>
    <a href="#">Sports</a><a href="#">Lefestyle</a><a class="current" href="#">World News</a>
    <a href="#">Blogs</a><a href="#">Stories</a>
  </nav>
</header>

<!-- 02. Centered -->
<header class="nav nav-centered">
  <div class="brand"><span class="logo">📣</span> <strong>News</strong></div>
  <a class="btn outline" href="#">Learn More</a>
  <button class="nav-toggle" data-nav-toggle aria-expanded="false" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <nav class="links" role="navigation">
    <a href="#">Overview</a><a href="#">Benefits</a><a href="#">Reviews</a><a href="#">FAQ</a>
  </nav>
</header>

<!-- 03. Split + badge -->
<header class="nav nav-split">
  <div class="left">
    <div class="brand"><span class="logo">📣</span> <strong>News</strong> <span class="badge">New</span></div>
  </div>
  <div class="right"><a class="btn cta-buy ripple" href="#">Buy Now</a></div>
  <button class="nav-toggle" data-nav-toggle aria-expanded="false" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <nav class="links" role="navigation">
    <a href="#">Diet</a><a href="#">Fitness</a><a href="#">Beauty</a>
  </nav>
</header>

<!-- 04. Compact -->
<header class="nav nav-compact">
  <div class="brand"><span class="logo">📣</span> <strong>News</strong></div>
  <button class="nav-toggle" data-nav-toggle aria-expanded="false" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <nav class="links" role="navigation">
    <a href="#">Home</a><a href="#">Politics</a><a href="#">Video</a><a href="#">Entertainments</a>
    <a href="#">Sports</a><a href="#">Lifestyle</a><a class="current" href="#">World News</a>
    <a href="#">Blogs</a><a href="#">Stories</a>
  </nav>
</header>

<!-- 05. Tabs-news -->
<header class="nav nav-tabs-news">
  <div class="brand brand-indo">
    <span class="block">Indo-</span><span class="tail">Network</span>
  </div>
  <nav class="tabs" role="navigation" aria-label="Sections">
    <a class="pill active-red" href="#">KESEHATAN</a>
    <a class="pill" href="#">FOKUS</a>
    <a class="pill" href="#">BISNIS</a>
    <a class="pill" href="#">POLITIK</a>
    <a class="pill" href="#">GAYA HIDUP</a>
    <a class="pill" href="#">INTERNASIONAL</a>
    <a class="pill" href="#">BUDAYA</a>
  </nav>
</header>

<!-- 06. Magazine -->
<header class="nav nav-magazine">
  <div class="top">
    <div class="brand"><strong>Daily Journal</strong></div>
    <a class="btn cta-waitlist" href="#">Newsletter</a>
  </div>
  <nav class="catbar" role="navigation">
    <a class="tag current" href="#">HEALTH</a><a class="tag" href="#">SCIENCE</a>
    <a class="tag" href="#">WORLD</a><a class="tag" href="#">LIFESTYLE</a>
    <a class="tag" href="#">TECH</a><a class="tag" href="#">OPINION</a>
  </nav>
</header>

<!-- 07. Underline -->
<header class="nav nav-underline">
  <div class="brand"><strong>Wellness</strong></div>
  <nav class="links" role="navigation">
    <a class="current" href="#">Top Stories</a>
    <a href="#">Research</a>
    <a href="#">Workouts</a>
    <a href="#">Nutrition</a>
    <a href="#">Beauty</a>
  </nav>
</header>
`;

    const HEAD_CSS = `
/* ==== Header / Navbar (01–07) — responsive >=320px ==== */
:root { --nav-accent:#b71c1c; }
.std-demo .nav{
  position:relative;display:flex;align-items:center;gap:12px;
  justify-content:space-between;padding:10px 14px;margin:0 0 12px;
  border:1px solid rgba(0,0,0,.12);border-radius:12px;background:#fff;
  box-shadow:inset 0 -2px 0 var(--nav-accent);
}
body.theme-dark .std-demo .nav{background:#12141a;border-color:rgba(255,255,255,.08)}
.std-demo .nav .brand{display:flex;align-items:center;gap:8px;font-weight:800;letter-spacing:.02em}
.std-demo .nav .brand .logo{font-size:20px;color:var(--nav-accent)}
.std-demo .nav .links{display:flex;gap:16px;flex-wrap:wrap}
.std-demo .nav .links a{padding:6px 10px;border-radius:8px;color:inherit;text-decoration:none;opacity:.95}
.std-demo .nav .links a:hover{background:rgba(28,36,48,.06)}
.std-demo .nav .links a.current{background:var(--nav-accent);}
.std-demo .nav .btn{white-space:nowrap}
.std-demo .nav .btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:10px 14px; font-weight:700; border-radius:10px;
  border:1px solid rgba(0,0,0,.12); background:#f2f4f8; color:#1c2430;
  text-decoration:none; cursor:pointer; user-select:none;
  transition:background-color .2s, color .2s, border-color .2s, box-shadow .2s;
}
body.theme-dark .std-demo .nav .btn{ background:#0e1015; color:#e6e8ee; border-color:rgba(255,255,255,.08); }
.std-demo .nav .btn:hover{ background:rgba(28,36,48,.06); }


/* center / split */
.std-demo .nav-centered{justify-content:center}
.std-demo .nav-centered .brand{margin-right:auto}
.std-demo .nav-centered .links{margin-right:auto}
.std-demo .nav-split{gap:8px}
.std-demo .nav-split .left{display:flex;align-items:center;gap:12px}
.std-demo .nav-split .right{display:flex;align-items:center}

/* hamburger */
.std-demo .nav .nav-toggle{display:none;position:relative; width:36px;height:28px;border:0;background:transparent;cursor:pointer}
.std-demo .nav .btn{margin:0 auto;}
.std-demo .nav .nav-toggle span{display:block;height:3px;margin:5px 0;background:#1c2430;border-radius:3px;transition:.2s}

/* ===== мобільний режим (<= 900px) для варіантів 01–04 ===== */
@media (max-width:900px){
  .std-demo .nav .links {display: none;}
  .std-demo .nav.open .links {display: flex;}
  .std-demo .nav{padding:10px 12px}
  .std-demo .nav.open .links {max-height: fit-content;}
  .std-demo .nav .nav-toggle{display:inline-block}
  .std-demo .nav .links{
    position:absolute;z-index:30;left:10px;right:10px;top:100%;
    flex-direction:column;gap:0;background:#fff;
    border:1px solid rgba(0,0,0,.12);border-radius:12px;
    max-height:0;overflow:hidden;transition:max-height .25s ease; margin-top:8px
  }
  body.theme-dark .std-demo .nav .links{background:#12141a;border-color:rgba(255,255,255,.08)}
  .std-demo .nav .links a{padding:14px 16px;border-top:1px solid rgba(0,0,0,.06);border-radius:0;text-align:center}
  .std-demo .nav .links a:first-child{border-top:none}
  .std-demo .nav.open .links{max-height:70vh}
}

/* ===== 05. Tabs-news ===== */
.std-demo .nav.nav-tabs-news{display:block;box-shadow:none;border-color:rgba(0,0,0,.12)}
.std-demo .nav.nav-tabs-news .brand{font-size:28px}
.std-demo .nav.nav-tabs-news .brand-indo .block{background:#e11d2b;color:#fff;padding:2px 8px;border-radius:2px;margin-right:4px}
.std-demo .nav.nav-tabs-news .brand-indo .tail{font-weight:700}
.std-demo .nav.nav-tabs-news .tabs{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.std-demo .nav.nav-tabs-news .tabs .pill{
  background:#e5e7eb;color:#111;padding:6px 10px;border-radius:6px;
  text-transform:uppercase;font-weight:800;font-size:12px;letter-spacing:.04em
}
body.theme-dark .std-demo .nav.nav-tabs-news .tabs .pill{background:#0e1015;color:#e6e8ee}
.std-demo .nav.nav-tabs-news .tabs .active-red{background:#e11d2b;color:#fff}

/* ===== 06. Magazine ===== */
.std-demo .nav.nav-magazine{display:block;box-shadow:none}
.std-demo .nav.nav-magazine .top{display:flex;align-items:center;justify-content:space-between}
.std-demo .nav.nav-magazine .catbar{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.std-demo .nav.nav-magazine .catbar .tag{
  background:#f2f4f8;padding:6px 10px;border-radius:8px;font-weight:700;letter-spacing:.04em
}
.std-demo .nav.nav-magazine .catbar .tag.current{background:#1c2430;color:#fff}
body.theme-dark .std-demo .nav.nav-magazine .catbar .tag{background:#0e1015;color:#e6e8ee}

/* ===== 07. Underline ===== */
.std-demo .nav.nav-underline{box-shadow:none}
.std-demo .nav.nav-underline .links a{padding:8px 0;border-radius:0;border-bottom:3px solid transparent}
.std-demo .nav.nav-underline .links a:hover{border-bottom-color:rgba(28,36,48,.25);background:transparent}
.std-demo .nav.nav-underline .links a.current{border-bottom-color:var(--nav-accent);background:transparent;color:inherit}
`;

    const HEAD_JS = `// Header / Navbar: гамбургер
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-nav-toggle]');
  if (!t) return;
  const header = t.closest('.nav');
  const isOpen = header.classList.toggle('open');
  t.setAttribute('aria-expanded', String(isOpen));
  e.preventDefault();
});
window.addEventListener('resize', () => {
  if (innerWidth >= 900) {
    document.querySelectorAll('.nav.open').forEach((n) => {
      n.classList.remove('open');
      const btn = n.querySelector('[data-nav-toggle]');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }
});`;

    // ------- 2) BREADCRUMBS -------
    const CRUMBS_HTML = `
<!-- 01. Slash -->
<nav class="crumbs sep-slash" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Nutrition</a></li>
    <li><a href="#">Keto</a></li>
    <li class="current" aria-current="page">Ultimate Guide</li>
  </ol>
</nav>

<!-- 02. Chevrons + pill -->
<nav class="crumbs sep-chevron pill" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">⌂ Home</a></li>
    <li><a href="#">Programs</a></li>
    <li class="current" aria-current="page">30-Day Challenge</li>
  </ol>
</nav>

<!-- 03. Micro / uppercase -->
<nav class="crumbs micro sep-slash" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">HOME</a></li>
    <li><a href="#">BEAUTY</a></li>
    <li class="current" aria-current="page">FACE CARE</li>
  </ol>
</nav>

<!-- 04. Scrollable -->
<nav class="crumbs scroll sep-chevron" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Section</a></li>
    <li><a href="#">Subsection</a></li>
    <li class="current" aria-current="page">Very long current page</li>
  </ol>
</nav>
`;

    const CRUMBS_CSS = `
/* ==== Breadcrumbs (01–04) ==== */
.std-demo .crumbs{font-size:13px;margin:0 0 12px}
.std-demo .crumbs ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0}
.std-demo .crumbs a{color:inherit;text-decoration:none;opacity:.85}
.std-demo .crumbs a:hover{text-decoration:underline}
.std-demo .crumbs .current{font-weight:700}
/* separators */
.std-demo .sep-slash li+li::before{content:"/";opacity:.35;margin:0 6px}
.std-demo .sep-chevron li+li::before{content:"›";opacity:.5;margin:0 6px}
/* pill */
.std-demo .pill a{background:#f2f4f8;padding:4px 8px;border-radius:999px}
body.theme-dark .std-demo .pill a{background:#0e1015}
/* micro */
.std-demo .crumbs.micro{font-size:11px;letter-spacing:.06em}
/* 04 scrollable */
.std-demo .crumbs.scroll ol{flex-wrap:nowrap;overflow:auto;scrollbar-width:thin}
.std-demo .crumbs.scroll li{white-space:nowrap}
`;
    const CRUMBS_JS = `// Breadcrumbs не потребують JS.`;

    // ------- 3) FOOTER + MODALS -------
    const FOOT_HTML = `
<!-- 01. Columns -->
<footer class="foot foot-cols">
  <div class="col">
    <h4>Company</h4>
    <a href="#">About</a><a href="#">Careers</a><a href="#" data-modal-open="press">Press</a>
  </div>
  <div class="col">
    <h4>Resources</h4>
    <a href="#">Blog</a><a href="#">Guides</a><a href="#">Support</a>
  </div>
  <div class="col">
    <h4>Legal</h4>
    <a href="#" data-modal-open="terms">Terms</a><a href="#" data-modal-open="privacy">Privacy</a>
  </div>
</footer>

<!-- 02. Minimal bar -->
<footer class="foot foot-bar">
  <small>© 2025 Brand. All rights reserved.</small>
  <nav><a href="#" data-modal-open="disclosure">Disclosure</a> • <a href="#" data-modal-open="terms">Terms</a> • <a href="#" data-modal-open="privacy">Privacy</a></nav>
</footer>

<!-- 03. Centered links -->
<footer class="foot foot-center">
  <nav><a href="#" data-modal-open="terms">Terms</a> · <a href="#" data-modal-open="privacy">Privacy</a> · <a href="#" data-modal-open="disclosure">Disclosure</a></nav>
</footer>

<!-- Modals -->
<div class="modal" data-modal="terms" hidden>
  <div class="modal-backdrop" data-modal-close></div>
  <div class="modal-box">
    <button class="modal-x" aria-label="Close" data-modal-close>×</button>
    <h3>Terms & Conditions</h3>
    <p>Short sample terms for demo preview. Replace with your policy.</p>
  </div>
</div>
<div class="modal" data-modal="privacy" hidden>
  <div class="modal-backdrop" data-modal-close></div>
  <div class="modal-box">
    <button class="modal-x" aria-label="Close" data-modal-close>×</button>
    <h3>Privacy Policy</h3>
    <p>We respect your privacy. This is a placeholder modal.</p>
  </div>
</div>
<div class="modal" data-modal="disclosure" hidden>
  <div class="modal-backdrop" data-modal-close></div>
  <div class="modal-box">
    <button class="modal-x" aria-label="Close" data-modal-close>×</button>
    <h3>Affiliate Disclosure</h3>
    <p>We may earn commissions from qualifying purchases.</p>
  </div>
</div>
<div class="modal" data-modal="press" hidden>
  <div class="modal-backdrop" data-modal-close></div>
  <div class="modal-box">
    <button class="modal-x" aria-label="Close" data-modal-close>×</button>
    <h3>Press Kit</h3>
    <p>Brand assets and guidelines. Replace with your content.</p>
  </div>
</div>
`;

    const FOOT_CSS = `
/* ==== Footer (01–03) ==== */
.std-demo .foot{border:1px solid rgba(0,0,0,.12);border-radius:12px;background:#fff;margin:0 0 12px;padding:14px}
body.theme-dark .std-demo .foot{background:#12141a;border-color:rgba(255,255,255,.08)}
/* 01. columns */
.std-demo .foot-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.std-demo .foot-cols .col{display:flex;flex-direction:column;gap:6px}
.std-demo .foot-cols h4{margin:0 0 4px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#6b7686}
body.theme-dark .std-demo .foot-cols h4{color:#9aa3b2}
.std-demo .foot a{color:inherit;text-decoration:none;opacity:.9}
.std-demo .foot a:hover{text-decoration:underline}
/* 02. bar */
.std-demo .foot-bar{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
.std-demo .foot-bar small{opacity:.7}
/* 03. centered */
.std-demo .foot-center{display:flex;justify-content:center}
.std-demo .foot-center nav{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}

/* Modals */
.std-demo .modal{position:fixed;inset:0;display:grid;place-items:center}
.std-demo .modal[hidden]{display:none}
.std-demo .modal-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.45)}
.std-demo .modal-box{position:relative;background:#fff;color:#1c2430;border-radius:12px;padding:16px;max-width:520px;width:min(92vw,520px);box-shadow:0 20px 60px rgba(0,0,0,.35)}
.std-demo .modal-x{position:absolute;top:8px;right:10px;border:0;background:transparent;font-size:20px;cursor:pointer}
body.theme-dark .std-demo .modal-box{background:#12141a;color:#e6e8ee}
`;
    const FOOT_JS = `// Відкриття/закриття модалок
document.addEventListener('click', (e) => {
  const open = e.target.closest('[data-modal-open]');
  if (open) {
    const name = open.getAttribute('data-modal-open');
    const m = document.querySelector('.modal[data-modal="' + name + '"]');
    if (m) m.hidden = false;
    e.preventDefault();
  }
  if (e.target.closest('[data-modal-close]')) {
    const m = e.target.closest('.modal');
    if (m) m.hidden = true;
    e.preventDefault();
  }
});`;

    // ------- 4) ADVERTISEMENT / DISCLOSURE -------
    const ADS_HTML = `
<!-- 01. Top ad bar -->
<div class="adbar">
  <span class="ad-badge">Ad</span> This article contains affiliate links. We may earn a commission at no cost to you.
</div>

<!-- 02. Disclosure card -->
<div class="disclosure">
  <div class="icon">ℹ</div>
  <div class="text"><strong>Advertising Disclosure:</strong> Our content is reader-supported. Purchases through links help this site.</div>
</div>

<!-- 03. Sponsored tag on image -->
<div class="sponsored-card">
  <span class="sponsored-tag">Sponsored</span>
  <img src="https://picsum.photos/id/1025/640/320" alt="sample">
</div>

<!-- 04. Sticky bottom bar -->
<div class="adbar sticky">
  <span class="ad-badge">Ad</span> Limited offer — up to 40% off today.
</div>
`;

    const ADS_CSS = `
/* ==== Advertisement / Disclosure (01–04) ==== */
.std-demo .adbar{background:#fff3cd;color:#3b2f05;border:1px solid #ffe08a;border-radius:12px;padding:10px 12px;margin:0 0 12px}
.std-demo .adbar.sticky{position:sticky;bottom:0;z-index:5}
.std-demo .ad-badge{display:inline-block;background:#f59e0b;color:#1c2430;border-radius:6px;padding:2px 6px;margin-right:8px;font-weight:700}
.std-demo .disclosure{display:flex;gap:10px;align-items:flex-start;background:#f1f4f8;border:1px solid rgba(0,0,0,.12);border-radius:12px;padding:12px;margin:0 0 12px}
body.theme-dark .std-demo .disclosure{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.08)}
.std-demo .disclosure .icon{width:28px;height:28px;display:grid;place-items:center;background:#fff;border-radius:8px;border:1px solid rgba(0,0,0,.1)}
.std-demo .sponsored-card{position:relative;border-radius:12px;overflow:hidden;border:1px solid rgba(0,0,0,.12);margin:0 0 12px}
.std-demo .sponsored-card img{width:100%;display:block}
.std-demo .sponsored-tag{position:absolute;top:10px;left:10px;background:#111;color:#fff;border-radius:6px;padding:4px 8px;opacity:.9}
`;
    const ADS_JS = `// Ads / Disclosure — JS не потрібний.`;

    // ------- 5) IMAGES / HERO -------
    const IMGS_HTML = `
<!-- HERO 01 — Overlay -->
<section class="hero hero-01">
  <img src="https://picsum.photos/id/1015/1200/480" alt="Hero 01">
  <div class="hero-caption">
    <h2>Summer Shape Program</h2>
    <p>Scientifically-backed plan to kickstart your routine.</p>
    <a class="btn cta-trial" href="#">Start Free Trial</a>
  </div>
</section>

<!-- HERO 02 — News bar -->
<section class="hero hero-02 hero-news">
  <img src="https://picsum.photos/id/1005/1200/520" alt="Hero 02">
  <div class="hero-caption">
    <small class="eyebrow">FEATURED • HEALTH</small>
    <h2>Doctors Reveal: 3 Morning Habits That Boost Metabolism</h2>
  </div>
</section>

<!-- HERO 03 — Split editorial -->
<section class="hero hero-03 hero-split">
  <div class="copy">
    <h2>Real Results, Backed by Research</h2>
    <p>Lose up to 6kg in 30 days with our structured routine and diet plan.</p>
    <a class="btn cta-offer" href="#">Get Offer Now</a>
  </div>
  <img src="https://picsum.photos/id/1024/1200/700" alt="Hero 03">
</section>

<!-- HERO 04 — Gradient CTA -->
<section class="hero hero-04">
  <img src="https://picsum.photos/id/1035/1400/700" alt="Hero 04">
  <div class="hero-caption">
    <small class="eyebrow">EXCLUSIVE • WELLNESS</small>
    <h2>New 10-min Routine That Burns More Than a 5k Run</h2>
    <ul class="trust">
      <li>✓ 250k+ readers</li>
      <li>✓ Clinically reviewed</li>
      <li>✓ No equipment</li>
    </ul>
    <a class="btn cta-buy ripple" href="#">Try Today</a>
  </div>
</section>

<!-- HERO 05 — Author/story -->
<section class="hero hero-05">
  <img src="https://picsum.photos/id/1011/1400/700" alt="Hero 05">
  <div class="hero-caption">
    <div class="byline">
      <img class="avatar" src="https://i.pravatar.cc/48?img=32" alt="">
      <span><strong>Monica Ruiz</strong> • Investigative Health Writer</span>
    </div>
    <h2>“I tested the 30-day metabolic reset. Here’s what actually works.”</h2>
    <a class="btn cta-sample" href="#">Read My Journal</a>
  </div>
</section>

<!-- PRODUCT -->
<article class="product">
  <img class="product-img" src="https://picsum.photos/id/1060/640/480" alt="Product">
  <div class="product-body">
    <h3>Omega-3 Complex</h3>
    <div class="rating">★★★★★ <small>(124)</small></div>
    <div class="price">$24.90</div>
    <a class="btn cta-cart" href="#">Add to Cart</a>
  </div>
</article>

<!-- AVATARS -->
<div class="avatars">
  <img src="https://i.pravatar.cc/64?img=5" alt="">
  <img src="https://i.pravatar.cc/64?img=12" alt="">
  <img src="https://i.pravatar.cc/64?img=32" alt="">
  <span class="more">+42</span>
</div>

<!-- STORY CARDS -->
<figure class="story-card bar-pink">
  <img src="https://picsum.photos/id/1003/880/540" alt="Story">
  <figcaption>Discours de Mona à la conférence</figcaption>
</figure>
<figure class="story-card ribbon">
  <img src="https://picsum.photos/id/1011/880/540" alt="Story">
  <figcaption>Exclusive: Nutritionist explains the “Keto Window”</figcaption>
  <span class="ribbon-tag">Sponsored</span>
</figure>
<figure class="story-card polaroid">
  <img src="https://picsum.photos/id/1027/880/540" alt="Story">
  <figcaption>Before/After — 8 Weeks Journal</figcaption>
</figure>
`;

    const IMGS_CSS = `
/* ==== Images / Hero / Product / Avatars ==== */

/* Базові утиліти */
.std-demo .hero{position:relative;border-radius:14px;overflow:hidden;margin:0 0 12px;border:1px solid rgba(0,0,0,.12);background:#fff;display:grid}
body.theme-dark .std-demo .hero{background:#12141a;border-color:rgba(255,255,255,.08)}
.std-demo .hero > img{width:100%;height:auto;display:block;grid-area:1/1;object-fit:cover}
.std-demo .hero .hero-caption{grid-area:1/1;align-self:end;margin:0 16px 16px 16px;background:linear-gradient(180deg,rgba(0,0,0,.0),rgba(0,0,0,.6));color:#fff;border-radius:12px;padding:14px}
.std-demo .hero .hero-caption h2{margin:0 0 .25em;text-wrap:balance}
.std-demo .hero .hero-caption .eyebrow{display:block;opacity:.85;letter-spacing:.06em;margin-bottom:4px}

/* clamp для заголовків */
.std-demo .hero .hero-caption h2.clamp-2{
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden
}

/* HERO 01 */
.std-demo .hero-01 .hero-caption{background:linear-gradient(180deg,rgba(0,0,0,.0),rgba(0,0,0,.6))}
@media (max-width:450px){
  .std-demo .hero-01{display:block}
  .std-demo .hero-01 .hero-caption{position:static;margin:0;border-radius:0 0 14px 14px;background:#0f172a}
}
.std-demo .hero-01.is-compact .hero-caption,
.std-demo .hero-01.shift-out .hero-caption{
  position:static;margin:0;border-radius:0 0 14px 14px;background:#0f172a
}
.std-demo .hero-01.is-compact .hero-caption h2{font-size:20px}

/* HERO 02 */
.std-demo .hero-02 .hero-caption{background:rgba(231,72,86,.9);border-radius:0;inset:auto 0 0 0;color:#fff;margin:0;padding:12px 16px}
.std-demo .hero-02 .hero-caption h2{margin:2px 0 0}
.std-demo .hero-02.is-compact .hero-caption,
.std-demo .hero-02.shift-out .hero-caption{
  position:static;inset:auto;background:#e74856;color:#fff;border-radius:0 0 14px 14px
}
.std-demo .hero-02.is-compact .hero-caption h2{font-size:18px}

/* HERO 03 — split */
.std-demo .hero-03.hero-split{
  grid-template-columns:1.15fr 1fr;gap:12px;align-items:center
}
.std-demo .hero-03.hero-split .copy{padding:16px}
.std-demo .hero-03.hero-split img{width:100%;height:100%;object-fit:cover;min-height:260px}
@media (max-width:700px){ .std-demo .hero-03.hero-split{grid-template-columns:1fr} }
.std-demo .hero-03.is-compact .copy h2{font-size:22px}
.std-demo .hero-03.is-compact .copy p{font-size:14px}

/* HERO 04 */
.std-demo .hero-04 > img{filter:contrast(1.05) saturate(1.05)}
.std-demo .hero-04 .hero-caption{
  align-self:center;justify-self:start;max-width:min(620px,92%);background:
  linear-gradient(180deg,rgba(0,0,0,.0),rgba(0,0,0,.55)), 
  linear-gradient(90deg,rgba(0,0,0,.55),rgba(0,0,0,.0) 65%);
  padding:18px
}
.std-demo .hero-04 .trust{display:flex;gap:10px;flex-wrap:wrap;margin:.4em 0 1em 0;padding:0;list-style:none}
.std-demo .hero-04.is-compact .hero-caption h2{font-size:20px}
.std-demo .hero-04.is-compact .trust{gap:6px}

/* HERO 05 */
.std-demo .hero-05 .hero-caption{
  align-self:end;background:linear-gradient(180deg,rgba(0,0,0,.0),rgba(0,0,0,.7));padding:16px
}
.std-demo .hero-05 .byline{display:flex;align-items:center;gap:8px;margin-bottom:6px;opacity:.92}
.std-demo .hero-05 .avatar{width:28px;height:28px;border-radius:50%;border:2px solid rgba(255,255,255,.8)}
.std-demo .hero-05.is-compact .hero-caption h2{font-size:19px}

/* Спільні фікси */
@media (min-width:350px) and (max-width:490px){ .std-demo .hero .hero-caption{padding:12px} }

/* PRODUCT */
.std-demo .product{display:grid;grid-template-columns:180px 1fr;gap:12px;border:1px solid rgba(0,0,0,.12);border-radius:12px;overflow:hidden;margin:0 0 12px;background:#fff}
body.theme-dark .std-demo .product{background:#12141a;border-color:rgba(255,255,255,.08)}
.std-demo .product-img{width:100%;height:100%;object-fit:cover}
.std-demo .product-body{padding:10px}
.std-demo .product .rating{color:#f59e0b;margin:.25em 0}
.std-demo .product .price{font-size:20px;font-weight:800;margin:.2em 0 .6em}

/* AVATARS */
.std-demo .avatars{display:flex;align-items:center;gap:6px}
.std-demo .avatars img{width:36px;height:36px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.1)}
.std-demo .avatars .more{background:#f2f4f8;border-radius:999px;padding:6px 10px;font-weight:700}
body.theme-dark .std-demo .avatars .more{background:#0e1015}

/* STORY CARDS */
.std-demo .story-card{position:relative;border-radius:12px;overflow:hidden;border:1px solid rgba(0,0,0,.12);margin:0 0 12px;background:#fff}
.std-demo .story-card img{width:100%;display:block}
.std-demo .story-card figcaption{padding:10px 12px}

/* 04. Caption bar */
.std-demo .story-card.bar-pink figcaption{background:#f8b4c7;color:#1c2430;font-weight:800;text-align:center}
/* 05. Ribbon */
.std-demo .story-card.ribbon{--r:#111;--txt:#fff}
.std-demo .story-card.ribbon .ribbon-tag{
  position:absolute;top:10px;left:-55px;transform:rotate(-30deg);
  background:var(--r);color:var(--txt);padding:6px 56px;font-weight:800;letter-spacing:.06em
}
.std-demo .story-card.ribbon figcaption{background:#f2f4f8}
/* 06. Polaroid */
.std-demo .story-card.polaroid{padding:10px;background:#fff}
.std-demo .story-card.polaroid img{border:8px solid #fff;box-shadow:0 10px 20px rgba(0,0,0,.12);border-radius:4px}
.std-demo .story-card.polaroid figcaption{font-style:italic;text-align:center;color:#374151}

/* мобільні фікси */
@media (max-width:540px){
  .std-demo .product{grid-template-columns:1fr}
  .std-demo .product-img{height:200px}
}
`;

    const IMGS_JS = `/* HERO JS (01–05) */
(function(){
  const MID_MIN = 350, MID_MAX = 490;
  const Q = (s, r = document) => r.querySelector(s);
  const QA = (s, r = document) => Array.from(r.querySelectorAll(s));
  const isMid = () => innerWidth >= MID_MIN && innerWidth <= MID_MAX;

  function tuneHero(el){
    const mid = isMid();
    const cap = Q('.hero-caption', el);
    const img = Q('img', el);

    el.classList.toggle('is-compact', mid);

    if (cap){
      const h2 = Q('h2', cap);
      if (h2){
        const long = (h2.textContent || '').trim().length > 62;
        h2.classList.toggle('clamp-2', mid && long);
      }
    }

    if (cap && img){
      const needShift = mid && (cap.scrollHeight > (img.clientHeight * 0.48));
      el.classList.toggle('shift-out', !!needShift);
    }
  }

  function tuneAll(){
    QA('.std-demo .hero-01, .std-demo .hero-02, .std-demo .hero-03, .std-demo .hero-04, .std-demo .hero-05')
      .forEach(tuneHero);
  }

  window.addEventListener('resize', tuneAll, { passive: true });
  if (document.fonts && document.fonts.ready){ document.fonts.ready.then(tuneAll); }
  window.addEventListener('load', tuneAll);
  setTimeout(tuneAll, 0);
})();`;

    /* ===== УТИЛІТИ ДЛЯ ПОБУДОВИ ПАКЕТУ (html+css+js) ===== */
    const AT_RULE_RE = /@[\s\S]*?\{[\s\S]*?\}/g; // дуже спрощено: @media/@keyframes тощо
    function unscopeCss(css) {
        return (css || "").replace(/\.std-demo\s+/g, "");
    }

    // Витяг класів/тегів з HTML (для фільтрації CSS)
    function extractClassSetFromHtml(html) {
        const set = new Set();
        const re = /class=["']([^"']+)["']/g;
        let m;
        while ((m = re.exec(html)))
            m[1]
                .trim()
                .split(/\s+/)
                .forEach((c) => set.add(c));
        return set;
    }
    function extractTagSetFromHtml(html) {
        const set = new Set();
        const re = /<\s*([a-zA-Z0-9-]+)/g;
        let m;
        while ((m = re.exec(html))) set.add(m[1].toLowerCase());
        return set;
    }

    // Дуже легка фільтрація CSS: лишаємо правила, що містять потрібні класи/теги
    // Дуже легка фільтрація (залишено на майбутнє, НЕ використовується)
    // Дуже легка фільтрація (залишено на майбутнє, НЕ використовується)
    function filterCssByHtmlLoose(css, html) {
        const classes = extractClassSetFromHtml(html);
        const tags = extractTagSetFromHtml(html);
        const keepBlocks = [];
        (css.match(AT_RULE_RE) || []).forEach((x) => keepBlocks.push(x));
        css.replace(/([^{}]+)\{([^}]*)\}/g, (m, sel, body) => {
            if (sel.trim().startsWith("@")) return;
            const selectors = sel.split(",").map((s) => s.trim());
            const has = selectors.some((s) => {
                for (const c of classes) if (s.includes("." + c)) return true;
                for (const t of tags)
                    if (
                        new RegExp(
                            `(^|[\\s>:+~\\.,\\[#])${t}(?=$|[\\s>:+~\\.,\\[#])`
                        ).test(s)
                    )
                        return true;
                return false;
            });
            if (has) keepBlocks.push(`${sel}{${body}}`);
        });
        return keepBlocks.join("\n");
    }

    function bundleSnippet(html, css, js) {
        const parts = [];
        if (html && html.trim()) parts.push(`<!-- HTML -->\n${html.trim()}`);
        if (css && css.trim()) parts.push(`/* CSS */\n${css.trim()}`);
        if (js && js.trim()) parts.push(`/* JS */\n${js.trim()}`);
        return parts.join("\n\n"); // без «Не забудь підключити...»
    }

    function stripContentScope(css) {
        // прибирає токен .content у селекторах, зберігаючи комбінації
        return (css || "")
            .replace(/(^|[,\s>+~])\.content(?=$|[,\s>+~.#:\[])/g, "$1")
            .replace(/\s{2,}/g, " ")
            .replace(/\s*([>+~,])\s*/g, "$1 ")
            .replace(/,\s+/g, ", ");
    }

    // створює кнопку-чип і навішує клік
    function attachCopyChip(targetEl, buildText, label = "Copy") {
        // загортаємо елемент, щоб мати відносне позиціювання
        let wrap = targetEl.closest(".comp-wrap");
        if (!wrap) {
            wrap = document.createElement("div");
            wrap.className = "comp-wrap";
            targetEl.parentNode.insertBefore(wrap, targetEl);
            wrap.appendChild(targetEl);
        }
        const chip = document.createElement("button");
        chip.className = "copy-chip";
        chip.innerHTML = label;
        wrap.appendChild(chip);

        chip.addEventListener("click", async () => {
            const text = buildText();
            await copyTextWithFeedback(text, chip);
        });
    }

    /* ---- Рендери + кодбокси (прев’ю з .std-demo, копія — без .std-demo) ---- */
    function mountStdGroup(
        css,
        html,
        js,
        demoId,
        cssOutId,
        htmlOutId,
        jsOutId
    ) {
        const demo = document.getElementById(demoId);
        const cssBox = document.getElementById(cssOutId);
        const htmlBox = document.getElementById(htmlOutId);
        const jsBox = jsOutId ? document.getElementById(jsOutId) : null;

        if (demo) demo.innerHTML = html.trim();
        if (cssBox) cssBox.textContent = unscope(css.trim()); // робочий CSS
        if (htmlBox) htmlBox.textContent = html.trim();
        if (jsBox) jsBox.textContent = unscope((js || "").trim()); // робочий JS
    }

    function buildStandardGroups() {
        mountStdGroup(
            HEAD_CSS,
            HEAD_HTML,
            HEAD_JS,
            "headDemo",
            "headCssOutput",
            "headHtmlOutput",
            "headJsOutput"
        );
        mountStdGroup(
            CRUMBS_CSS,
            CRUMBS_HTML,
            CRUMBS_JS,
            "crumbsDemo",
            "crumbsCssOutput",
            "crumbsHtmlOutput",
            "crumbsJsOutput"
        );
        mountStdGroup(
            FOOT_CSS,
            FOOT_HTML,
            FOOT_JS,
            "footDemo",
            "footCssOutput",
            "footHtmlOutput",
            "footJsOutput"
        );
        mountStdGroup(
            ADS_CSS,
            ADS_HTML,
            ADS_JS,
            "adsDemo",
            "adsCssOutput",
            "adsHtmlOutput",
            "adsJsOutput"
        );
        mountStdGroup(
            IMGS_CSS,
            IMGS_HTML,
            IMGS_JS,
            "imgsDemo",
            "imgsCssOutput",
            "imgsHtmlOutput",
            "imgsJsOutput"
        );
    }
    function wireStandardCopyChips() {
        const groups = [
            {
                root: "#headDemo",
                css: HEAD_CSS,
                js: HEAD_JS,
                itemSel: "header.nav",
                label: "Copy Header",
                roots: [".nav"],
            },
            {
                root: "#crumbsDemo",
                css: CRUMBS_CSS,
                js: "",
                itemSel: "nav.crumbs",
                label: "Copy Breadcrumbs",
                roots: [".crumbs"],
            },
            {
                root: "#footDemo",
                css: FOOT_CSS,
                js: FOOT_JS,
                itemSel: ".foot",
                label: "Copy Footer",
                roots: [".foot"],
            },
            {
                root: "#adsDemo",
                css: ADS_CSS,
                js: "",
                itemSel: ".adbar,.disclosure,.sponsored-card",
                label: "Copy Block",
                roots: [".adbar", ".disclosure", ".sponsored-card"],
            },
            {
                root: "#imgsDemo",
                css: IMGS_CSS,
                js: IMGS_JS,
                itemSel: ".hero,.product,.avatars,.story-card",
                label: "Copy Block",
                roots: [".hero", ".product", ".avatars", ".story-card"],
            },
            {
                root: "#btnsGrid",
                css: document.getElementById("btnKitStyle").textContent,
                js: "",
                itemSel: "a.btn",
                label: "Copy",
                roots: [".btn"],
            },
        ];

        groups.forEach((g) => {
            const root = document.querySelector(g.root);
            if (!root) return;
            root.querySelectorAll(".copy-chip").forEach((n) => n.remove());

            root.querySelectorAll(g.itemSel).forEach((node) => {
                attachCopyChip(
                    node,
                    () => {
                        const html = node.outerHTML.trim();

                        // 1) даємо фільтру "контейнер прев’ю", щоб селектори з .std-demo матчились строго
                        const scopedHtml = `<div class="std-demo">${html}</div>`;

                        // 2) беремо CSS прямо з активного прев’ю (або з запасного g.css)
                        const cssSource =
                            document.getElementById("stdStyle")?.textContent ||
                            g.css ||
                            "";

                        // 3) фільтруємо БЕЗ зняття .std-demo (keepScope: true)
                        const cssFilteredScoped = filterCssByHtml(
                            cssSource,
                            scopedHtml,
                            { keepScope: true }
                        );

                        // 4) тепер розскоплюємо і додатково звужуємо до "root"-токенів групи
                        const cssUnscoped = unscopeCss(cssFilteredScoped);
                        // 1) лишаємо правила, що містять хоч один клас КОНКРЕТНО цього елемента
                        const classTokens = [...node.classList].map(
                            (c) => "." + c
                        );
                        const cssByClass = restrictCssToRoots(
                            cssUnscoped,
                            classTokens
                        );
                        // 2) додатково звужуємо до “коренів” групи (.nav / .crumbs / .hero ...)
                        const cssTight = restrictCssToRoots(
                            cssByClass,
                            g.roots || []
                        );

                        const js = unscopeCss(g.js || "");

                        return bundleSnippet(html, cssTight, js);
                    },
                    g.label
                );
            });
        });
    }

    function refreshStandardChips() {
        wireStandardCopyChips();
    }

    // Перемикач груп у Standard-секті (прев’ю-стилі лишаються зі .std-demo)
    const stdMap = {
        sbHeader: { id: "std-header", css: HEAD_CSS },
        sbBreadcrumbs: { id: "std-crumbs", css: CRUMBS_CSS },
        sbFooter: { id: "std-footer", css: FOOT_CSS },
        sbAds: { id: "std-ads", css: ADS_CSS },
        sbImages: { id: "std-images", css: IMGS_CSS },
        sbButtons: { id: "std-buttons", css: "" },
    };

    function showStdGroup(btnId) {
        document
            .querySelectorAll("#standardSidebar .list button")
            .forEach((b) => b.classList.toggle("active", b.id === btnId));

        document
            .querySelectorAll("#standardMain .std-group")
            .forEach((g) => (g.hidden = true));

        const target = stdMap[btnId];
        if (!target) return;

        const groupEl = document.getElementById(target.id);
        if (groupEl) groupEl.hidden = false;

        // у прев’ю підключаємо scoped-версію (з .std-demo)
        document.getElementById("stdStyle").textContent = target.css || "";
        equalizeCodeHeights();
        refreshStandardChips();
    }

    // Навішуємо кліки на сайдбар Standard
    [
        "sbHeader",
        "sbBreadcrumbs",
        "sbFooter",
        "sbAds",
        "sbImages",
        "sbButtons",
    ].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener("click", () => showStdGroup(id));
    });

    // ===== Копіювання коду для всіх вкладок (типографіка + компоненти) =====
    [
        ["copyHeadCssBtn", "headCssOutput"],
        ["copyHeadHtmlBtn", "headHtmlOutput"],
        ["copyHeadJsBtn", "headJsOutput"],
        ["copyCrumbsCssBtn", "crumbsCssOutput"],
        ["copyCrumbsHtmlBtn", "crumbsHtmlOutput"],
        ["copyFootCssBtn", "footCssOutput"],
        ["copyFootHtmlBtn", "footHtmlOutput"],
        ["copyAdsCssBtn", "adsCssOutput"],
        ["copyAdsHtmlBtn", "adsHtmlOutput"],
        ["copyImgsCssBtn", "imgsCssOutput"],
        ["copyImgsHtmlBtn", "imgsHtmlOutput"],
        ["copyImgsJsBtn", "imgsJsOutput"],
        ["copyBtnsCssBtn", "btnsCssOutput"],
        ["copyBtnsHtmlBtn", "btnsHtmlOutput"],
    ].forEach(([btnId, boxId]) => {
        const b = document.getElementById(btnId);
        if (b) b.addEventListener("click", () => copyFrom(boxId));
    });

    // Відкриття/закриття модалок (тільки для прев’ю, не впливає на експорт)
    document.addEventListener("click", (e) => {
        const open = e.target.closest("[data-modal-open]");
        if (open) {
            const name = open.getAttribute("data-modal-open");
            const m = document.querySelector(
                '.std-demo .modal[data-modal="' + name + '"]'
            );
            if (m) {
                m.hidden = false;
            }
            e.preventDefault();
        }
        if (e.target.closest("[data-modal-close]")) {
            const modal = e.target.closest(".modal");
            if (modal) modal.hidden = true;
            e.preventDefault();
        }
    });

    /* ===== Preview badges (тільки прев’ю) ===== */
    function ensurePreviewBadgesCSS() {
        if (document.getElementById("previewBadgesStyle")) return;
        const st = document.createElement("style");
        st.id = "previewBadgesStyle";
        st.textContent = `
  .preview .dev-badge{
    position:absolute;top:8px;left:8px;z-index:5;
    background:#111;color:#fff;border-radius:999px;padding:4px 8px;
    font:700 12px/1.1 ui-sans-serif,system-ui;opacity:.92;
    box-shadow:0 2px 6px rgba(0,0,0,.25)
  }
  .preview .dev-badge.img{ left:auto; right:8px; top:8px }
  .std-demo .hero{ position:relative }
  .std-demo figure, .std-demo article, .std-demo .avatars img{ position:relative }
  `;
        document.head.appendChild(st);
    }
    function addHeroAndImageNumbers() {
        ensurePreviewBadgesCSS();
        document
            .querySelectorAll(".preview .dev-badge")
            .forEach((n) => n.remove());
        const heroes = Array.from(
            document.querySelectorAll(".std-demo section.hero")
        );
        heroes.forEach((el, i) => {
            const b = document.createElement("span");
            b.className = "dev-badge";
            b.textContent = "H" + String(i + 1).padStart(2, "0");
            el.appendChild(b);
        });
        const imgs = Array.from(
            document.querySelectorAll(".std-demo img")
        ).filter((img) => !img.closest(".hero"));
        imgs.forEach((img, i) => {
            const b = document.createElement("span");
            b.className = "dev-badge img";
            b.textContent = "IMG" + String(i + 1).padStart(2, "0");
            (img.parentElement || img).appendChild(b);
        });
    }

    function ensurePreviewNumbersCSS() {
        if (document.getElementById("previewNumsStyle")) return;
        const st = document.createElement("style");
        st.id = "previewNumsStyle";
        st.textContent = `
    .comp-num{
      font:700 12px/1 ui-sans-serif,system-ui;
      color:#6b7686; margin:12px 0 6px; opacity:.9;
    }
    body.theme-dark .comp-num{ color:#9aa3b2 }
  `;
        document.head.appendChild(st);
    }

    function addComponentNumbers() {
        ensurePreviewNumbersCSS();
        // при перемиканні груп/вкладок — чистимо старі
        document.querySelectorAll(".comp-num").forEach((n) => n.remove());
        const add = (demoId, selector) => {
            const demo = document.getElementById(demoId);
            if (!demo) return;
            const list = demo.querySelectorAll(selector);
            list.forEach((el, i) => {
                const num = document.createElement("div");
                num.className = "comp-num";
                num.textContent = String(i + 1).padStart(2, "0");
                el.insertAdjacentElement("beforebegin", num);
            });
        };
        // Header / Navbar
        add("headDemo", ".nav");
        // Breadcrumbs
        add("crumbsDemo", ".crumbs");
        // Footer
        add("footDemo", ".foot");
        // Advertisement / Disclosure
        add("adsDemo", ".adbar, .disclosure, .sponsored-card");
        // Images (hero/product/avatar/cards)
        add(
            "imgsDemo",
            "section.hero, article.product, .avatars, figure.story-card"
        );
    }

    function appendIncludeNote(previewId) {
        const host = document.getElementById(previewId);
        if (!host || host.querySelector(".include-note")) return;
        const note = document.createElement("div");
        note.className = "notice include-note";
        note.innerHTML = `
    Не забудь підключити:<br>
    <code>&lt;link rel="stylesheet" href="style.css" /&gt;</code><br>
    <code>&lt;script src="script.js"&gt;&lt;/script&gt;</code>
  `;
        host.appendChild(note);
    }

    // Викликати після buildStandardGroups() і showStdGroup()
    function addNotesToAllPreviews() {
        [
            "typoPreview",
            "headPreview",
            "crumbsPreview",
            "footPreview",
            "adsPreview",
            "imgsPreview",
            "btnsPreview",
        ].forEach(appendIncludeNote);
    }

    // ===== Ініціалізація =====
    function init() {
        document.querySelectorAll("[data-key]").forEach((sel) => {
            if (sel.dataset.key.includes(".size"))
                fillSelect(sel, sizeOptions, 1.0);
            else if (sel.dataset.key.includes(".weight"))
                fillSelect(sel, weightOptions, 400);
            else if (sel.dataset.key.includes(".lh"))
                fillSelect(sel, lhOptions, 1.3);
        });
        ensureHighlightStyle();
        syncControls();
        applyStyles();
        applyColors();
        renderCSS();
        renderHTML();
        renderListLabels();
        renderButtons();
        renderButtonsCSS();
        renderButtonsHTML();
        refreshStandardChips();
        buildStandardGroups();
        wireStandardCopyChips();
        addHeroAndImageNumbers();
        addComponentNumbers();
        addNotesToAllPreviews();

        showStdGroup("sbHeader"); // стартуємо з Header
        equalizeCodeHeights();
    }
    init();
});
