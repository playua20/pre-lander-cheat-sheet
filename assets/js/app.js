// assets/js/app.js
// Точка входу (ESM)

import { initTypography, wireTypographyCopyChips } from "./typography.js";
import {
    buildStandardGroups,
    wireStandardCopyChips,
    showStdGroup,
    addHeroAndImageNumbers,
    addComponentNumbers,
    addNotesToAllPreviews,
    wireStdSidebar,
} from "./std.js";
import { initButtons } from "./buttons.js";
import { setupTopTabs, equalizeCodeHeights } from "./utils.js";
import { state } from "./state.js";
import { initImages } from "../components/images/images.js";

import { initCallouts } from "../components/callout/callout.js";

import {
    buildInteractiveGroups,
    wireInteractiveCopyChips,
    wireInteractiveSidebar,
    showIntGroup,
} from "../../assets/interactive/interactive.js";

/* -------- helpers -------- */
const ric =
    window.requestIdleCallback ||
    ((cb) =>
        window.setTimeout(
            () => cb({ didTimeout: false, timeRemaining: () => 16 }),
            0
        ));

function safe(label, fn) {
    try {
        fn();
    } catch (err) {
        console.error(`[app] ${label} failed:`, err);
    }
}

/* -------- global click router (delegated) -------- */
function installGlobalClickRouter() {
    document.addEventListener(
        "click",
        (e) => {
            // ===== Standard sidebar =====
            const sbBtn = e.target.closest?.("#standardSidebar .list button");
            if (sbBtn) {
                try {
                    showStdGroup(sbBtn.id);
                } catch {}
                // Ледача ініціалізація Callouts при вході в групу
                if (sbBtn.id === "sbCallouts") {
                    try {
                        const demo = document.getElementById("calloutsDemo");
                        if (!demo?.dataset.inited) initCallouts();
                    } catch (err) {
                        console.error("[callouts] init failed:", err);
                    }
                }
                e.preventDefault();
                return;
            }

            // ===== Inner tabs inside a std-group =====
            const innerBtn = e.target.closest?.('.inner-tab[role="tab"]');
            if (innerBtn) {
                const host =
                    innerBtn.closest(".std-group") ||
                    innerBtn.closest("main, .panel") ||
                    document;
                const key = innerBtn.dataset.inner;
                host.querySelectorAll(".inner-tab").forEach((b) =>
                    b.setAttribute("aria-selected", String(b === innerBtn))
                );
                host.querySelectorAll("[data-inner-panel]").forEach((p) => {
                    p.hidden = p.dataset.innerPanel !== key;
                });
                equalizeCodeHeights?.();
                e.preventDefault();
            }
        },
        { passive: false }
    );
}

/* -------- bootstrap -------- */
function init() {
    installGlobalClickRouter();

    safe("setupTopTabs", setupTopTabs);

    safe("initTypography", () => initTypography(state));
    safe("wireTypographyCopyChips", wireTypographyCopyChips);

    safe("initButtons", initButtons);

    safe("buildStandardGroups", buildStandardGroups);

    safe("initImages", initImages);

    safe("wireStandardCopyChips", wireStandardCopyChips);
    safe("wireStdSidebar", wireStdSidebar);

    ric(() => {
        safe("addHeroAndImageNumbers", addHeroAndImageNumbers);
        safe("addComponentNumbers", addComponentNumbers);
        safe("addNotesToAllPreviews", addNotesToAllPreviews);
    });

    safe("showStdGroup('sbHeader')", () => showStdGroup("sbHeader"));

    safe("buildInteractiveGroups", buildInteractiveGroups);
    safe("wireInteractiveCopyChips", wireInteractiveCopyChips);
    safe("wireInteractiveSidebar", wireInteractiveSidebar);
}

/* -------- start on ready -------- */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
    init();
}
