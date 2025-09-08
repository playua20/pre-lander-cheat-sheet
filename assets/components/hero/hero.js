// assets\components\hero\hero.js
// Адаптивна підгонка caption / кламп / compact
(() => {
    const MID_MIN = 350,
        MID_MAX = 490;
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const isMid = () => innerWidth >= MID_MIN && innerWidth <= MID_MAX;

    function tune(el) {
        const mid = isMid();
        const cap = $(".c-hero__caption", el);
        const img = $("img", el);

        el.classList.toggle("c-hero--compact", mid);

        if (cap) {
            const h2 = $("h2", cap);
            if (h2) {
                const long = (h2.textContent || "").trim().length > 62;
                h2.classList.toggle("c-hero--clamp2", mid && long);
            }
        }
        if (cap && img) {
            const needShift = mid && cap.scrollHeight > img.clientHeight * 0.48;
            el.classList.toggle("c-hero--shiftout", !!needShift);
        }
    }

    function tuneAll() {
        $$(".c-hero").forEach(tune);
    }
    addEventListener("resize", tuneAll, { passive: true });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(tuneAll);
    }
    addEventListener("load", tuneAll);
    setTimeout(tuneAll, 0);
})();
