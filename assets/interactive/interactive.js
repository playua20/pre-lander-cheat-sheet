// assets/interactive/interactive.js
import { equalizeCodeHeights } from "../js/utils.js";
import { initSweepstake } from "./sweepstake/sweepstake.js";

/* small helpers */
function addPreviewReminder(previewId) {
    const cont = document.getElementById(previewId);
    if (!cont || cont.dataset._reminder) return;
    cont.dataset._reminder = "1";
    const p = document.createElement("p");
    p.className = "notice";
    p.innerHTML =
        'Не забудь підключити:<br><code>&lt;link rel="stylesheet" href="style.css"&gt;</code><br><code>&lt;script src="script.js"&gt;&lt;/script&gt;</code>';
    cont.appendChild(p);
}

export function buildInteractiveGroups() {
    // Побудова демки Sweepstake + наповнення код-боксів
    initSweepstake();

    // Підказки під превʼю
    ["swpPreview"].forEach(addPreviewReminder);

    // Увімкнути inner-tabs для кожної групи
    document
        .querySelectorAll("#interactiveMain .std-group")
        .forEach((groupEl) => {
            groupEl.querySelectorAll(".inner-tab").forEach((tabBtn) => {
                tabBtn.addEventListener("click", () => {
                    const key = tabBtn.dataset.inner;
                    groupEl
                        .querySelectorAll("[data-inner-panel]")
                        .forEach((p) => {
                            p.hidden = p.dataset.innerPanel !== key;
                        });
                    groupEl
                        .querySelectorAll(".inner-tab")
                        .forEach((b) =>
                            b.setAttribute(
                                "aria-selected",
                                String(b === tabBtn)
                            )
                        );
                    equalizeCodeHeights?.();
                });
            });
        });

    equalizeCodeHeights?.();
}

export function wireInteractiveCopyChips() {
    const pairs = [
        ["copySweepHtmlBtn", "sweepHtmlOutput"],
        ["copySweepCssBtn", "sweepCssOutput"],
        ["copySweepJsBtn", "sweepJsOutput"],
    ];
    pairs.forEach(([btnId, outId]) => {
        const btn = document.getElementById(btnId),
            out = document.getElementById(outId);
        if (btn && out) {
            btn.addEventListener("click", () =>
                navigator.clipboard
                    .writeText(out.textContent || "")
                    .then(() => {
                        btn.dataset.state = "copied";
                        setTimeout(() => (btn.dataset.state = ""), 1200);
                    })
            );
        }
    });
}

export function wireInteractiveSidebar() {
    ["sbSweepstake", "sbForm", "sbCongrats"].forEach((id) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener("click", () => showIntGroup(id));
    });
}

export function showIntGroup(buttonId) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    document
        .querySelectorAll("#interactiveSidebar .list button")
        .forEach((b) => b.classList.toggle("active", b === btn));

    const map = {
        sbSweepstake: "int-sweepstake",
        sbForm: "int-form",
        sbCongrats: "int-congrats",
    };
    const groupId = map[btn.id];

    document
        .querySelectorAll("#interactiveMain .std-group")
        .forEach((g) => (g.hidden = g.id !== groupId));
}
