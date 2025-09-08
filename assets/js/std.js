// assets/js/std.js — стабільна версія (каркас груп + демки)
import {
    equalizeCodeHeights,
    filterCssByHtml,
    filterCssByHtmlGeneric,
    prependUsedVars,
} from "./utils.js";

/* ---------- helpers ---------- */
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
function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text || "").then(() => {
        if (!btn) return;
        btn.dataset.state = "copied";
        setTimeout(() => (btn.dataset.state = ""), 1500);
    });
}
function selectInnerTab(groupEl, tabBtn) {
    const inner = tabBtn.dataset.inner;
    groupEl.querySelectorAll("[data-inner-panel]").forEach((p) => {
        p.hidden = p.dataset.innerPanel !== inner;
    });
    groupEl
        .querySelectorAll(".inner-tab")
        .forEach((b) => b.setAttribute("aria-selected", String(b === tabBtn)));
}
function addPreviewReminder(previewId) {
    const cont = document.getElementById(previewId);
    if (!cont || cont.dataset._reminder) return;
    cont.dataset._reminder = "1";
    const p = document.createElement("p");
    p.className = "notice";
    p.innerHTML =
        "Не забудь підключити:<br>" +
        '<code>&lt;link rel="stylesheet" href="style.css" /&gt;</code><br>' +
        '<code>&lt;script src="script.js"&gt;&lt;/script&gt;</code>';
    cont.appendChild(p);
}

// Лого (CDN) та акценти / “луки”
const LOGOS = [
    "nytimes.com",
    "theguardian.com",
    "reuters.com",
    "bbc.com",
    "washingtonpost.com",
    "wsj.com",
    "cnn.com",
    "apnews.com",
    "bloomberg.com",
    "ft.com",
    "aljazeera.com",
    "nbcnews.com",
].map((d) => `https://www.google.com/s2/favicons?sz=64&domain=${d}`);

const ACCENTS = [
    "#b71c1c",
    "#0d47a1",
    "#00695c",
    "#4a148c",
    "#e65100",
    "#1b5e20",
    "#004d40",
    "#3e2723",
    "#880e4f",
    "#01579b",
    "#33691e",
    "#ff6f00",
];
const LOOKS = ["pill", "square", "underline", "ghost", "chip", "soft"];

// Стилі для демо: копі-чіп і різні варіанти меню
function ensureDevStyles() {
    const s = document.getElementById("stdStyle");
    if (!s) return;
    if (s.dataset.navInjected) return;
    s.dataset.navInjected = "1";
    s.textContent += `
  .std-demo-item{position:relative}
  .std-demo-item .copy-chip{
    position:absolute;top:8px;right:8px;padding:4px 10px;
    font:inherit;border:1px solid rgba(0,0,0,.15);border-radius:8px;background:#fff;cursor:pointer
  }
  .std-demo-item.variant-square .c-nav__links a{border-radius:4px}
  .std-demo-item.variant-underline .c-nav__links a{border-radius:0;background:transparent}
  .std-demo-item.variant-underline .c-nav__links a:hover{background:transparent;box-shadow:inset 0 -2px 0 currentColor}
  .std-demo-item.variant-ghost .c-nav__links a:not(.is-current){background:transparent;border:1px dashed rgba(0,0,0,.3)}
  .std-demo-item.variant-chip .c-nav__links a{border-radius:999px}
  .std-demo-item.variant-soft .c-nav{box-shadow:inset 0 -2px 0 var(--nav-accent),0 4px 24px rgba(0,0,0,.06)}
  .c-nav__brand .logo{width:20px;height:20px;display:inline-block}
  `;
}

// Підключаємо реальний navbar.js, щоб працював бургер
let _navJsLoaded = false;
function ensureNavbarJsLoaded() {
    if (_navJsLoaded) return;
    const have = document.querySelector('script[data-navjs="1"]');
    if (have) {
        _navJsLoaded = true;
        return;
    }
    const s = document.createElement("script");
    s.src = PATH.navJS;
    s.defer = true;
    s.dataset.navjs = "1";
    s.onload = () => {
        _navJsLoaded = true;
    };
    document.head.appendChild(s);
}

let _footJsLoaded = false;
function ensureFooterJsLoaded() {
    if (_footJsLoaded) return;
    const have = document.querySelector('script[data-footjs="1"]');
    if (have) {
        _footJsLoaded = true;
        return;
    }
    const s = document.createElement("script");
    s.src = PATH.footJS;
    s.defer = true;
    s.dataset.footjs = "1";
    s.onload = () => {
        _footJsLoaded = true;
    };
    document.head.appendChild(s);
}

/* ---------- шлях до компонентів ---------- */
const PATH = {
    navCSS: "assets/components/navbar/navbar.css",
    navJS: "assets/components/navbar/navbar.js",
    crumbsCSS: "assets/components/breadcrumbs/breadcrumbs.css",
    footCSS: "assets/components/footer/footer.css",
    footJS: "assets/components/footer/footer.js",
    discCSS: "assets/components/disclosure/disclosure.css",
    discJS: "assets/components/disclosure/disclosure.js",
    heroCSS: "assets/components/hero/hero.css",
    heroJS: "assets/components/hero/hero.js",
    btnsCSS: "assets/components/buttons/buttons.css",
    rippleJS: "assets/components/ripple/ripple.js",
    calloutCSS: "assets/components/callout/callout.css",
    calloutJS: "assets/components/callout/callout.js",
};

/* ---------- NAVBAR демки (12) ---------- */
/* Маркап під твій CSS/JS: .c-nav__links + [data-nav-toggle] */
let NAV_CSS = "",
    NAV_JS = "";
const NAV_VARIANTS = [
    `<header class="c-header"><nav class="c-nav">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[0]}" alt="" /> News</a>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
  <div class="c-nav__links">
    <a href="#">Politics</a><a href="#">Video</a><a href="#">Entertainments</a>
    <a class="is-current" href="#">World News</a><a href="#">Blogs</a>
  </div>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav c-nav--split">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[1]}" alt="" /> News</a>
  <div class="c-nav__links"><a href="#">Overview</a><a href="#">Benefits</a><a href="#">Reviews</a><a href="#">FAQ</a></div>
  <a class="btn primary" href="#contact">Learn More</a>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav c-nav--split">
  <a class="c-nav__brand" href="/">News <small class="badge">New</small></a>
  <div class="c-nav__links"><a href="#">Diet</a><a href="#">Fitness</a><a href="#">Beauty</a></div>
  <a class="btn" href="#">Buy Now</a>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[0]}" alt="" /> News</a>
  <div class="c-nav__links"><a href="#">Home</a><a href="#">Politics</a><a href="#">Video</a><a href="#">Entertainments</a><a href="#">Sports</a><a class="is-current" href="#">World News</a><a href="#">Blogs</a></div>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav c-nav--split">
  <a class="c-nav__brand" href="/"><strong>Indo-</strong>Network</a>
  <div class="c-nav__links"><a href="#">KESEHATAN</a><a href="#">FOKUS</a><a href="#">BISNIS</a><a href="#">POLITIK</a><a href="#">GAYA HIDUP</a><a href="#">INTERNASIONAL</a><a href="#">BUDAYA</a></div>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav">
  <a class="c-nav__brand" href="/">Wellness</a>
  <div class="c-nav__links"><a class="is-current" href="#">Top Stories</a><a href="#">Research</a><a href="#">Workouts</a><a href="#">Nutrition</a><a href="#">Beauty</a></div>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav c-nav--centered">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[0]}" alt="" /> Daily Journal</a>
  <div class="c-nav__links"><a href="#">Health</a><a href="#">Science</a><a href="#">World</a><a href="#">Lifestyle</a><a href="#">Tech</a><a href="#">Opinion</a></div>
  <a class="btn" href="#contact">Newsletter</a>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav c-nav--split">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[1]}" alt="" /> Press</a>
  <div class="c-nav__links"><a href="#">Home</a><a href="#">Topics</a><a href="#">About</a></div>
  <div class="c-nav__links"><a href="#">Log in</a><a class="is-current" href="#contact">Sign up</a></div>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[0]}" alt="" /> City News</a>
  <div class="c-nav__links"><a href="#">Local</a><a href="#">Business</a><a href="#">Tech</a><a class="is-current" href="#">World</a><a href="#">Travel</a></div>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav c-nav--split">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[1]}" alt="" /> News</a>
  <div class="c-nav__links"><a href="#">Politics</a><a href="#">Sports</a><a class="is-current" href="#">World</a></div>
  <a class="btn primary" href="#contact">Subscribe</a>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav c-nav--centered">
  <div class="c-nav__links"><a href="#">Home</a><a class="is-current" href="#">World</a><a href="#">Opinion</a></div>
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[0]}" alt="" /> Global Post</a>
  <div class="c-nav__links"><a href="#">Newsletter</a><a href="#">About</a></div>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav">
  <a class="c-nav__brand" href="/">News</a>
  <div class="c-nav__links"><a href="#">Top</a><a href="#">Latest</a><a href="#">Markets</a><a class="is-current" href="#">World</a></div>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
    `<header class="c-header"><nav class="c-nav c-nav--split">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[1]}" alt="" /> Herald</a>
  <div class="c-nav__links"><a href="#">Top</a><a href="#">Latest</a><a class="is-current" href="#">World</a><a href="#">Tech</a><a href="#">Culture</a></div>
  <a class="btn primary" href="#contact">Subscribe</a>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,

    // --- Square (3) ---
    `<header class="c-header"><nav class="c-nav c-nav--square c-nav--split">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[2]}" alt="" /> Square News</a>
  <div class="c-nav__links"><a href="#">Home</a><a href="#">Topics</a><a class="is-current" href="#">World</a></div>
  <a class="btn square primary" href="#contact">Subscribe</a>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,

    `<header class="c-header"><nav class="c-nav c-nav--square c-nav--centered">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[3]}" alt="" /> Square Journal</a>
  <div class="c-nav__links"><a href="#">Health</a><a class="is-current" href="#">Science</a><a href="#">Tech</a></div>
  <a class="btn square" href="#">Newsletter</a>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,

    `<header class="c-header"><nav class="c-nav c-nav--square">
  <a class="c-nav__brand" href="/">Square Herald</a>
  <div class="c-nav__links"><a href="#">Top</a><a href="#">Latest</a><a class="is-current" href="#">World</a><a href="#">Tech</a></div>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,

    // --- Dark (3) ---
    `<header class="c-header"><nav class="c-nav c-nav--dark c-nav--dark-1 c-nav--split">
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[4]}" alt="" /> Dark Press</a>
  <div class="c-nav__links"><a href="#">Home</a><a href="#">Topics</a><a class="is-current" href="#">World</a></div>
  <a class="btn square" href="#login">Log in</a>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,

    `<header class="c-header"><nav class="c-nav c-nav--dark c-nav--dark-2 c-nav--centered">
  <div class="c-nav__links"><a href="#">Home</a><a class="is-current" href="#">Opinion</a><a href="#">Culture</a></div>
  <a class="c-nav__brand" href="/"><img class="logo" src="${LOGOS[5]}" alt="" /> Night Post</a>
  <div class="c-nav__links"><a href="#">Newsletter</a><a href="#">About</a></div>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,

    `<header class="c-header"><nav class="c-nav c-nav--dark c-nav--dark-3 c-nav--square">
  <a class="c-nav__brand" href="/">Dark Herald</a>
  <div class="c-nav__links"><a href="#">Top</a><a href="#">Latest</a><a class="is-current" href="#">World</a><a href="#">Markets</a></div>
  <button class="c-nav__toggle" data-nav-toggle aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`,
];

function buildNavbars() {
    const host = document.getElementById("headDemo");
    if (!host) return;

    ensureDevStyles();
    ensureNavbarJsLoaded();

    function ensureFooterJsLoaded() {
        if (_footJsLoaded) return;
        const have = document.querySelector('script[data-footjs="1"]');
        if (have) {
            _footJsLoaded = true;
            return;
        }
        const s = document.createElement("script");
        s.src = PATH.footJS;
        s.defer = true;
        s.dataset.footjs = "1";
        s.onload = () => {
            _footJsLoaded = true;
        };
        document.head.appendChild(s);
    }

    host.innerHTML = "";
    NAV_VARIANTS.forEach((html, i) => {
        const wrap = document.createElement("div");
        wrap.className = "std-demo-item";
        // різні акценти та “луки”
        wrap.style.setProperty("--nav-accent", ACCENTS[i % ACCENTS.length]);
        wrap.classList.add(`variant-${LOOKS[i % LOOKS.length]}`);

        wrap.innerHTML = `<div class="dev-badge">${String(i + 1).padStart(
            2,
            "0"
        )}</div>${html}`;
        host.appendChild(wrap);

        // Copy Header
        const headerEl = wrap.querySelector(".c-header");
        const btn = document.createElement("button");
        btn.className = "copy-chip";
        btn.textContent = "Copy Header";
        // ЗАМІНИ цей обробник у buildNavbars()
        btn.addEventListener("click", async () => {
            const css = await fetchText(PATH.navCSS); // <-- navCSS
            const js = await fetchText(PATH.navJS); // <-- navJS (якщо потрібен)
            const block = wrap.querySelector(".c-header").outerHTML.trim(); // <-- .c-header

            const parts = [];
            if (css.trim()) parts.push("/* ===== CSS ===== */\n" + css.trim());
            parts.push("<!-- ===== HTML ===== -->\n" + block);
            if (js.trim()) parts.push("// ===== JS =====\n" + js.trim());

            copyToClipboard(parts.join("\n\n"), btn);
        });

        wrap.appendChild(btn);
    });

    // кодбокси секції
    setText(
        "headHtmlOutput",
        NAV_VARIANTS.map(
            (h, i) => `<!-- ${String(i + 1).padStart(2, "0")} -->\n${h}`
        ).join("\n\n")
    );
    fetchText(PATH.navCSS).then((css) => {
        setText("headCssOutput", css);
        equalizeCodeHeights?.();
    });
    fetchText(PATH.navJS).then((js) =>
        setText("headJsOutput", js || "/* No JS for this component */")
    );
}

/* ---------- FOOTER demos (12 variants) ---------- */
let FOOT_CSS = "",
    FOOT_JS = "";

const FOOTER_MODAL_SNIPPET = `
  <div class="c-overlay" hidden></div>

  <div class="c-modal" data-modal-id="privacy" hidden>
    <div class="c-modal__box">
      <button class="c-modal__x" data-close aria-label="Close">×</button>
      <h3>Privacy Policy</h3>
      <p>We collect limited usage data to improve user experience. Data may include pages visited and basic device information.</p>
      <p>By continuing to use this site, you agree to this Privacy Policy.</p>
    </div>
  </div>

  <div class="c-modal" data-modal-id="terms" hidden>
    <div class="c-modal__box">
      <button class="c-modal__x" data-close aria-label="Close">×</button>
      <h3>Terms of Service</h3>
      <p>By using this website, you agree not to misuse the service and to comply with applicable laws.</p>
      <p>Content is provided “as-is” with no warranties.</p>
    </div>
  </div>

  <div class="c-modal" data-modal-id="disclosure" hidden>
    <div class="c-modal__box">
      <button class="c-modal__x" data-close aria-label="Close">×</button>
      <h3>Advertising Disclosure</h3>
      <p>This page may contain affiliate links. If you click and purchase, we may earn a small commission at no extra cost to you.</p>
    </div>
  </div>

  <div class="c-modal" data-modal-id="cookies" hidden>
    <div class="c-modal__box">
      <button class="c-modal__x" data-close aria-label="Close">×</button>
      <h3>Cookies</h3>
      <p>We use essential cookies to operate the site and optional cookies to measure performance.</p>
      <p>You can control cookies in your browser settings.</p>
    </div>
  </div>
`;

const FOOTER_VARIANTS = [
    /* 01 — light columns 3 */
    `<footer class="c-foot c-foot--light-1">
  <div class="c-foot__grid cols-3">
    <div>
      <div class="c-foot__ttl">Company</div>
      <ul class="c-foot__list">
        <li><a href="#">About</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Press</a></li>
      </ul>
    </div>
    <div>
      <div class="c-foot__ttl">Resources</div>
      <ul class="c-foot__list">
        <li><a href="#">Blog</a></li>
        <li><a href="#">Guides</a></li>
        <li><a href="#">Support</a></li>
      </ul>
    </div>
    <div>
      <div class="c-foot__ttl">Legal</div>
      <ul class="c-foot__list">
        <li><a href="#" data-modal="terms">Terms</a></li>
        <li><a href="#" data-modal="privacy">Privacy</a></li>
      </ul>
    </div>
  </div>
  <div class="c-foot__legal">
    <span>© 2025 Brand</span>
    <span class="sep">•</span>
    <a href="#" data-modal="disclosure">Disclosure</a>
    <span>·</span>
    <a href="#" data-modal="cookies">Cookies</a>
    <span>·</span>
    <a href="#" data-modal="privacy">Privacy</a>
    <span>·</span>
    <a href="#" data-modal="terms">Terms</a>
  </div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 02 — light center */
    `<footer class="c-foot c-foot--light-2 c-foot--center">
  <div class="c-foot__brand"><img src="https://placehold.co/20x20" alt=""> Brand</div>
  <div class="c-foot__legal">
    <a href="#" data-modal="disclosure">Disclosure</a> ·
    <a href="#" data-modal="terms">Terms</a> ·
    <a href="#" data-modal="privacy">Privacy</a> ·
    <a href="#" data-modal="cookies">Cookies</a>
  </div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 03 — light columns 4 */
    `<footer class="c-foot c-foot--light-3">
  <div class="c-foot__grid cols-4">
    <div>
      <div class="c-foot__ttl">Product</div>
      <ul class="c-foot__list"><li><a href="#">Overview</a></li><li><a href="#">Pricing</a></li><li><a href="#">Updates</a></li></ul>
    </div>
    <div>
      <div class="c-foot__ttl">Company</div>
      <ul class="c-foot__list"><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Contact</a></li></ul>
    </div>
    <div>
      <div class="c-foot__ttl">Resources</div>
      <ul class="c-foot__list"><li><a href="#">Docs</a></li><li><a href="#">Blog</a></li><li><a href="#">Status</a></li></ul>
    </div>
    <div>
      <div class="c-foot__ttl">Legal</div>
      <ul class="c-foot__list"><li><a href="#" data-modal="terms">Terms</a></li><li><a href="#" data-modal="privacy">Privacy</a></li></ul>
    </div>
  </div>
  <div class="c-foot__legal"><span>© 2025 Brand</span></div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 04 — light minimal inline */
    `<footer class="c-foot c-foot--light-4 c-foot--center">
  <div class="c-foot__legal">
    <span>© 2025 Brand</span> ·
    <a href="#" data-modal="disclosure">Disclosure</a> ·
    <a href="#" data-modal="terms">Terms</a> ·
    <a href="#" data-modal="privacy">Privacy</a> ·
    <a href="#" data-modal="cookies">Cookies</a>
  </div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 05 — light w/ brand left */
    `<footer class="c-foot c-foot--light-5">
  <div class="c-foot__grid cols-3">
    <div class="c-foot__brand"><img src="https://placehold.co/20x20" alt=""> HealthDaily</div>
    <div>
      <div class="c-foot__ttl">Explore</div>
      <ul class="c-foot__list"><li><a href="#">Top</a></li><li><a href="#">Latest</a></li><li><a href="#">Guides</a></li></ul>
    </div>
    <div>
      <div class="c-foot__ttl">Legal</div>
      <ul class="c-foot__list"><li><a href="#" data-modal="privacy">Privacy</a></li><li><a href="#" data-modal="terms">Terms</a></li></ul>
    </div>
  </div>
  <div class="c-foot__legal"><a href="#" data-modal="disclosure">Disclosure</a> · <a href="#" data-modal="cookies">Cookies</a></div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 06 — light simple blocks */
    `<footer class="c-foot c-foot--light-6">
  <div class="c-foot__grid cols-2">
    <div>
      <div class="c-foot__ttl">Company</div>
      <ul class="c-foot__list"><li><a href="#">About</a></li><li><a href="#">Press</a></li><li><a href="#">Jobs</a></li></ul>
    </div>
    <div>
      <div class="c-foot__ttl">Legal</div>
      <ul class="c-foot__list"><li><a href="#" data-modal="disclosure">Disclosure</a></li><li><a href="#" data-modal="privacy">Privacy</a></li><li><a href="#" data-modal="terms">Terms</a></li></ul>
    </div>
  </div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 07 — colored indigo */
    `<footer class="c-foot c-foot--brand-indigo c-foot--center">
  <div class="c-foot__brand">Brand</div>
  <div class="c-foot__legal">
    <a href="#" data-modal="terms">Terms</a> ·
    <a href="#" data-modal="privacy">Privacy</a> ·
    <a href="#" data-modal="disclosure">Disclosure</a> ·
    <a href="#" data-modal="cookies">Cookies</a>
  </div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 08 — colored teal columns */
    `<footer class="c-foot c-foot--brand-teal">
  <div class="c-foot__grid cols-3">
    <div><div class="c-foot__ttl">Resources</div>
      <ul class="c-foot__list"><li><a href="#">Blog</a></li><li><a href="#">Guides</a></li></ul></div>
    <div><div class="c-foot__ttl">Support</div>
      <ul class="c-foot__list"><li><a href="#">Help Center</a></li><li><a href="#">Contact</a></li></ul></div>
    <div><div class="c-foot__ttl">Legal</div>
      <ul class="c-foot__list"><li><a href="#" data-modal="privacy">Privacy</a></li><li><a href="#" data-modal="terms">Terms</a></li></ul></div>
  </div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 09 — colored amber inline */
    `<footer class="c-foot c-foot--brand-amber c-foot--center">
  <div class="c-foot__legal">
    <span>© 2025 Brand</span> ·
    <a href="#" data-modal="privacy">Privacy</a> ·
    <a href="#" data-modal="terms">Terms</a> ·
    <a href="#" data-modal="disclosure">Disclosure</a> ·
    <a href="#" data-modal="cookies">Cookies</a>
  </div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 10 — dark slate 3 cols */
    `<footer class="c-foot c-foot--dark-1">
  <div class="c-foot__grid cols-3">
    <div><div class="c-foot__ttl">Company</div>
      <ul class="c-foot__list"><li><a href="#">About</a></li><li><a href="#">Press</a></li></ul></div>
    <div><div class="c-foot__ttl">Resources</div>
      <ul class="c-foot__list"><li><a href="#">Blog</a></li><li><a href="#">Docs</a></li></ul></div>
    <div><div class="c-foot__ttl">Legal</div>
      <ul class="c-foot__list"><li><a href="#" data-modal="privacy">Privacy</a></li><li><a href="#" data-modal="terms">Terms</a></li></ul></div>
  </div>
  <div class="c-foot__legal"><a href="#" data-modal="disclosure">Disclosure</a> · <a href="#" data-modal="cookies">Cookies</a></div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 11 — dark gunmetal center */
    `<footer class="c-foot c-foot--dark-2 c-foot--center">
  <div class="c-foot__brand"><img src="https://placehold.co/20x20" alt=""> NightPost</div>
  <div class="c-foot__legal">
    <a href="#" data-modal="terms">Terms</a> ·
    <a href="#" data-modal="privacy">Privacy</a> ·
    <a href="#" data-modal="disclosure">Disclosure</a> ·
    <a href="#" data-modal="cookies">Cookies</a>
  </div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,

    /* 12 — dark navy minimal */
    `<footer class="c-foot c-foot--dark-3 c-foot--center">
  <div class="c-foot__legal">
    <span>© 2025 Brand</span> ·
    <a href="#" data-modal="privacy">Privacy</a> ·
    <a href="#" data-modal="terms">Terms</a> ·
    <a href="#" data-modal="cookies">Cookies</a>
  </div>
  ${FOOTER_MODAL_SNIPPET}
</footer>`,
];

function buildFooters() {
    const host = document.getElementById("footDemo");
    if (!host) return;

    ensureDevStyles(); // щоб була кнопка Copy
    ensureFooterJsLoaded(); // ← підключаємо робочий JS модалок

    host.innerHTML = "";
    FOOTER_VARIANTS.forEach((html, i) => {
        const wrap = document.createElement("div");
        wrap.className = "std-demo-item";
        wrap.innerHTML = `<div class="dev-badge">${String(i + 1).padStart(
            2,
            "0"
        )}</div>${html}`;
        host.appendChild(wrap);

        const btn = document.createElement("button");
        btn.className = "copy-chip";
        btn.textContent = "Copy Footer";
        btn.addEventListener("click", async () => {
            const css = FOOT_CSS || (FOOT_CSS = await fetchText(PATH.footCSS));
            const js = FOOT_JS || (FOOT_JS = await fetchText(PATH.footJS));
            const parts = [];
            if (css.trim()) parts.push("/* ===== CSS ===== */\n" + css.trim());
            parts.push(
                "<!-- ===== HTML ===== -->\n" +
                    wrap.querySelector(".c-foot").outerHTML.trim()
            );
            if (js.trim()) parts.push("// ===== JS =====\n" + js.trim());
            copyToClipboard(parts.join("\n\n"), btn);
        });
        wrap.appendChild(btn);
    });

    // Fill codeboxes (CSS/JS/All HTML)
    fetchText(PATH.footCSS).then((css) => setText("footCssOutput", css || ""));
    fetchText(PATH.footJS).then((js) =>
        setText("footJsOutput", js || "/* No JS */")
    );
    setText(
        "footHtmlOutput",
        FOOTER_VARIANTS.map(
            (h, i) => `<!-- ${String(i + 1).padStart(2, "0")} -->\n${h}`
        ).join("\n\n")
    );

    equalizeCodeHeights?.();
}

/* call inside your init */

/* ---------- інші демки + заповнення вкладок ---------- */
async function buildMiscDemos() {
    // Ads / Disclosure (top-of-page), багатоваріантна демка + Copy (HTML+CSS+JS)
    const adsDemo = document.getElementById("adsDemo");
    if (adsDemo) {
        // ensure styles for copy chip + підключити робочий JS модалок
        ensureDevStyles();
        (function ensureDisclosureJsLoaded() {
            const have = document.querySelector('script[data-discjs="1"]');
            if (have) return;
            const s = document.createElement("script");
            s.src = PATH.discJS;
            s.defer = true;
            s.dataset.discjs = "1";
            document.head.appendChild(s);
        })();

        const ADS_VARIANTS = [
            /* 01 */ `<div class="disc disc-left disc-muted">
  <a href="#" class="disc-link" data-disc-open="d1">Advertorial | Disclosure</a>
  <div class="disc-modal" data-disc="d1" hidden>
    <div class="disc-overlay overlay-dark overlay-desat" data-disc-close></div>
    <div class="disc-box box-r12">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Advertorial & Disclosure</h3>
      <p>The material may contain affiliate links. If you purchase through a link, we may earn a commission — at no extra cost to you.</p>
    </div>
  </div>
</div>`,

            /* 02 */ `<div class="disc disc-center disc-dark">
  <a href="#" class="disc-link" data-disc-open="d2">Advertorial | Disclosure</a>
  <div class="disc-modal" data-disc="d2" hidden>
    <div class="disc-overlay overlay-blur overlay-desat" data-disc-close></div>
    <div class="disc-box box-r16">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Disclosure</h3>
      <p>Our content is reader-supported. Purchases made through our links help support the site. Thank you!</p>
    </div>
  </div>
</div>`,

            /* 03 */ `<div class="disc disc-right disc-dark">
  <a href="#" class="disc-link" data-disc-open="d3">Advertorial | Disclosure</a>
  <div class="disc-modal" data-disc="d3" hidden>
    <div class="disc-overlay overlay-light overlay-desat" data-disc-close></div>
    <div class="disc-box box-r20">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>About This Page</h3>
      <p>This page is promotional (advertorial). All opinions are editorial, but we may receive compensation for referrals.</p>
    </div>
  </div>
</div>`,

            /* 04 */ `<div class="disc disc-left disc-dark">
  <a href="#" class="disc-link" data-disc-open="d4a">Advertorial | Disclosure</a>
  <div class="disc-modal" data-disc="d4a" hidden>
    <div class="disc-overlay overlay-dark" data-disc-close></div>
    <div class="disc-box">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Advertorial & Disclosure</h3>
      <p>The material may contain affiliate links. If you purchase through a link, we may earn a commission — at no extra cost to you.</p>
    </div>
  </div>
</div>`,

            /* 05 */ `<div class="disc disc-center disc-muted">
  <a href="#" class="disc-link" data-disc-open="d5a">Advertorial | Disclosure</a>
  <div class="disc-modal" data-disc="d5a" hidden>
    <div class="disc-overlay overlay-blur" data-disc-close></div>
    <div class="disc-box">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Disclosure</h3>
      <p>Our content is reader-supported. Purchases made through our links help support the site. Thank you!</p>
    </div>
  </div>
</div>`,

            /* 06 */ `<div class="disc disc-right disc-muted">
  <a href="#" class="disc-link" data-disc-open="d6a">Advertorial | Disclosure</a>
  <div class="disc-modal" data-disc="d6a" hidden>
    <div class="disc-overlay overlay-light" data-disc-close></div>
    <div class="disc-box">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>About This Page</h3>
      <p>This page is promotional (advertorial). All opinions are editorial, but we may receive compensation for referrals.</p>
    </div>
  </div>
</div>`,

            /* 07 */ `<div class="disc disc-left disc-muted">
  <a href="#" class="disc-link" data-disc-open="d7">Advertisement</a>
  <div class="disc-modal" data-disc="d7" hidden>
    <div class="disc-overlay overlay-green overlay-desat" data-disc-close></div>
    <div class="disc-box box-r8">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Advertisement</h3>
      <p>This is an advertisement. Some links may be affiliate links.</p>
    </div>
  </div>
</div>`,

            /* 08 */ `<div class="disc disc-center disc-dark">
  <a href="#" class="disc-link" data-disc-open="d8">Advertorial</a>
  <div class="disc-modal" data-disc="d8" hidden>
    <div class="disc-overlay overlay-blue overlay-desat" data-disc-close></div>
    <div class="disc-box box-r24">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Advertorial</h3>
      <p>Editorial content with sponsor support. See policy for details.</p>
    </div>
  </div>
</div>`,

            /* 09 */ `<div class="disc disc-right disc-muted">
  <a href="#" class="disc-link" data-disc-open="d9">Advertisement</a>
  <div class="disc-modal" data-disc="d9" hidden>
    <div class="disc-overlay overlay-amber overlay-desat" data-disc-close></div>
    <div class="disc-box box-r14">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Sponsored Notice</h3>
      <p>We may receive compensation for referrals or purchases made through links.</p>
    </div>
  </div>
</div>`,

            /* 10 */ `<div class="disc disc-left disc-dark">
  <a href="#" class="disc-link" data-disc-open="d10">Advertisement</a>
  <div class="disc-modal" data-disc="d10" hidden>
    <div class="disc-overlay" data-disc-close></div>
    <div class="disc-box">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Advertisement</h3>
      <p>This is an advertisement. Some links may be affiliate links.</p>
    </div>
  </div>
</div>`,

            /* 11 */ `<div class="disc disc-center disc-muted">
  <a href="#" class="disc-link" data-disc-open="d11">Advertorial</a>
  <div class="disc-modal" data-disc="d11" hidden>
    <div class="disc-overlay" data-disc-close></div>
    <div class="disc-box">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Advertorial</h3>
      <p>Editorial content with sponsor support. See policy for details.</p>
    </div>
  </div>
</div>`,

            /* 12 */ `<div class="disc disc-right disc-dark">
  <a href="#" class="disc-link" data-disc-open="d12">Advertisement</a>
  <div class="disc-modal" data-disc="d12" hidden>
    <div class="disc-overlay" data-disc-close></div>
    <div class="disc-box">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Sponsored Notice</h3>
      <p>We may receive compensation for referrals or purchases made through links.</p>
    </div>
  </div>
</div>`,

            /* 13 */ `<div class="disc disc-left disc-muted"><span class="disc-text">Advertisement</span></div>`,
            /* 14 */ `<div class="disc disc-center disc-dark"><span class="disc-text">Advertorial</span></div>`,
            /* 15 */ `<div class="disc disc-right disc-muted"><span class="disc-text">Advertisement</span></div>`,

            /* 16 — NEW: desaturated indigo pill */
            `<div class="disc disc-center disc-dark disc-pill disc-tint-indigo disc-desat">
  <a href="#" class="disc-link" data-disc-open="d16">Disclosure</a>
  <div class="disc-modal" data-disc="d16" hidden>
    <div class="disc-overlay overlay-blur overlay-desat" data-disc-close></div>
    <div class="disc-box box-r16">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Disclosure</h3>
      <p>Content may include affiliate links. If you buy through them, we may earn a commission at no extra cost to you.</p>
    </div>
  </div>
</div>`,

            /* 17 — NEW: desaturated teal pill (left) */
            `<div class="disc disc-left disc-muted disc-pill disc-tint-teal disc-desat">
  <a href="#" class="disc-link" data-disc-open="d17">Advertorial</a>
  <div class="disc-modal" data-disc="d17" hidden>
    <div class="disc-overlay overlay-green overlay-desat" data-disc-close></div>
    <div class="disc-box box-r12">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Advertorial</h3>
      <p>Editorial content with sponsor support. Purchases via links may benefit this site.</p>
    </div>
  </div>
</div>`,

            /* 18 — NEW: desaturated rose pill (right) */
            `<div class="disc disc-right disc-dark disc-pill disc-tint-rose disc-desat">
  <a href="#" class="disc-link" data-disc-open="d18">Advertisement</a>
  <div class="disc-modal" data-disc="d18" hidden>
    <div class="disc-overlay overlay-light overlay-desat" data-disc-close></div>
    <div class="disc-box box-r20">
      <button class="disc-x" aria-label="Close" data-disc-close>×</button>
      <h3>Advertisement</h3>
      <p>This is an advertisement. Some links may be affiliate links.</p>
    </div>
  </div>
</div>`,
        ];

        adsDemo.innerHTML = "";
        ADS_VARIANTS.forEach((html, i) => {
            const wrap = document.createElement("div");
            wrap.className = "std-demo-item";
            wrap.innerHTML = `<div class="dev-badge">${String(i + 1).padStart(
                2,
                "0"
            )}</div>${html}`;
            const btn = document.createElement("button");
            btn.className = "copy-chip";
            btn.textContent = "Copy Disclosure";
            btn.addEventListener("click", async () => {
                const css = await fetchText(PATH.discCSS);
                const js = await fetchText(PATH.discJS);
                const block = wrap.querySelector(".disc").outerHTML.trim();
                const parts = [];
                if (css.trim())
                    parts.push("/* ===== CSS ===== */\n" + css.trim());
                parts.push("<!-- ===== HTML ===== -->\n" + block);
                if (js.trim()) parts.push("// ===== JS =====\n" + js.trim());
                copyToClipboard(parts.join("\n\n"), btn);
            });
            wrap.appendChild(btn);
            adsDemo.appendChild(wrap);
        });

        // Заповнюємо кодбокси
        setText(
            "adsHtmlOutput",
            ADS_VARIANTS.map(
                (h, i) => `<!-- ${String(i + 1).padStart(2, "0")} -->\n${h}`
            ).join("\n\n")
        );
        setText("adsCssOutput", await fetchText(PATH.discCSS));
        setText("adsJsOutput", (await fetchText(PATH.discJS)) || "/* No JS */");
    }

    // Breadcrumbs
    const crumbsDemo = document.getElementById("crumbsDemo");
    if (crumbsDemo) {
        ensureDevStyles(); // щоб стилі для .copy-chip були точно підключені

        const items = [
            `<nav class="crumbs sep-slash" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Nutrition</a></li>
    <li><a href="#">Keto</a></li>
    <li class="current" aria-current="page">Ultimate Guide</li>
  </ol>
</nav>`,

            `<nav class="crumbs sep-chevron pill" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">⌂ Home</a></li>
    <li><a href="#">Programs</a></li>
    <li class="current" aria-current="page">30-Day Challenge</li>
  </ol>
</nav>`,

            `<nav class="crumbs micro sep-slash" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">HOME</a></li>
    <li><a href="#">BEAUTY</a></li>
    <li class="current" aria-current="page">FACE CARE</li>
  </ol>
</nav>`,

            `<nav class="crumbs scroll sep-chevron" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Section</a></li>
    <li><a href="#">Subsection</a></li>
    <li class="current" aria-current="page">Very long current page</li>
  </ol>
</nav>`,

            `<nav class="c-crumbs c-crumbs--slash c-crumbs--soft-current" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Docs</a></li>
    <li><a href="#">Components</a></li>
    <li class="is-current" aria-current="page">Breadcrumbs</li>
  </ol>
</nav>`,

            `<nav class="c-crumbs c-crumbs--chevron c-crumbs--underline-current" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Site</a></li>
    <li><a href="#">Catalog</a></li>
    <li class="is-current" aria-current="page">Item</li>
  </ol>
</nav>`,
        ];

        crumbsDemo.innerHTML = "";
        items.forEach((html, i) => {
            const wrap = document.createElement("div");
            wrap.className = "std-demo-item";
            wrap.innerHTML = `<div class="dev-badge">${String(i + 1).padStart(
                2,
                "0"
            )}</div>${html}`;

            // Кнопка Copy для конкретного прикладу
            const btn = document.createElement("button");
            btn.className = "copy-chip";
            btn.textContent = "Copy Breadcrumb";
            btn.addEventListener("click", async () => {
                const css = await fetchText(PATH.crumbsCSS);
                const nav = wrap.querySelector("nav");
                const parts = [];
                if (css.trim())
                    parts.push("/* ===== CSS ===== */\n" + css.trim());
                parts.push(
                    "<!-- ===== HTML ===== -->\n" + nav.outerHTML.trim()
                );
                copyToClipboard(parts.join("\n\n"), btn);
            });
            wrap.appendChild(btn);

            crumbsDemo.appendChild(wrap);
        });

        // Заповнюємо код-бокси (загальна кнопка копіює всі варіанти разом)
        setText(
            "crumbsHtmlOutput",
            items
                .map(
                    (h, i) => `<!-- ${String(i + 1).padStart(2, "0")} -->\n${h}`
                )
                .join("\n\n")
        );
        setText("crumbsCssOutput", await fetchText(PATH.crumbsCSS));
        setText("crumbsJsOutput", "/* No JS for Breadcrumbs */");
    }

    // Buttons
    const btnsGrid = document.getElementById("btnsGrid");
    if (btnsGrid) {
        const html = `<button class="btn primary">Primary</button>
<button class="btn ghost">Ghost</button>
<button class="btn outline">Outline</button>
<button class="btn dashed">Dashed</button>
<button class="btn ripple primary">Ripple</button>`;
        btnsGrid.innerHTML = html;
        setText("btnsHtmlOutput", html);
        setText("btnsCssOutput", await fetchText(PATH.btnsCSS));
        setText(
            "btnsJsOutput",
            (await fetchText(PATH.rippleJS)) || "/* Optional JS (ripple) */"
        );
    }

    // Callouts
    const calloutsDemo = document.getElementById("calloutsDemo");
    if (calloutsDemo) {
        const html = `<div class="c-callout success">✅ Success callout example <button data-dismiss="callout">×</button></div>`;
        calloutsDemo.innerHTML = html;
        setText("calloutsHtmlOutput", html);
        setText("calloutsCssOutput", await fetchText(PATH.calloutCSS));
        setText(
            "calloutsJsOutput",
            (await fetchText(PATH.calloutJS)) || "/* No JS */"
        );
    }
}

/* ---------- API ---------- */
export function buildStandardGroups() {
    buildNavbars();
    buildFooters();
    buildMiscDemos();

    // увімкнути inner-tabs у кожній групі
    document.querySelectorAll(".std-group").forEach((groupEl) => {
        groupEl.querySelectorAll(".inner-tab").forEach((tabBtn) => {
            tabBtn.addEventListener("click", () =>
                selectInnerTab(groupEl, tabBtn)
            );
        });
    });

    // нагадування під усі Preview
    [
        "headPreview",
        "crumbsPreview",
        "footPreview",
        "adsPreview",
        "imgsPreview",
        "btnsPreview",
        "calloutsPreview",
    ].forEach(addPreviewReminder);

    equalizeCodeHeights?.();
}

export function wireStandardCopyChips() {
    const pairs = [
        ["copyHeadCssBtn", "headCssOutput"],
        ["copyHeadJsBtn", "headJsOutput"],
        ["copyHeadHtmlBtn", "headHtmlOutput"],
        ["copyCrumbsCssBtn", "crumbsCssOutput"],
        ["copyCrumbsJsBtn", "crumbsJsOutput"],
        ["copyCrumbsHtmlBtn", "crumbsHtmlOutput"],
        ["copyFootCssBtn", "footCssOutput"],
        ["copyFootJsBtn", "footJsOutput"],
        ["copyFootHtmlBtn", "footHtmlOutput"],
        ["copyAdsCssBtn", "adsCssOutput"],
        ["copyAdsJsBtn", "adsJsOutput"],
        ["copyAdsHtmlBtn", "adsHtmlOutput"],
        ["copyImgsCssBtn", "imgsCssOutput"],
        ["copyImgsJsBtn", "imgsJsOutput"],
        ["copyImgsHtmlBtn", "imgsHtmlOutput"],
        ["copyBtnsCssBtn", "btnsCssOutput"],
        ["copyBtnsJsBtn", "btnsJsOutput"],
        ["copyBtnsHtmlBtn", "btnsHtmlOutput"],
        ["copyCalloutsCssBtn", "calloutsCssOutput"],
        ["copyCalloutsJsBtn", "calloutsJsOutput"],
        ["copyCalloutsHtmlBtn", "calloutsHtmlOutput"],
    ];
    pairs.forEach(([btnId, outId]) => {
        const btn = document.getElementById(btnId),
            out = document.getElementById(outId);
        if (btn && out)
            btn.addEventListener("click", () =>
                copyToClipboard(out.textContent, btn)
            );
    });
}

export function wireStdSidebar() {
    [
        "sbHeader",
        "sbBreadcrumbs",
        "sbFooter",
        "sbAds",
        "sbImages",
        "sbButtons",
        "sbCallouts",
    ].forEach((id) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener("click", () => showStdGroup(id));
    });
}

export function showStdGroup(buttonId) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    document
        .querySelectorAll("#standardSidebar .list button")
        .forEach((b) => b.classList.toggle("active", b === btn));

    const map = {
        sbHeader: "std-header",
        sbBreadcrumbs: "std-crumbs",
        sbFooter: "std-footer",
        sbAds: "std-ads",
        sbImages: "std-images",
        sbButtons: "std-buttons",
        sbCallouts: "std-callouts",
    };
    const groupId = map[btn.id] || btn.id.replace("sb", "std").toLowerCase();

    document
        .querySelectorAll("#standardMain .std-group")
        .forEach((g) => (g.hidden = g.id !== groupId));
}

/* ---------- dev helpers (опційно) ---------- */
export function addHeroAndImageNumbers() {
    document.querySelectorAll(".c-hero img").forEach((img, i) => {
        img.setAttribute("alt", `Hero image ${i + 1}`);
    });
}
export function addComponentNumbers() {
    document.querySelectorAll(".std-demo").forEach((demo, i) => {
        demo.dataset.demoId = `demo-${i + 1}`;
    });
}
export function addNotesToAllPreviews() {
    document.querySelectorAll(".preview").forEach((preview) => {
        if (!preview.querySelector(".notice")) {
            const note = document.createElement("p");
            note.className = "notice";
            note.textContent = "Demo preview area.";
            preview.appendChild(note);
        }
    });
}
