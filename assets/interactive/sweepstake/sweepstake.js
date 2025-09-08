/* ========= Sweepstake markup ========= */
const SWEEP_HTML = `
<div class="i-sweep" id="sweep">
  <div class="i-sweep__wheel">
    <div class="i-sweep__rotor" data-rotor>
      <div class="i-sweep__disc" aria-hidden="true"></div>
    </div>
    <button class="i-sweep__hub" data-spin type="button" aria-label="Spin"></button>
    <div class="i-sweep__pointer" aria-hidden="true"></div>
  </div>
</div>

<!-- Modal -->
<div class="modal" id="congratsModal" hidden>
  <div class="modal__overlay"></div>
  <div class="modal__content">
    <div class="modal__icon">✔</div>
    <h2>Congratulations!</h2>
    <p>You won <strong>50% discount</strong>!</p>
    <button class="btn" id="congratsOk">OK</button>
  </div>
</div>

<!-- Form + countdown (with texts, image, old/new price) -->
<div class="form-wrap" id="formWrap" hidden>
  <h2 class="form-headline">Official request form</h2>

  <img src="./assets/interactive/sweepstake/pr.png" alt="Product" class="form-img" />
  <p class="form-stock">
    <span id="stockNum">#982 of 1000</span> as of <span id="stockDate"></span>
  </p>
  <p class="form-sub">For a promo purchase of Alphavit at a discounted price</p>

  <p class="form-price">
    <span class="old">₱3,980</span>
    <span class="new">₱1,990</span>
  </p>

  <div class="form-banner">
    To get Alphavit with a discount, enter your name and phone number below and click "LEAVE A REQUEST"
  </div>

  <form id="leadForm">
    <label for="name" class="sr-only">Name</label>
    <input id="name" type="text" name="name" placeholder="Name" required />
    <label for="phone" class="sr-only">Phone number</label>
    <input id="phone" type="tel" name="phone" placeholder="Phone number" required />
    <button type="submit" class="btn">LEAVE A REQUEST</button>
  </form>

  <p class="countdown">Offer ends in: <span id="timer">10:00</span></p>
  <p class="form-footnote">
    After submitting, our operator will call you to confirm the order and delivery details.
  </p>
</div>
`.trim();

/* ========= Sweepstake CSS (inlined, no external sweepstake.css) ========= */
const SWEEP_CSS = `
/* ===== Sweepstake (image wheel) ===== */
.i-sweep {
  --size: 340px;
  --duration: 4.2s;
  --ease: cubic-bezier(.12,.52,.1,1);
  display: grid;
  justify-items: center;
  gap: 14px;
}

.i-sweep__wheel {
  position: relative;
  width: var(--size);
  aspect-ratio: 1 / 1;
}

.i-sweep__rotor {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transform: rotate(0deg);
  transition: transform var(--duration) var(--ease);
}

.i-sweep__disc {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: url("./assets/interactive/sweepstake/prizewheel.png") center/contain no-repeat;
  filter: drop-shadow(0 10px 26px rgba(0,0,0,.22));
}

/* Центр-хаб */
.i-sweep__hub {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 28%;
  aspect-ratio: 1/1;
  border: 0;
  border-radius: 50%;
  background: url("./assets/interactive/sweepstake/wheel-cursor.png") center/contain no-repeat;
  cursor: pointer;
  z-index: 3;
  display: grid;
  place-items: center;
}

.i-sweep__hub::after {
  content: "SPIN";
  font-weight: 900;
  font-size: clamp(12px, 2.6vw, 18px);
  letter-spacing: .08em;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,.45);
  pointer-events: none;
}

.i-sweep__hub[disabled] { opacity: .6; cursor: not-allowed; }

.i-sweep__pointer {
  position: absolute;
  left: 50%;
  top: -8px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 18px solid #fff;
  filter: drop-shadow(0 2px 0 rgba(0,0,0,.25));
  z-index: 2;
}

/* ===== Modal ===== */
.modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: transparent;
  opacity: 0;
  pointer-events: none;
  transition: opacity .4s ease;
  z-index: 100;
}
.modal.is-open { opacity: 1; pointer-events: auto; }

.modal__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.55);
}

.modal__content {
  position: relative;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transform: translateY(-60px);
  animation: slideDown .6s ease forwards;
  box-shadow: 0 20px 60px rgba(0,0,0,.25);
}

@keyframes slideDown { to { transform: translateY(0); } }

.modal__icon {
  font-size: 2rem;
  color: #16a34a;
  margin-bottom: 1rem;
}

/* ===== Form + countdown (square look) ===== */
.form-wrap { margin-top: 2rem; text-align: center; }

.form-headline { font-size: 28px; font-weight: 800; margin: 0 0 10px; }

.form-img {
  width: 220px; max-width: 60vw;
  display: block; margin: 10px auto 6px;
}

.form-stock { color: #0d62ff; font-size: 14px; margin: 6px 0 2px; }
.form-sub   { color: #374151; margin: 4px 0 12px; }

.form-price { margin: 6px 0 16px; font-size: 20px; }
.form-price .old { color: #6b7280; text-decoration: line-through; margin-right: 12px; }
.form-price .new { color: #ef0000; font-weight: 900; font-size: 24px; }

.form-banner {
  border: 2px solid #0d62ff;
  padding: 14px; font-weight: 700;
  margin: 18px auto 16px; max-width: 980px;
  border-radius: 0; /* square */
}

.form-wrap form { max-width: 620px; margin: 0 auto; }
.form-wrap input {
  display: block; width: 100%;
  margin: 12px auto; padding: 14px 12px;
  border: 2px solid #0d62ff; border-radius: 0; /* square */
  font-size: 16px;
}

.form-wrap .btn,
.form-wrap button[type="submit"]{
  display: block; width: 100%;
  padding: 16px 12px; border: 0; border-radius: 0; /* square */
  background: #0d4f66; color: #fff; font-weight: 800; letter-spacing: .02em; cursor: pointer;
}

.form-footnote { margin: 14px auto 0; max-width: 980px; color: #374151; }
.countdown     { margin-top: 12px; font-weight: 800; color: #dc2626; }

/* screen-reader-only util */
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}

/* Responsive */
@media (max-width: 480px){
  .i-sweep { --size: 300px; }
  .form-wrap form { padding: 0 16px; }
}
`.trim();

/* ========= Sweepstake logic with modal + form ========= */
const SWEEP_JS = `
(function () {
  function initSweepstake(root) {
    var rotor    = root.querySelector('[data-rotor]');
    var btn      = root.querySelector('[data-spin]');
    var modal    = document.getElementById('congratsModal');
    var okBtn    = document.getElementById('congratsOk');
    var formWrap = document.getElementById('formWrap');
    var sweep    = document.getElementById('sweep');
    var timerEl  = document.getElementById('timer');
    var leadForm = document.getElementById('leadForm');

    if (!rotor || !btn) return;

    // дата біля стоку
    var dateEl = document.getElementById('stockDate');
    if (dateEl) {
      var d = new Date();
      dateEl.textContent = d.toLocaleDateString(undefined, { day:'numeric', month:'numeric', year:'numeric' });
    }

    var spun = false;

    btn.addEventListener('click', function () {
      if (spun) return;
      spun = true;
      btn.disabled = true;

      var turns = 3;
      var targetDeg = 360 * turns + Math.random() * 360;

      rotor.getBoundingClientRect(); // рефлоу для transition
      rotor.style.transform = 'rotate(' + targetDeg + 'deg)';

      var showModal = function () {
        if (!modal) return;
        modal.classList.add('is-open');
        modal.removeAttribute('hidden');
      };

      rotor.addEventListener('transitionend', function () {
        setTimeout(showModal, 300);
      }, { once: true });

      // fallback
      setTimeout(showModal, 4500);
    });

    if (okBtn) okBtn.addEventListener('click', function () {
      if (modal) { modal.classList.remove('is-open'); modal.setAttribute('hidden', 'true'); }
      if (sweep && sweep.parentNode) sweep.parentNode.removeChild(sweep);
      if (formWrap) {
        formWrap.removeAttribute('hidden');
        // автофокус у Name
        setTimeout(function(){ var name = document.getElementById('name'); if (name) name.focus(); }, 0);
      }
      if (timerEl) startCountdown(10 * 60);
    });

    // Submit success message
    if (leadForm) {
      leadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var box = document.createElement('div');
        box.style.border = '2px solid #16a34a';
        box.style.padding = '16px';
        box.style.margin = '18px auto';
        box.style.maxWidth = '620px';
        box.style.background = '#f0fdf4';
        box.style.fontWeight = '700';
        box.textContent = 'Success! Your request has been submitted. We will contact you shortly.';
        leadForm.replaceWith(box);
      });
    }

    function startCountdown(seconds) {
      var remaining = seconds;
      function tick() {
        var m = String(Math.floor(remaining / 60)).padStart(2, '0');
        var s = String(remaining % 60).padStart(2, '0');
        if (timerEl) timerEl.textContent = m + ':' + s;
        if (remaining > 0) { remaining--; setTimeout(tick, 1000); }
      }
      tick();
    }
  }

  document.querySelectorAll('.i-sweep').forEach(initSweepstake);
})();
`.trim();

/* ========= Builder для cheatsheet ========= */
export function initSweepstake() {
    const host = document.getElementById("sweepDemo");
    if (!host) return;

    // 1) HTML демо
    host.innerHTML = SWEEP_HTML;

    // 2) Вивід HTML/JS/CSS у вкладки для копіювання
    const htmlOut = document.getElementById("sweepHtmlOutput");
    const jsOut = document.getElementById("sweepJsOutput");
    const cssOut = document.getElementById("sweepCssOutput");
    if (htmlOut) htmlOut.textContent = SWEEP_HTML;
    if (jsOut) jsOut.textContent = SWEEP_JS;
    if (cssOut) cssOut.textContent = SWEEP_CSS;

    // 3) Інжект CSS (без <link> на sweepstake.css)
    const old = document.getElementById("sweepStyles");
    if (old) old.remove();
    const styleTag = document.createElement("style");
    styleTag.id = "sweepStyles";
    styleTag.textContent = SWEEP_CSS;
    document.head.appendChild(styleTag);

    // 4) Інжектуємо IIFE-скрипт (модульний, але ізольований)
    const s = document.createElement("script");
    s.type = "module";
    s.textContent = SWEEP_JS;
    host.appendChild(s);
}
