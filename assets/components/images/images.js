// assets/components/images/images.js
import {
    attachCopyChip,
    filterCssByHtmlGeneric,
    equalizeCodeHeights,
} from "../../js/utils.js";

/* ------------ helpers ------------ */
async function fetchText(url) {
    try {
        const r = await fetch(url, { cache: "no-store" });
        return r.ok ? await r.text() : "";
    } catch {
        return "";
    }
}
function setText(id, txt) {
    const el = document.getElementById(id);
    if (el) el.textContent = txt || "";
}
function ensureDevStyles() {
    const s = document.getElementById("stdStyle");
    if (!s || s.dataset.imagesInjected) return;
    s.dataset.imagesInjected = "1";
    s.textContent += `
  .std-demo-item{position:relative}
  .std-demo-item .copy-chip{
    position:absolute;top:8px;right:8px;padding:4px 10px;
    font:inherit;border:1px solid rgba(0,0,0,.15);border-radius:8px;background:#fff;cursor:pointer
  }`;
}

/* ------------ шляхи компонентів ------------ */
const PATH = {
    heroCSS: "assets/components/hero/hero.css",
    heroJS: "assets/components/hero/hero.js",
    productCSS: "assets/components/product/product.css",
    storyCSS: "assets/components/story-card/story-card.css",
    avatarsCSS: "assets/components/avatars/avatars.css",
    btnsCSS: "assets/components/buttons/buttons.css",
    rippleJS: "assets/components/ripple/ripple.js",
};

/* ------------ демо-елементи (BEM .c-*) ------------ */
const ITEMS = [
    // --- HERO ---
    {
        key: "hero-01",
        needsJS: true,
        html: `<section class="c-hero c-hero--01">
  <img src="https://picsum.photos/id/1015/1200/480" alt="Hero 01">
  <div class="c-hero__caption">
    <h2>Summer Shape Program</h2>
    <p>Scientifically-backed plan to kickstart your routine.</p>
    <a class="btn cta-trial" href="#">Start Free Trial</a>
  </div>
</section>`,
    },
    {
        key: "hero-02",
        needsJS: true,
        html: `<section class="c-hero c-hero--02">
  <img src="https://picsum.photos/id/1005/1200/520" alt="Hero 02">
  <div class="c-hero__caption">
    <small class="eyebrow">FEATURED • HEALTH</small>
    <h2>Doctors Reveal: 3 Morning Habits That Boost Metabolism</h2>
  </div>
</section>`,
    },
    {
        key: "hero-03",
        needsJS: true,
        html: `<section class="c-hero c-hero--split">
  <div class="copy">
    <h2>Real Results, Backed by Research</h2>
    <p>Lose up to 6kg in 30 days with our structured routine and diet plan.</p>
    <a class="btn cta-offer" href="#">Get Offer Now</a>
  </div>
  <img src="https://picsum.photos/id/1024/1200/700" alt="Hero 03">
</section>`,
    },
    {
        key: "hero-04",
        needsJS: true,
        html: `<section class="c-hero c-hero--04">
  <img src="https://picsum.photos/id/1035/1400/700" alt="Hero 04">
  <div class="c-hero__caption">
    <small class="eyebrow">EXCLUSIVE • WELLNESS</small>
    <h2>New 10-min Routine That Burns More Than a 5k Run</h2>
    <ul class="trust"><li>✓ 250k+ readers</li><li>✓ Clinically reviewed</li><li>✓ No equipment</li></ul>
    <a class="btn cta-buy ripple" href="#">Try Today</a>
  </div>
</section>`,
    },
    {
        key: "hero-05",
        needsJS: true,
        html: `<section class="c-hero c-hero--05">
  <img src="https://picsum.photos/id/1011/1400/700" alt="Hero 05">
  <div class="c-hero__caption">
    <div class="c-hero__byline">
      <img class="avatar" src="https://i.pravatar.cc/48?img=32" alt="">
      <span><strong>Monica Ruiz</strong> • Investigative Health Writer</span>
    </div>
    <h2>“I tested the 30-day metabolic reset. Here’s what actually works.”</h2>
    <a class="btn cta-sample" href="#">Read My Journal</a>
  </div>
</section>`,
    },
    // square split
    {
        key: "hero-06",
        needsJS: true,
        html: `<section class="c-hero c-hero--split c-hero--square">
  <div class="copy">
    <small class="eyebrow">LATEST</small>
    <h2>Build lean muscle with 15-minute complexes</h2>
    <p>Compact routines with progressive overload and mobility baked in.</p>
    <a class="btn cta-offer" href="#">Explore Plan</a>
  </div>
  <img src="https://picsum.photos/id/1041/1200/700" alt="Hero 06">
</section>`,
    },
    {
        key: "hero-07",
        needsJS: true,
        html: `<section class="c-hero c-hero--square">
  <img src="https://picsum.photos/id/1020/1400/700" alt="Hero 07">
  <div class="c-hero__caption">
    <h2>Nutrition that actually fits your schedule</h2>
    <a class="btn cta-buy" href="#">See Recipes</a>
  </div>
</section>`,
    },

    // --- PRODUCT (якщо product.css ще без префікса .c-*, лишаємо старі класи) ---
    {
        key: "product-01",
        needsJS: false,
        html: `<article class="product">
  <img class="product-img" src="https://picsum.photos/id/1060/640/480" alt="Product">
  <div class="product-body">
    <h3>Omega-3 Complex</h3>
    <div class="rating">★★★★★ <small>(124)</small></div>
    <div class="price">$24.90</div>
    <a class="btn cta-cart" href="#">Add to Cart</a>
  </div>
</article>`,
    },
    {
        key: "product-02",
        needsJS: false,
        html: `<article class="product product-02">
  <img class="product-img" src="https://picsum.photos/id/1074/640/480" alt="Product 02">
  <div class="product-body">
    <h3>Electrolyte Mix</h3>
    <p class="sub">Citrus burst • 30 servings</p>
    <div class="price-row">
      <div class="price">$19.00</div>
      <a class="btn cta-cart" href="#">Add</a>
    </div>
  </div>
</article>`,
    },

    // --- AVATARS (BEM) ---
    {
        key: "avatars-01",
        needsJS: false,
        html: `<div class="c-avatars">
  <img src="https://i.pravatar.cc/64?img=5" alt="">
  <img src="https://i.pravatar.cc/64?img=12" alt="">
  <img src="https://i.pravatar.cc/64?img=32" alt="">
  <span class="c-avatars__more">+42</span>
</div>`,
    },
    {
        key: "avatars-02",
        needsJS: false,
        html: `<div class="c-avatars c-avatars--square">
  <img src="https://i.pravatar.cc/64?img=15" alt="">
  <img src="https://i.pravatar.cc/64?img=21" alt="">
  <img src="https://i.pravatar.cc/64?img=8" alt="">
  <span class="c-avatars__more">+8</span>
</div>`,
    },

    // --- STORY CARDS (BEM) ---
    {
        key: "story-01",
        needsJS: false,
        html: `<figure class="c-story c-story--bar">
  <img src="https://picsum.photos/id/1003/880/540" alt="Story">
  <figcaption>Discours de Mona à la conférence</figcaption>
</figure>`,
    },
    {
        key: "story-02",
        needsJS: false,
        html: `<figure class="c-story c-story--ribbon">
  <img src="https://picsum.photos/id/1011/880/540" alt="Story">
  <figcaption>Exclusive: Nutritionist explains the “Keto Window”</figcaption>
  <span class="c-story__ribbon">Sponsored</span>
</figure>`,
    },
    {
        key: "story-03",
        needsJS: false,
        html: `<figure class="c-story c-story--polaroid">
  <img src="https://picsum.photos/id/1027/880/540" alt="Story">
  <figcaption>Before/After — 8 Weeks Journal</figcaption>
</figure>`,
    },
    {
        key: "story-04",
        needsJS: false,
        html: `<figure class="c-story c-story--square">
  <img src="https://picsum.photos/id/1059/880/540" alt="Story">
  <figcaption>Feature • Mobility Reset in 7 Days</figcaption>
</figure>`,
    },
];

/* ------------ підвантаження скриптів для прев’ю ------------ */
function ensureHeroJsLoaded() {
    if (document.querySelector('script[data-herojs="1"]')) return;
    const s = document.createElement("script");
    s.src = PATH.heroJS;
    s.defer = true;
    s.dataset.herojs = "1";
    document.head.appendChild(s);
}
function ensureRippleJsLoaded() {
    if (document.querySelector('script[data-ripplejs="1"]')) return;
    const s = document.createElement("script");
    s.src = PATH.rippleJS;
    s.defer = true;
    s.dataset.ripplejs = "1";
    document.head.appendChild(s);
}

// Мінімальний reset — щоб блоки виглядали ок на «порожній» сторінці
const BASE_RESET = `
*{ box-sizing:border-box }
img{ max-width:100%; height:auto; display:block }
button, a{ -webkit-tap-highlight-color: transparent }
figure{ margin:0 }
`;

// прибрати .std-demo/.preview префікси з CSS демо перед фільтрацією
function normalizeCssForCopy(css) {
    if (!css) return "";
    css = css.replace(/(^|[\\s,{])\\.std-demo\\s+/g, "$1");
    css = css.replace(/(^|[\\s,{])\\.preview\\s+/g, "$1");
    return css;
}

/* ------------ головна ініціалізація ------------ */
export async function initImages() {
    const host = document.getElementById("imgsDemo");
    if (!host) return;

    ensureDevStyles();
    ensureHeroJsLoaded();
    ensureRippleJsLoaded();

    // завантажуємо CSS/JS
    const [
        heroCSS,
        productCSS,
        storyCSS,
        avatarsCSS,
        btnsCSS,
        heroJS,
        rippleJS,
    ] = await Promise.all([
        fetchText(PATH.heroCSS),
        fetchText(PATH.productCSS),
        fetchText(PATH.storyCSS),
        fetchText(PATH.avatarsCSS),
        fetchText(PATH.btnsCSS),
        fetchText(PATH.heroJS),
        fetchText(PATH.rippleJS),
    ]);

    // 1) CSS для фільтра: сума компонентних стилів (без dev-префіксів)
    const COMP_CSS_FOR_FILTER = normalizeCssForCopy(
        [heroCSS, productCSS, storyCSS, avatarsCSS].filter(Boolean).join("\n\n")
    );

    // 2) Кнопки — додаємо повністю (щоб не втратити :hover/@media/vars)
    const BTN_CSS_RAW = btnsCSS || "";

    // 3) CSS вкладки «CSS» (для прев’ю)
    const ALL_CSS_FOR_PREVIEW = [
        normalizeCssForCopy(heroCSS || ""),
        normalizeCssForCopy(productCSS || ""),
        normalizeCssForCopy(storyCSS || ""),
        normalizeCssForCopy(avatarsCSS || ""),
        BTN_CSS_RAW,
    ]
        .filter(Boolean)
        .join("\n\n");

    // рендер демо
    host.innerHTML = "";
    ITEMS.forEach((item, i) => {
        const wrap = document.createElement("div");
        wrap.className = "std-demo-item";
        wrap.innerHTML = `<div class="dev-badge">${String(i + 1).padStart(
            2,
            "0"
        )}</div>${item.html}`;
        host.appendChild(wrap);

        const root =
            wrap.querySelector(".c-hero, .product, .c-avatars, .c-story") ||
            wrap;

        attachCopyChip(
            root,
            () => {
                // 1) чистий HTML
                const clone = root.cloneNode(true);
                clone
                    .querySelectorAll(".copy-chip,.dev-badge,.badge")
                    .forEach((n) => n.remove());
                const htmlOut = clone.outerHTML.trim();

                // 2) відфільтрований CSS лише під цей HTML
                const compCss = filterCssByHtmlGeneric(
                    COMP_CSS_FOR_FILTER,
                    htmlOut
                );

                // 3) фінальний CSS: ресет + компонентний + повний buttons.css
                const finalCss = [BASE_RESET, compCss, BTN_CSS_RAW]
                    .filter(Boolean)
                    .join("\n\n");

                // 4) JS: hero.js для героїв; ripple.js якщо є клас 'ripple'
                const needHeroJs = root.classList.contains("c-hero");
                const needRipple = /\bripple\b/.test(htmlOut);
                const jsOut = [
                    needHeroJs ? heroJS || "" : "",
                    needRipple ? rippleJS || "" : "",
                ]
                    .filter(Boolean)
                    .join("\n\n");

                // 5) пакет у буфер (без <style>/<script>)
                return [
                    `<!-- ===== HTML ===== -->\n${htmlOut}`,
                    finalCss.trim()
                        ? `/* ===== CSS ===== */\n${finalCss.trim()}`
                        : "",
                    jsOut.trim() ? `/* ===== JS ===== */\n${jsOut.trim()}` : "",
                ]
                    .filter(Boolean)
                    .join("\n\n");
            },
            "Copy Block"
        );
    });

    // вкладки HTML/CSS/JS (для всієї секції)
    setText(
        "imgsHtmlOutput",
        ITEMS.map(
            (x, i) =>
                `<!-- ${String(i + 1).padStart(2, "0")} ${x.key} -->\n${x.html}`
        ).join("\n\n")
    );
    setText("imgsCssOutput", ALL_CSS_FOR_PREVIEW || "/* No CSS */");
    setText(
        "imgsJsOutput",
        [heroJS, rippleJS].filter(Boolean).join("\n\n") ||
            "/* No JS for Images */"
    );

    equalizeCodeHeights?.();
}
