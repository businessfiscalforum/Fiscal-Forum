/* ============ TICKER ============ */
const tickerData = [
  ["NIFTY 50","24,812.40","+0.62%",true],
  ["SENSEX","81,540.10","+0.58%",true],
  ["NIFTY MIDCAP 100","58,210.75","+0.91%",true],
  ["NIFTY SMALLCAP 100","18,940.30","-0.34%",false],
  ["NIFTY BANK","52,118.60","+0.21%",true],
  ["GOLD (MCX)","₹71,240/10g","+0.15%",true],
  ["INDIA VIX","13.42","-2.10%",false],
  ["NIFTY IT","41,205.80","+1.12%",true],
  ["FII FLOW","+₹1,842 Cr","NET BUY",true],
];
function buildTicker(){
  const el = document.getElementById('tickerStrip');
  const make = () => tickerData.map(d=>{
    const cls = d[3] ? 'up' : 'down';
    const arrow = d[3] ? '▲' : '▼';
    return `<span><b>${d[0]}</b>${d[1]} <span class="${cls}">${arrow} ${d[2]}</span></span>`;
  }).join('');
  el.innerHTML = make() + make();
}
buildTicker();

/* ============ QUESTIONS ============ */
const questions = [
  {
    key:'goal',
    title:'What is your investment goal?',
    sub:'Purpose: tailors allocation to the objective.',
    options:[
      {label:'Wealth Creation', sub:'Long-term compounding'},
      {label:'Retirement', sub:'20+ year horizon'},
      {label:'Child Education', sub:'10–18 year horizon'},
      {label:'Buying a House', sub:'5–10 year horizon'},
      {label:'Buying a Car', sub:'2–5 year horizon'},
      {label:'Emergency Fund', sub:'Capital protection first'},
      {label:'Passive Income', sub:'Dividend / stable yield'},
    ]
  },
  {
    key:'risk',
    title:'What is your risk profile?',
    sub:'How much volatility can you sit through without flinching.',
    options:[
      {label:'Conservative', sub:'Prioritise capital safety'},
      {label:'Moderate', sub:'Balanced risk / reward'},
      {label:'Aggressive', sub:'Maximise long-term growth'},
    ]
  },
  {
    key:'capacity',
    title:'What is your monthly investment capacity?',
    sub:'Determines suggested diversification breadth.',
    options:[
      {label:'₹1,000–5,000'},
      {label:'₹5,000–10,000'},
      {label:'₹10,000–25,000'},
      {label:'₹25,000–50,000'},
      {label:'₹50,000+'},
    ]
  },
  {
    key:'style',
    title:'What is your investment style?',
    sub:'How you plan to deploy capital into the market.',
    options:[
      {label:'SIP Only', sub:'Disciplined monthly investing'},
      {label:'Lump Sum Only', sub:'One-time deployment'},
      {label:'SIP + Lump Sum', sub:'Hybrid deployment'},
    ]
  },
  {
    key:'returns',
    title:'What return are you targeting?',
    sub:'Sets the growth tilt of your allocation.',
    options:[
      {label:'Stable (8–10%)', sub:'Defensive tilt'},
      {label:'Balanced (10–12%)', sub:'Core equity tilt'},
      {label:'High Growth (12–15%)', sub:'Growth tilt'},
      {label:'Maximum Growth (15%+)', sub:'Aggressive tilt'},
    ]
  },
];

const answers = {};
let curQ = 0;

const qIndexEl = document.getElementById('qIndex');
const qTitleEl = document.getElementById('qTitle');
const qSubEl = document.getElementById('qSub');
const qOptionsEl = document.getElementById('qOptions');
const stepNumEl = document.getElementById('stepNum');
const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');
const dotsEl = document.getElementById('dots');

function renderDots(){
  dotsEl.innerHTML = questions.map((q,i)=>{
    let cls = '';
    if(i===curQ) cls='active';
    else if(answers[q.key]!==undefined) cls='done';
    return `<span class="${cls}"></span>`;
  }).join('');
}

function renderQuestion(){
  const q = questions[curQ];
  qIndexEl.textContent = String(curQ+1).padStart(2,'0');
  qTitleEl.textContent = q.title;
  qSubEl.textContent = q.sub;
  stepNumEl.textContent = curQ+1;
  qOptionsEl.innerHTML = q.options.map((o,i)=>{
    const selected = answers[q.key]===o.label ? 'selected':'';
    return `<button class="opt ${selected}" data-i="${i}">${o.label}${o.sub?`<span class="sub">${o.sub}</span>`:''}</button>`;
  }).join('');
  qOptionsEl.querySelectorAll('.opt').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = parseInt(btn.dataset.i);
      answers[q.key] = q.options[idx].label;
      renderQuestion();
    });
  });
  btnBack.disabled = curQ===0;
  btnNext.disabled = answers[q.key]===undefined;
  btnNext.textContent = curQ === questions.length-1 ? 'Generate Allocation →' : 'Next →';
  renderDots();
}

btnBack.addEventListener('click', ()=>{
  if(curQ>0){curQ--; renderQuestion();}
});
btnNext.addEventListener('click', ()=>{
  if(curQ < questions.length-1){
    curQ++;
    renderQuestion();
  } else {
    generateResults();
  }
});

renderQuestion();

/* ============ ALLOCATION ENGINE ============ */
const SEGMENTS = [
  {key:'large', name:'Large Cap', color:'#2d6a4f', desc:'Top-100 bluechip stability anchor.'},
  {key:'mid', name:'Mid Cap', color:'#52b788', desc:'Growth with moderate volatility.'},
  {key:'small', name:'Small Cap', color:'#ef4444', desc:'High growth, high drawdown risk.'},
  {key:'flexi', name:'Flexi Cap', color:'#29628c', desc:'Manager-driven cap-agnostic mix.'},
  {key:'sectoral', name:'Sectoral / Thematic', color:'#9c6644', desc:'Concentrated tactical exposure.'},
  {key:'index', name:'Index ETF', color:'#e9c46a', desc:'Low-cost broad market beta.'},
  {key:'gold', name:'Gold ETF', color:'#d4af37', desc:'Non-equity hedge & ballast.'},
];

const RISK_BASE = {
  'Conservative': {large:35, mid:8,  small:3,  flexi:14, sectoral:3,  index:22, gold:15},
  'Moderate':     {large:26, mid:18, small:9,  flexi:19, sectoral:8,  index:14, gold:6},
  'Aggressive':   {large:16, mid:25, small:21, flexi:19, sectoral:14, index:5,  gold:0},
};

// growth tilt: shifts weight from defensive (large/index/gold) to growth (mid/small/sectoral)
const RETURN_TILT = {
  'Stable (8–10%)':        -2.0,
  'Balanced (10–12%)':     -0.5,
  'High Growth (12–15%)':   1.2,
  'Maximum Growth (15%+)':  2.6,
};

// goal adjustments (delta points, will be renormalized)
const GOAL_DELTA = {
  'Wealth Creation':   {mid:+3, small:+2, flexi:+1, large:-3, index:-1, gold:-2},
  'Retirement':        {large:+4, index:+2, gold:+1, small:-3, sectoral:-2, mid:-2},
  'Child Education':   {flexi:+3, large:+2, index:+1, sectoral:-3, small:-2, gold:-1},
  'Buying a House':    {large:+3, index:+3, gold:+2, small:-4, sectoral:-3, mid:-1},
  'Buying a Car':      {large:+5, index:+4, gold:+3, small:-6, sectoral:-4, mid:-2},
  'Emergency Fund':    {gold:+8, index:+6, large:+3, small:-7, sectoral:-6, mid:-4},
  'Passive Income':    {large:+4, index:+3, flexi:+2, sectoral:-4, small:-3, mid:-2},
};

function clampPositive(obj){
  const out = {};
  for(const k in obj) out[k] = Math.max(obj[k], 0);
  return out;
}
function normalizeTo100(obj){
  const sum = Object.values(obj).reduce((a,b)=>a+b,0);
  const out = {};
  for(const k in obj) out[k] = obj[k]/sum*100;
  return out;
}
function roundAllocation(obj){
  // round to nearest integer while preserving sum=100
  const keys = Object.keys(obj);
  const floors = keys.map(k=>Math.floor(obj[k]));
  let diff = 100 - floors.reduce((a,b)=>a+b,0);
  const remainders = keys.map((k,i)=>({k, r: obj[k]-floors[i]}));
  remainders.sort((a,b)=>b.r-a.r);
  const result = {};
  keys.forEach((k,i)=>result[k]=floors[i]);
  for(let i=0;i<diff;i++){
    result[remainders[i % remainders.length].k] += 1;
  }
  return result;
}

function computeAllocation(a){
  const base = {...RISK_BASE[a.risk]};
  const tilt = RETURN_TILT[a.returns] || 0;

  // apply growth tilt: move points between defensive set and growth set
  const defensiveKeys = ['large','index','gold'];
  const growthKeys = ['mid','small','sectoral'];
  let working = {...base};
  const tiltMagnitude = Math.abs(tilt);
  const perDefensive = tiltMagnitude / defensiveKeys.length;
  const perGrowth = tiltMagnitude / growthKeys.length;

  if(tilt > 0){
    defensiveKeys.forEach(k=> working[k] -= perDefensive);
    growthKeys.forEach(k=> working[k] += perGrowth);
  } else if(tilt < 0){
    defensiveKeys.forEach(k=> working[k] += perDefensive);
    growthKeys.forEach(k=> working[k] -= perGrowth);
  }

  // apply goal delta
  const delta = GOAL_DELTA[a.goal] || {};
  for(const k in delta){
    working[k] = (working[k]||0) + delta[k];
  }

  working = clampPositive(working);
  working = normalizeTo100(working);
  working = roundAllocation(working);
  return working;
}

/* ============ RENDER RESULTS ============ */
const quizSection = document.getElementById('quizSection');
const resultsSection = document.getElementById('resultsSection');

function generateResults(){
  const alloc = computeAllocation(answers);

  quizSection.style.display = 'none';
  resultsSection.classList.add('show');

  renderProfileStrip();
  renderNarratives(alloc);
  renderDonut(alloc);
  renderLegend(alloc);
  renderSegGrid(alloc);
  renderAmounts(alloc);

  resultsSection.scrollIntoView({behavior:'smooth', block:'start'});
}

function renderProfileStrip(){
  const strip = document.getElementById('profileStrip');
  strip.innerHTML = Object.entries(answers).map(([k,v])=>{
    const labelMap = {goal:'Goal', risk:'Risk', capacity:'Capacity', style:'Style', returns:'Target'};
    return `<div class="tag">${labelMap[k]}: <b>${v}</b></div>`;
  }).join('');
}

function renderNarratives(alloc){
  const top = SEGMENTS.slice().sort((a,b)=>alloc[b.key]-alloc[a.key])[0];
  const equityPct = 100 - alloc.gold;
  document.getElementById('profileNarrative').textContent =
    `Based on a ${answers.risk.toLowerCase()} risk profile targeting ${answers.returns.toLowerCase()} returns for ${answers.goal.toLowerCase()}, the engine weights ${top.name} heaviest at ${alloc[top.key]}%. Total equity exposure stands at ${equityPct}%, with the remainder held as a gold hedge for portfolio ballast.`;

  const styleNote = {
    'SIP Only': 'Deploy the full allocation via monthly SIPs across the chosen funds — this profile is built for rupee-cost averaging, so stay consistent through volatility rather than timing entries.',
    'Lump Sum Only': 'Since you plan a one-time deployment, consider staggering entry over 3–4 tranches across 6–8 weeks to reduce single-point timing risk, especially into the Small Cap and Sectoral sleeves.',
    'SIP + Lump Sum': 'Use the lump sum to seed the Large Cap, Flexi Cap and Index ETF sleeves immediately, and run SIPs into Mid Cap, Small Cap and Sectoral funds to average into the more volatile segments.',
  };
  document.getElementById('deploymentNarrative').textContent =
    `${styleNote[answers.style]} At a monthly capacity of ${answers.capacity}, ${capacityNote(answers.capacity)}`;
}

function capacityNote(capacity){
  const notes = {
    '₹1,000–5,000': 'keep it simple — one Flexi Cap fund plus one Index ETF covers most of this allocation efficiently without over-fragmenting small ticket sizes.',
    '₹5,000–10,000': 'three to four funds is enough to express this allocation without diluting any single position below a meaningful size.',
    '₹10,000–25,000': 'four to five funds lets you express each segment distinctly while keeping the portfolio easy to track.',
    '₹25,000–50,000': 'you can run a dedicated fund per segment, including a standalone Sectoral/Thematic sleeve, without any position becoming too thin.',
    '₹50,000+': 'consider direct stock exposure for the Large Cap and Flexi Cap sleeves alongside funds for Mid/Small Cap, to reduce overlapping expense ratios.',
  };
  return notes[capacity] || '';
}

/* Donut chart */
let activeSlice = null;

function describeArc(cx, cy, r, startAngle, endAngle){
  const polarToCartesian = (angle) => {
    const rad = (angle-90) * Math.PI/180;
    return [cx + r*Math.cos(rad), cy + r*Math.sin(rad)];
  };
  const [sx,sy] = polarToCartesian(endAngle);
  const [ex,ey] = polarToCartesian(startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 0 ${ex} ${ey} Z`;
}

function renderDonut(alloc){
  const svg = document.getElementById('donutSvg');
  const cx=160, cy=160, r=140, inner=82;
  let angle = 0;
  const paths = [];

  SEGMENTS.forEach(seg=>{
    const pct = alloc[seg.key];
    if(pct<=0) return;
    const sweep = pct/100*360;
    const start = angle;
    const end = angle+sweep;
    angle = end;
    const mid = (start+end)/2;
    const rad = (mid-90)*Math.PI/180;
    const ox = Math.cos(rad), oy = Math.sin(rad);

    const outer = describeArc(cx,cy,r,start,end);
    const innerCut = describeArc(cx,cy,inner,start,end);
    // build donut slice path using even-odd: outer minus inner approximated via two arcs combined
    const d = donutSlicePath(cx,cy,r,inner,start,end);

    paths.push({seg, pct, d, ox, oy});
  });

  svg.innerHTML = paths.map((p,i)=>`
    <path class="slice" data-key="${p.seg.key}" d="${p.d}" fill="${p.seg.color}"
      style="transform:translate(0,0)" data-ox="${p.ox.toFixed(3)}" data-oy="${p.oy.toFixed(3)}"></path>
  `).join('');

  svg.querySelectorAll('.slice').forEach(node=>{
    const key = node.dataset.key;
    const segDef = SEGMENTS.find(s=>s.key===key);
    const pct = alloc[key];

    node.addEventListener('mouseenter', ()=>setActive(key, segDef, pct, alloc, svg));
    node.addEventListener('mouseleave', ()=>clearActive(svg, alloc));
    node.addEventListener('click', ()=>setActive(key, segDef, pct, alloc, svg));
  });
}

function donutSlicePath(cx,cy,rOuter,rInner,startAngle,endAngle){
  const toXY = (r,angle)=>{
    const rad=(angle-90)*Math.PI/180;
    return [cx+r*Math.cos(rad), cy+r*Math.sin(rad)];
  };
  const [x1,y1] = toXY(rOuter,startAngle);
  const [x2,y2] = toXY(rOuter,endAngle);
  const [x3,y3] = toXY(rInner,endAngle);
  const [x4,y4] = toXY(rInner,startAngle);
  const largeArc = endAngle-startAngle <= 180 ? 0 : 1;
  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;
}

function setActive(key, segDef, pct, alloc, svg){
  activeSlice = key;
  svg.querySelectorAll('.slice').forEach(n=>{
    if(n.dataset.key===key){
      n.classList.add('active');
      n.classList.remove('dim');
      const ox = parseFloat(n.dataset.ox), oy = parseFloat(n.dataset.oy);
      n.style.transform = `translate(${(ox*10).toFixed(2)}px, ${(oy*10).toFixed(2)}px) scale(1.04)`;
    } else {
      n.classList.add('dim');
      n.classList.remove('active');
      n.style.transform = 'translate(0,0) scale(1)';
    }
  });
  document.getElementById('centerPct').textContent = pct+'%';
  document.getElementById('centerPct').style.color = segDef.color;
  document.getElementById('centerName').textContent = segDef.name;

  document.querySelectorAll('.leg-row').forEach(row=>{
    row.classList.toggle('active', row.dataset.key===key);
  });
}

function clearActive(svg, alloc){
  activeSlice = null;
  svg.querySelectorAll('.slice').forEach(n=>{
    n.classList.remove('active','dim');
    n.style.transform = 'translate(0,0) scale(1)';
  });
  document.getElementById('centerPct').textContent = (100-alloc.gold)+'%';
  document.getElementById('centerPct').style.color = '';
  document.getElementById('centerName').textContent = 'Equity Exposure';
  document.querySelectorAll('.leg-row').forEach(row=>row.classList.remove('active'));
}

function renderLegend(alloc){
  const legend = document.getElementById('legend');
  const sorted = SEGMENTS.slice().sort((a,b)=>alloc[b.key]-alloc[a.key]);
  legend.innerHTML = sorted.map(seg=>`
    <div class="leg-row" data-key="${seg.key}">
      <div class="leg-left">
        <span class="leg-dot" style="background:${seg.color}"></span>
        <span class="leg-name">${seg.name}</span>
      </div>
      <span class="leg-val">${alloc[seg.key]}%</span>
    </div>
  `).join('');

  legend.querySelectorAll('.leg-row').forEach(row=>{
    const key = row.dataset.key;
    const segDef = SEGMENTS.find(s=>s.key===key);
    row.addEventListener('mouseenter', ()=>setActive(key, segDef, alloc[key], alloc, document.getElementById('donutSvg')));
    row.addEventListener('mouseleave', ()=>clearActive(document.getElementById('donutSvg'), alloc));
  });

  document.getElementById('centerPct').textContent = (100-alloc.gold)+'%';
  document.getElementById('centerName').textContent = 'Equity Exposure';
}

function renderSegGrid(alloc){
  const grid = document.getElementById('segGrid');
  const sorted = SEGMENTS.slice().sort((a,b)=>alloc[b.key]-alloc[a.key]);
  grid.innerHTML = sorted.map(seg=>`
    <div class="seg-item">
      <div class="top">
        <span class="nm">${seg.name}</span>
        <span class="pc">${alloc[seg.key]}%</span>
      </div>
      <div class="desc">${seg.desc}</div>
    </div>
  `).join('');
}

function capacityToAmount(capacity){
  const map = {
    '₹1,000–5,000': [1000,5000],
    '₹5,000–10,000': [5000,10000],
    '₹10,000–25,000': [10000,25000],
    '₹25,000–50,000': [25000,50000],
    '₹50,000+': [50000,75000],
  };
  return map[capacity] || [10000,10000];
}

function renderAmounts(alloc){
  const [lo,hi] = capacityToAmount(answers.capacity);
  const mid = Math.round((lo+hi)/2);
  const table = document.getElementById('amountTable');
  const sorted = SEGMENTS.slice().sort((a,b)=>alloc[b.key]-alloc[a.key]);
  const fmt = (n)=> '₹'+Math.round(n).toLocaleString('en-IN');
  table.innerHTML = sorted.map(seg=>{
    const amt = mid * alloc[seg.key]/100;
    return `<div class="amount-row"><span>${seg.name}</span><span>${fmt(amt)}/mo</span></div>`;
  }).join('') + `<div class="amount-row"><span>Total (at midpoint of range)</span><span>${fmt(mid)}/mo</span></div>`;
}

/* ============ RESTART ============ */
document.getElementById('btnRestart').addEventListener('click', ()=>{
  curQ = 0;
  for(const k in answers) delete answers[k];
  resultsSection.classList.remove('show');
  quizSection.style.display = 'block';
  renderQuestion();
  quizSection.scrollIntoView({behavior:'smooth', block:'start'});
});
