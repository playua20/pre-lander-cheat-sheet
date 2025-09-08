// Невеликі утиліти, щоб не ламався імпорт у typography.js

// Вирізає з CSS «ймовірно зайве». Мінімальна реалізація — повертаємо як є.
export function filterCssByHtml(css /*, html */) {
    return String(css || "");
}

// Додає у CSS використані CSS-перемінні з обчислених стилів елемента.
// Спрощено: нічого не додаємо, лише повертаємо css як є.
export function prependUsedVars(css /*, el */) {
    return String(css || "");
}

// Обмеження CSS до .content/.preview і т.д. — поки просто ідентичність.
export function restrictCssToRoots(css) {
    return String(css || "");
}

// Формує єдиний текстовий сніпет для копіювання (HTML + CSS + JS)
export function bundleSnippet(html = "", css = "", js = "") {
    const parts = [];
    if (css.trim()) {
        parts.push("/* ===== CSS ===== */\n" + css.trim());
    }
    if (html.trim()) {
        parts.push("<!-- ===== HTML ===== -->\n" + html.trim());
    }
    if (js.trim()) {
        parts.push("// ===== JS =====\n" + js.trim());
    }
    return parts.join("\n\n");
}
