document.addEventListener('DOMContentLoaded', () => {
  // ===== Пресети (Verdana попереду) =====
  const PRESETS = [
    { id:'verdana-pro-tight', name:'Verdana Pro Tight', family:'Verdana, Geneva, Tahoma, sans-serif', base:16,
      h:{1:{size:2.4,weight:800,lh:1.12},2:{size:2.0,weight:700,lh:1.18},3:{size:1.68,weight:700,lh:1.22},4:{size:1.4,weight:700,lh:1.26},5:{size:1.18,weight:700,lh:1.3},6:{size:1.0,weight:700,lh:1.34}},
      p:{size:1.0,weight:400,lh:1.65}, link:'underline', ul:'disc', ol:'disc' },
    { id:'verdana-spacious', name:'Verdana Spacious', family:'Verdana, Geneva, Tahoma, sans-serif', base:16,
      h:{1:{size:2.5,weight:800,lh:1.12},2:{size:2.05,weight:700,lh:1.18},3:{size:1.75,weight:700,lh:1.22},4:{size:1.45,weight:700,lh:1.26},5:{size:1.2,weight:700,lh:1.3},6:{size:1.0,weight:700,lh:1.34}},
      p:{size:1.02,weight:400,lh:1.75}, link:'hover', ul:'disc', ol:'disc' },
    { id:'verdana-clean', name:'Verdana Clean', family:'Verdana, Geneva, Tahoma, sans-serif', base:16,
      h:{1:{size:2.35,weight:800,lh:1.15},2:{size:1.95,weight:700,lh:1.2},3:{size:1.6,weight:700,lh:1.25},4:{size:1.35,weight:700,lh:1.3},5:{size:1.15,weight:700,lh:1.35},6:{size:1.0,weight:700,lh:1.4}},
      p:{size:1.0,weight:400,lh:1.7}, link:'underline', ul:'disc', ol:'disc' },
    { id:'tahoma-compact', name:'Tahoma Compact', family:'Tahoma, Verdana, Segoe, sans-serif', base:16,
      h:{1:{size:2.2,weight:800,lh:1.15},2:{size:1.85,weight:700,lh:1.2},3:{size:1.55,weight:700,lh:1.25},4:{size:1.3,weight:700,lh:1.3},5:{size:1.12,weight:700,lh:1.35},6:{size:1.0,weight:700,lh:1.4}},
      p:{size:0.98,weight:400,lh:1.65}, link:'underline', ul:'disc', ol:'disc' },
    { id:'trebuchet-modern', name:'Trebuchet Modern', family:'"Trebuchet MS","Segoe UI",Tahoma,sans-serif', base:16,
      h:{1:{size:2.45,weight:800,lh:1.12},2:{size:2.0,weight:700,lh:1.18},3:{size:1.65,weight:700,lh:1.22},4:{size:1.38,weight:700,lh:1.28},5:{size:1.18,weight:700,lh:1.32},6:{size:1.0,weight:700,lh:1.36}},
      p:{size:1.02,weight:400,lh:1.7}, link:'hover', ul:'disc', ol:'disc' },
    { id:'arial-neutral', name:'Arial Neutral', family:'Arial, Helvetica, sans-serif', base:16,
      h:{1:{size:2.3,weight:800,lh:1.15},2:{size:1.9,weight:700,lh:1.2},3:{size:1.6,weight:700,lh:1.25},4:{size:1.35,weight:700,lh:1.28},5:{size:1.15,weight:700,lh:1.32},6:{size:1.0,weight:700,lh:1.36}},
      p:{size:1.0,weight:400,lh:1.68}, link:'underline', ul:'disc', ol:'disc' },
    { id:'system-ui', name:'System UI', family:'system-ui,-apple-system,"Segoe UI",Roboto,Ubuntu,Cantarell,"Noto Sans","Helvetica Neue",Arial,sans-serif', base:16,
      h:{1:{size:2.4,weight:800,lh:1.12},2:{size:2.0,weight:700,lh:1.18},3:{size:1.7,weight:700,lh:1.22},4:{size:1.4,weight:700,lh:1.26},5:{size:1.2,weight:700,lh:1.3},6:{size:1.0,weight:700,lh:1.34}},
      p:{size:1.0,weight:400,lh:1.7}, link:'hover', ul:'disc', ol:'disc' },
    { id:'georgia-classic', name:'Georgia Classic (serif)', family:'Georgia,"Times New Roman",Times,serif', base:16,
      h:{1:{size:2.5,weight:800,lh:1.12},2:{size:2.05,weight:700,lh:1.18},3:{size:1.75,weight:700,lh:1.2},4:{size:1.45,weight:700,lh:1.26},5:{size:1.2,weight:700,lh:1.3},6:{size:1.0,weight:700,lh:1.34}},
      p:{size:1.02,weight:400,lh:1.8}, link:'underline', ul:'disc', ol:'disc' },
    { id:'times-editorial', name:'Times Editorial (serif)', family:'"Times New Roman",Times,Georgia,serif', base:16,
      h:{1:{size:2.6,weight:800,lh:1.1},2:{size:2.1,weight:700,lh:1.16},3:{size:1.8,weight:700,lh:1.2},4:{size:1.5,weight:700,lh:1.26},5:{size:1.22,weight:700,lh:1.3},6:{size:1.0,weight:700,lh:1.34}},
      p:{size:1.02,weight:400,lh:1.78}, link:'underline', ul:'disc', ol:'disc' },
    { id:'palatino-readable', name:'Palatino Readable (serif)', family:'"Palatino Linotype","Book Antiqua",Palatino,Georgia,serif', base:16,
      h:{1:{size:2.45,weight:800,lh:1.12},2:{size:2.0,weight:700,lh:1.18},3:{size:1.7,weight:700,lh:1.22},4:{size:1.42,weight:700,lh:1.26},5:{size:1.18,weight:700,lh:1.3},6:{size:1.0,weight:700,lh:1.34}},
      p:{size:1.02,weight:400,lh:1.8}, link:'hover', ul:'disc', ol:'disc' },
    { id:'mono-doc', name:'Monospace Document', family:'"Courier New",Courier,"Lucida Console",Monaco,monospace', base:16,
      h:{1:{size:2.1,weight:800,lh:1.12},2:{size:1.8,weight:700,lh:1.18},3:{size:1.55,weight:700,lh:1.22},4:{size:1.35,weight:700,lh:1.28},5:{size:1.15,weight:700,lh:1.32},6:{size:1.0,weight:700,lh:1.36}},
      p:{size:0.98,weight:400,lh:1.7}, link:'none', ul:'square', ol:'disc' },
  ];

  // ===== Опції для селектів =====
  const sizeOptions = [0.9,1.0,1.05,1.1,1.15,1.2,1.3,1.4,1.6,1.8,2.0,2.2,2.4,2.6];
  const weightOptions = [300,400,500,600,700,800,900];
  const lhOptions = [1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.5,1.6,1.7,1.8];

  // ===== Стан =====
  let current = structuredClone(PRESETS[0]);
  let overrides = { ul: 'icon', ol: 'disc' };
  let colorOverrides = {
    previewBg:'#fafbfe',
    h1:'#1c2430', h2:'#1c2430', h3:'#1c2430', h4:'#1c2430', h5:'#1c2430', h6:'#1c2430', p:'#1c2430',
    a:'#0a7c5e', aHover:'#085f48',
    bqText:'#1c2430', bqBg:'#f1f4f8', bqBorder:'#b8c2cc'
  };

  // ===== Елементи =====
  const tabs = document.querySelectorAll('.top-tab');
  const tabPanels = {
    typography: document.getElementById('tab-typography'),
    standard: document.getElementById('tab-standard'),
    interactive: document.getElementById('tab-interactive'),
  };

  tabs.forEach(btn => {
    if(btn.id === 'themeBtn') return;
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.setAttribute('aria-selected','false'));
      btn.setAttribute('aria-selected','true');
      const key = btn.dataset.tab;
      Object.entries(tabPanels).forEach(([k,el]) => {
        el.dataset.active = k===key ? 'true' : '';
        el.hidden = k!==key;
      });
      equalizeCodeHeights();
    });
  });

  // Тема (світла/темна)
  document.getElementById('themeBtn').addEventListener('click', () => {
    const body = document.body;
    if(body.classList.contains('theme-dark')){
      body.classList.remove('theme-dark'); body.classList.add('theme-light');
      document.getElementById('themeBtn').textContent = 'Тема: Light';
    } else {
      body.classList.remove('theme-light'); body.classList.add('theme-dark');
      document.getElementById('themeBtn').textContent = 'Тема: Dark';
    }
  });

  // ===== Сайдбар (між Шрифт/Кольори) =====
  const sbFontsTab = document.getElementById('sbFontsTab');
  const sbColorsTab = document.getElementById('sbColorsTab');
  const fontsPanel = document.getElementById('fontsPanel');
  const colorsPanel = document.getElementById('colorsPanel');
  sbFontsTab.addEventListener('click', () => {
    sbFontsTab.setAttribute('aria-selected','true');
    sbColorsTab.setAttribute('aria-selected','false');
    fontsPanel.hidden = false; colorsPanel.hidden = true;
  });
  sbColorsTab.addEventListener('click', () => {
    sbFontsTab.setAttribute('aria-selected','false');
    sbColorsTab.setAttribute('aria-selected','true');
    fontsPanel.hidden = true; colorsPanel.hidden = false;
  });

  // ===== Акордеон в Шрифт =====
  function toggleAccordion(openId){
    const pairs = [
      ['accFonts','accFontsBody'],
      ['accStyles','accStylesBody'],
    ];
    pairs.forEach(([hdrId, bodyId]) => {
      const hdr = document.getElementById(hdrId);
      const body = document.getElementById(bodyId);
      const open = (hdrId===openId);
      hdr.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.hidden = !open;
    });
  }
  document.getElementById('accFonts').addEventListener('click', ()=>toggleAccordion('accFonts'));
  document.getElementById('accStyles').addEventListener('click', ()=>toggleAccordion('accStyles'));

  // ===== Рендер списку шрифтів =====
  const fontList = document.getElementById('fontList');
  function renderFonts(){
    fontList.innerHTML = '';
    PRESETS.forEach(p => {
      const b = document.createElement('button');
      b.textContent = p.name;
      if(p.id === current.id) b.classList.add('active');
      b.addEventListener('click', () => {
        current = structuredClone(PRESETS.find(x=>x.id===p.id));
        overrides = { ul:'icon', ol:'disc' };
        applyStyles(); syncControls(); renderCSS(); renderHTML(); renderListLabels(); renderFonts(); equalizeCodeHeights();
      });
      fontList.appendChild(b);
    });
  }
  renderFonts();

  // ===== Допоміжні =====
  function fillSelect(el, arr, value){
    el.innerHTML = '';
    arr.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v; opt.textContent = String(v);
      if(String(v)===String(value)) opt.selected = true;
      el.appendChild(opt);
    });
  }

  function syncControls(){
    document.getElementById('baseSize').value = current.base;
    const map = [
      ['h1.size', current.h[1].size], ['h2.size', current.h[2].size], ['h3.size', current.h[3].size],
      ['h4.size', current.h[4].size], ['h5.size', current.h[5].size], ['h6.size', current.h[6].size],
      ['h1.weight', current.h[1].weight], ['h2.weight', current.h[2].weight], ['h3.weight', current.h[3].weight],
      ['h4.weight', current.h[4].weight], ['h5.weight', current.h[5].weight], ['h6.weight', current.h[6].weight],
      ['h1.lh', current.h[1].lh], ['h2.lh', current.h[2].lh], ['h3.lh', current.h[3].lh], ['h4.lh', current.h[4].lh], ['h5.lh', current.h[5].lh], ['h6.lh', current.h[6].lh],
      ['p.size', current.p.size], ['p.weight', current.p.weight], ['p.lh', current.p.lh],
    ];
    document.querySelectorAll('[data-key]').forEach(sel => {
      const found = map.find(([k]) => k === sel.dataset.key);
      if(!found) return;
      const val = overrides[sel.dataset.key] ?? found[1];
      if(sel.dataset.key.includes('.size')) fillSelect(sel, sizeOptions, val);
      else if(sel.dataset.key.includes('.weight')) fillSelect(sel, weightOptions, val);
      else if(sel.dataset.key.includes('.lh')) fillSelect(sel, lhOptions, val);
    });
    document.getElementById('linkStyle').value = overrides['link'] ?? current.link;
    document.getElementById('ulStyle').value = overrides['ul'] ?? current.ul;
    document.getElementById('olStyle').value = overrides['ol'] ?? current.ol;
  }

  function applyStyles(){
    const s = document.getElementById('typoStyle');
    const get = (k, fallback) => (k in overrides ? overrides[k] : fallback);
    const base = current.base;
    const fam = current.family;

    const h = {};
    for(let i=1;i<=6;i++){
      h[i] = {
        size: parseFloat(get(`h${i}.size`, current.h[i].size)),
        weight: parseInt(get(`h${i}.weight`, current.h[i].weight),10),
        lh: parseFloat(get(`h${i}.lh`, current.h[i].lh)),
      };
    }
    const p = {
      size: parseFloat(get('p.size', current.p.size)),
      weight: parseInt(get('p.weight', current.p.weight), 10),
      lh: parseFloat(get('p.lh', current.p.lh)),
    };
    const link = get('link', current.link);
    const ul = get('ul', current.ul);
    const ol = get('ol', current.ol);

    const scope = document.getElementById('previewScope');
    scope.classList.toggle('hover-mode', link === 'hover' || link === 'hover-underline');

    const ICON_URL =
        "https://api.iconify.design/ic:baseline-check-circle.svg?color=%23008000";

    let css = `/* Typography applied to .content */
.content{ font-family:${fam}; font-size:${base}px; }
.content h1{ font-size:${(base*h[1].size).toFixed(2)}px; line-height:${h[1].lh}; font-weight:${h[1].weight}; }
.content h2{ font-size:${(base*h[2].size).toFixed(2)}px; line-height:${h[2].lh}; font-weight:${h[2].weight}; }
.content h3{ font-size:${(base*h[3].size).toFixed(2)}px; line-height:${h[3].lh}; font-weight:${h[3].weight}; }
.content h4{ font-size:${(base*h[4].size).toFixed(2)}px; line-height:${h[4].lh}; font-weight:${h[4].weight}; }
.content h5{ font-size:${(base*h[5].size).toFixed(2)}px; line-height:${h[5].lh}; font-weight:${h[5].weight}; }
.content h6{ font-size:${(base*h[6].size).toFixed(2)}px; line-height:${h[6].lh}; font-weight:${h[6].weight}; }
.content p{ font-size:${(base*p.size).toFixed(2)}px; line-height:${p.lh}; font-weight:${p.weight}; }
`;

    if(link === 'hover'){
      css += `.content a{ text-decoration:none }
.content a:hover{ text-decoration:underline }`;
    } else if(link === 'hover-underline'){
      css += `.content a{ text-decoration:underline; text-underline-offset:2px }
.content a:hover{ text-decoration:underline; text-underline-offset:3px }`;
    } else if(link === 'none'){
      css += `.content a{ text-decoration:none }`;
    } else {
      css += `.content a{ text-decoration:underline }`;
    }

    if(ul === 'icon'){
      css += `
.content ul{ list-style:none; padding-left:0 }
.content ul li{ position:relative; padding-left:28px }
.content ul li::before{
  content:""; position:absolute; left:0; top:.33em; width:18px; height:18px;
  background:url('${ICON_URL}') no-repeat center / 18px 18px; /* Змініть картинку на свою */
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

  function renderListLabels(){
    const ulSel = overrides['ul'] ?? current.ul;
    const ulMap = { icon:'з іконкою', disc:'з точками', circle:'з точками', square:'з точками' };
    const ulText = ulMap[ulSel] || 'з точками';
    const ulLabel = document.getElementById('ulLabel');
    const olLabel = document.getElementById('olLabel');
    if(ulLabel) ulLabel.innerHTML = '<span class="badge">&lt;ul&gt; + &lt;li&gt;</span> ' + ulText;
    if(olLabel) olLabel.innerHTML = '<span class="badge">&lt;ol&gt; + &lt;li&gt;</span> з точками';
  }

  // Події контролів шрифтів
  document.getElementById('baseSize').addEventListener('input', (e)=>{
    const v = Math.max(12, Math.min(22, Number(e.target.value||16)));
    current.base = v; applyStyles(); renderCSS(); equalizeCodeHeights();
  });
  document.querySelectorAll('[data-key]').forEach(sel=>{
    sel.addEventListener('change', (e)=>{
      const key = sel.dataset.key; overrides[key] = Number(e.target.value);
      applyStyles(); renderCSS(); equalizeCodeHeights();
    });
  });
  document.getElementById('linkStyle').addEventListener('change', (e)=>{
    overrides['link'] = e.target.value; applyStyles(); renderCSS(); equalizeCodeHeights();
  });
  document.getElementById('ulStyle').addEventListener('change', (e)=>{
    overrides['ul'] = e.target.value; applyStyles(); renderCSS(); equalizeCodeHeights();
  });
  document.getElementById('olStyle').addEventListener('change', (e)=>{
    overrides['ol'] = e.target.value; applyStyles(); renderCSS(); equalizeCodeHeights();
  });
  document.getElementById('resetBtn').addEventListener('click', ()=>{
    overrides = { ul:'icon', ol:'disc' };
    applyStyles(); syncControls(); renderCSS(); renderListLabels(); equalizeCodeHeights();
  });

  // ===== Рандомна типографіка =====
  function randomizeAll(){
    const rand = (min,max,step=0.01)=>Math.round((min+Math.random()*(max-min))/step)*step;
    current.base = Math.round(rand(15,18,1));
    const h6 = rand(1.0,1.06,0.01);
    const h5 = rand(h6+0.1,1.25,0.01);
    const h4 = rand(h5+0.1,1.45,0.01);
    const h3 = rand(h4+0.15,1.75,0.01);
    const h2 = rand(h3+0.2,2.1,0.01);
    const h1 = rand(h2+0.25,2.6,0.01);
    overrides['h1.size']=h1; overrides['h2.size']=h2; overrides['h3.size']=h3; overrides['h4.size']=h4; overrides['h5.size']=h5; overrides['h6.size']=h6;
    [1,2,3,4,5,6].forEach(i=>{
      overrides[`h${i}.weight`] = [600,700,800][Math.floor(Math.random()*3)];
      overrides[`h${i}.lh`] = [1.12,1.15,1.18,1.22,1.26,1.3,1.34][Math.floor(Math.random()*7)];
    });
    overrides['p.size'] = rand(0.96,1.06,0.01);
    overrides['p.weight'] = [400,400,500][Math.floor(Math.random()*3)];
    overrides['p.lh'] = [1.6,1.65,1.7,1.75,1.8][Math.floor(Math.random()*5)];
    overrides['link'] = ['underline','hover','hover-underline','none'][Math.floor(Math.random()*4)];
    overrides['ul'] = ['disc','circle','square','icon'][Math.floor(Math.random()*4)];
    overrides['ol'] = ['disc','decimal','decimal-leading-zero','lower-alpha'][Math.floor(Math.random()*4)];
    applyStyles(); syncControls(); renderCSS(); renderListLabels(); equalizeCodeHeights();
  }
  document.getElementById('randomizeTopBtn').addEventListener('click', randomizeAll);

  // ===== Кольори (preview-only) =====
  const colorIds = ['previewBg','h1','h2','h3','h4','h5','h6','p','a','aHover','bqText','bqBg','bqBorder'];
  colorIds.forEach(key=>{
    const el = document.getElementById('color-'+key);
    if(!el) return;
    el.addEventListener('input', (e)=>{
      colorOverrides[key] = e.target.value;
      applyColors(); renderCSS();
    });
  });

  function applyColors(){
    const c = colorOverrides;
    const s = document.getElementById('colorStyle');
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

  // Рандомні кольори з безпечних палітр (контраст гарантований)
  function clamp(v,min,max){ return Math.max(min, Math.min(max,v)); }
  function hex(n){ n = clamp(Math.round(n),0,255); return n.toString(16).padStart(2,'0'); }
  function lighten(col, amt){ // amt -1..1
    const r = parseInt(col.slice(1,3),16), g = parseInt(col.slice(3,5),16), b = parseInt(col.slice(5,7),16);
    const k = amt; return '#' + hex(r + (255-r)*k) + hex(g + (255-g)*k) + hex(b + (255-b)*k);
  }
  function darken(col, amt){
    const r = parseInt(col.slice(1,3),16), g = parseInt(col.slice(3,5),16), b = parseInt(col.slice(5,7),16);
    const k = 1-amt; return '#' + hex(r*k) + hex(g*k) + hex(b*k);
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

  function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  function randomizeColors(){
    const useDark = Math.random() < 0.35; // частіше світлі
    const s = useDark ? randomFrom(DARK_SCHEMES) : randomFrom(LIGHT_SCHEMES);
    const baseText = s.text;
    const accent = s.link;
    colorOverrides.previewBg = s.bg;
    // Заголовки трохи контрастніші
    colorOverrides.h1 = darken(baseText, useDark ? -0.2 : 0.2);
    colorOverrides.h2 = darken(baseText, useDark ? -0.15 : 0.15);
    colorOverrides.h3 = baseText;
    colorOverrides.h4 = baseText;
    colorOverrides.h5 = lighten(baseText, useDark ? -0.05 : 0.05);
    colorOverrides.h6 = lighten(baseText, useDark ? -0.08 : 0.08);
    colorOverrides.p  = baseText;
    colorOverrides.a = accent;
    colorOverrides.aHover = useDark ? lighten(accent,0.1) : darken(accent,0.15);
    colorOverrides.bqText = baseText;
    colorOverrides.bqBg = useDark ? '#1b1f2a' : '#f1f4f8';
    colorOverrides.bqBorder = useDark ? '#3a4150' : '#b8c2cc';
    applyColors(); renderCSS();
  }
  document.getElementById('randomizeColorsBtn').addEventListener('click', randomizeColors);

  // ===== Внутрішні вкладки (типографіка + кнопки) =====
  document.body.addEventListener('click', (e)=>{
    const btn = e.target.closest('.inner-tab'); if(!btn) return;
    const section = btn.closest('section'); if(!section) return;
    section.querySelectorAll('.inner-tab').forEach(b=>b.setAttribute('aria-selected','false'));
    btn.setAttribute('aria-selected','true');
    const key = btn.dataset.inner;
    section.querySelectorAll('[data-inner-panel]').forEach(p=>{
      p.hidden = (p.dataset.innerPanel !== key);
    });
    equalizeCodeHeights();
  });

  // ===== Копіювання =====
  async function copyFrom(id){
    const el = document.getElementById(id);
    const txt = el.textContent;
    try{
      await navigator.clipboard.writeText(txt);
    }catch(e){
      const t=document.createElement('textarea'); t.value=txt; document.body.appendChild(t); t.select();
      try{ document.execCommand('copy'); } finally { document.body.removeChild(t); }
    }
  }
  document.getElementById('copyCssBtn').addEventListener('click', ()=>copyFrom('cssOutput'));
  document.getElementById('copyHtmlBtn').addEventListener('click', ()=>copyFrom('htmlOutput'));

  // ===== Експорт CSS/HTML =====
  function renderCSS(){
    const baseStyles = `/* Базові стилі: */
* { box-sizing: border-box; }
html, body { height: 100%; }
html { scroll-behavior: smooth; }
body { margin: 0; }
main { flex-grow: 1; }
figure { margin: 0; }
img { max-width: 100%; height: auto; display: block; }`;
    const dynamic = document.getElementById('typoStyle').textContent;
    const colors = (()=>{
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

    const highlights = `
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
.highlight-20{ background:#fff3e0; border-radius:4px; box-shadow: inset 0 0 0 1px #ffb74d }`;

    const css = baseStyles + "\n\n/* Типографіка */\n" + dynamic + "\n" + colors + "\n\n" + highlights;
    document.getElementById('cssOutput').textContent = css;
  }

  function renderHTML(){
    const scope = document.getElementById('previewScope').cloneNode(true);
    scope.querySelectorAll('.badge').forEach(n=>n.remove());
    const html = `<div class="content">
  ${scope.innerHTML.trim()}
</div>`;
    document.getElementById('htmlOutput').textContent = html;
  }

  function equalizeCodeHeights(){
    const preview = document.getElementById('typoPreview');
    const target = Math.max(620, preview ? preview.offsetHeight : 0);
    ['cssOutput','htmlOutput','btnsCssOutput','btnsHtmlOutput'].forEach(id=>{
      const box = document.getElementById(id); if(box) box.style.minHeight = target + 'px';
    });
  }

  // ===== Кнопки (10+10) =====
  const BUTTONS = [
    { cls:'btn primary', label:'Primary' },
    { cls:'btn outline', label:'Outline' },
    { cls:'btn ghost', label:'Ghost' },
    { cls:'btn gradient', label:'Gradient' },
    { cls:'btn shadow', label:'Shadow' },
    { cls:'btn raised', label:'3D Raised' },
    { cls:'btn pill primary', label:'Pill Primary' },
    { cls:'btn link', label:'Link' },
    { cls:'btn success', label:'Success' },
    { cls:'btn warning', label:'Warning' },
    // квадратні
    { cls:'btn square primary', label:'Square Primary' },
    { cls:'btn square outline', label:'Square Outline' },
    { cls:'btn square dashed', label:'Square Dashed' },
    { cls:'btn square info', label:'Square Info' },
    { cls:'btn square danger', label:'Square Danger' },
    { cls:'btn square ghost', label:'Square Ghost' },
    { cls:'btn square neon', label:'Square Neon' },
    { cls:'btn square glass', label:'Square Glass' },
    { cls:'btn square icon-left', label:'Icon Left' },
    { cls:'btn square icon-right', label:'Icon Right' },
  ];

  function renderButtons(){
    const grid = document.getElementById('btnsGrid');
    grid.innerHTML='';
    BUTTONS.forEach(b=>{
      const a = document.createElement('a');
      a.href = '#'; a.className = b.cls; a.textContent = b.label;
      a.addEventListener('click', e=>e.preventDefault());
      grid.appendChild(a);
    });
  }

  function renderButtonsCSS(){
    const css = `/* Бібліотека кнопок (можна вирізати потрібне) */
.btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:10px 14px; font-weight:600; border-radius:12px; border:1px solid rgba(0,0,0,.1); background:#fff; color:#1c2430; cursor:pointer; user-select:none; text-decoration:none; }
.btn.square{ border-radius:6px; }
.btn.pill{ border-radius:999px; }
.btn.full{ width:100%; }
.btn.ghost{ background:transparent; }
.btn.primary{ background:#5bd1a8; border-color:#5bd1a8; color:#0a0e0c; }
.btn.outline{ background:transparent; border:2px solid #1c2430; color:#1c2430; }
.btn.dashed{ border-style:dashed; }
.btn.shadow{ box-shadow: 0 8px 16px rgba(0,0,0,.15); }
.btn.gradient{ background:linear-gradient(90deg,#5bd1a8,#09c2a1); border-color:transparent; color:#0a0e0c; }
.btn.raised{ box-shadow: 0 4px 0 #0f7f66; background:#14b8a6; border-color:#0f7f66; color:#0a0e0c; }
.btn.link{ background:transparent; border-color:transparent; color:#0a7c5e; text-decoration:underline; }
.btn.warning{ background:#ffb020; border-color:#ffb020; color:#1c2430; }
.btn.danger{ background:#ef4444; border-color:#ef4444; color:#fff; }
.btn.success{ background:#22c55e; border-color:#22c55e; color:#0a0e0c; }
.btn.info{ background:#3b82f6; border-color:#3b82f6; color:#fff; }
.btn.glass{ background:rgba(255,255,255,.35); backdrop-filter: blur(6px); border-color:rgba(255,255,255,.5); }
.btn.neon{ background:#111; color:#5bd1a8; text-shadow:0 0 8px #5bd1a8; border-color:#333; }
.btn.icon-left::before{ content:"↗"; }
.btn.icon-right::after{ content:"→"; }`;
    document.getElementById('btnsCssOutput').textContent = css;
    document.getElementById('btnKitStyle').textContent = css; // щоб демо було стилізоване
  }

  function renderButtonsHTML(){
    const html = BUTTONS.map(b=>`<a href="#" class="${b.cls}">${b.label}</a>`).join('\n');
    document.getElementById('btnsHtmlOutput').textContent = html;
  }

  // Копіювання для кнопок
  document.getElementById('copyBtnsCssBtn').addEventListener('click', ()=>copyFrom('btnsCssOutput'));
  document.getElementById('copyBtnsHtmlBtn').addEventListener('click', ()=>copyFrom('btnsHtmlOutput'));

  // ===== Ініціалізація =====
  function init(){
    // Заповнення контролів
    document.querySelectorAll('[data-key]').forEach(sel=>{
      if(sel.dataset.key.includes('.size')) fillSelect(sel, sizeOptions, 1.0);
      else if(sel.dataset.key.includes('.weight')) fillSelect(sel, weightOptions, 400);
      else if(sel.dataset.key.includes('.lh')) fillSelect(sel, lhOptions, 1.3);
    });
    syncControls(); applyStyles(); applyColors(); renderCSS(); renderHTML(); renderListLabels();
    renderButtons(); renderButtonsCSS(); renderButtonsHTML();
    equalizeCodeHeights();
  }
  init();
});