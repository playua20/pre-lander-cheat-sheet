// assets/js/buttons.js
import { copyFrom } from "./utils.js";

/**
 * HTML демо кнопок (cta kit)
 */
const BTNS_HTML = `
<a class="btn">Default</a>
<a class="btn primary">Primary</a>
<a class="btn ghost">Ghost</a>
<a class="btn outline">Outline</a>
<a class="btn dashed">Dashed</a>
<a class="btn shadow">Shadow</a>
<a class="btn gradient">Gradient</a>
<a class="btn raised">Raised</a>
<a class="btn link">Link</a>
<a class="btn warning">Warning</a>
<a class="btn danger">Danger</a>
<a class="btn success">Success</a>
<a class="btn info">Info</a>
<a class="btn glass">Glass</a>
<a class="btn neon">Neon</a>
<a class="btn icon-left">Icon left</a>
<a class="btn icon-right">Icon right</a>
<a class="btn pill">Pill</a>
<a class="btn square">Square</a>
<a class="btn full">Full width</a>
`;

/**
 * Ініціалізує прев’ю та копі-кнопки для секції Buttons
 */
export function initButtons() {
    // Вставляємо демо в грід
    const grid = document.getElementById("btnsGrid");
    if (grid) {
        grid.innerHTML = BTNS_HTML.trim();
    }

    // HTML
    const htmlBox = document.getElementById("btnsHtmlOutput");
    if (htmlBox) {
        htmlBox.textContent = BTNS_HTML.trim();
    }

    // CSS (беремо напряму зі style.css — у модулі лише проброс)
    const cssSource = document.getElementById("btnKitStyle")?.textContent || "";
    const cssBox = document.getElementById("btnsCssOutput");
    if (cssBox) {
        cssBox.textContent = cssSource.trim();
    }

    // кнопки копіювання
    const copyHtmlBtn = document.getElementById("copyBtnsHtmlBtn");
    if (copyHtmlBtn) {
        copyHtmlBtn.addEventListener("click", () => copyFrom("btnsHtmlOutput"));
    }
    const copyCssBtn = document.getElementById("copyBtnsCssBtn");
    if (copyCssBtn) {
        copyCssBtn.addEventListener("click", () => copyFrom("btnsCssOutput"));
    }
}
