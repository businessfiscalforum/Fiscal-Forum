/* ============================================================
   MANDI — interactivity
   ============================================================ */

(function(){

  /* ---------------- ticker ---------------- */
  function buildTicker(){
    const track = document.getElementById("tickerTrack");
    const rows = [
      { name:"GOLD", v:"₹71,240/10g", dir:"up", d:"+0.4%" },
      { name:"SILVER", v:"₹83,910/kg", dir:"down", d:"-0.2%" },
      { name:"CRUDE (BRENT)", v:"$82.16/bbl", dir:"up", d:"+1.1%" },
      { name:"NATURAL GAS", v:"₹248/mmBtu", dir:"down", d:"-0.6%" },
      { name:"WHEAT", v:"₹2,425/qtl", dir:"up", d:"+0.3%" },
      { name:"COTTON", v:"₹58,900/candy", dir:"down", d:"-0.8%" },
      { name:"COPPER", v:"₹812/kg", dir:"up", d:"+0.9%" },
    ];
    const html = rows.map(r => `
      <span class="tick-item">
        <span class="name">${r.name}</span>
        <span>${r.v}</span>
        <span class="${r.dir}">${r.dir === "up" ? "▲" : "▼"} ${r.d}</span>
      </span>`).join("");
    track.innerHTML = html + html; // duplicate for seamless loop
  }

  /* ---------------- hero (floating marks removed) ---------------- */
  function buildHero(){
    // Floating commodity marks intentionally removed for a cleaner hero.
  }

  /* ---------------- journey ---------------- */
  let currentCommodity = "wheat";
  let currentStageIndex = null;

  function buildPicker(){
    const picker = document.getElementById("commodityPicker");
    picker.innerHTML = Object.keys(COMMODITIES).map(key => {
      const c = COMMODITIES[key];
      return `<button class="commodity-chip" data-key="${key}" role="tab">
        ${ICONS[c.icon]}<span>${c.label}</span>
      </button>`;
    }).join("");

    picker.querySelectorAll(".commodity-chip").forEach(chip => {
      chip.addEventListener("click", () => selectCommodity(chip.dataset.key));
    });
  }

  function buildRail(){
    const rail = document.getElementById("journeyRail");
    rail.innerHTML = STAGE_KEYS.map((key, i) => `
      <button class="rail-stop" data-stage="${key}" data-index="${i}">
        <span class="rail-stop-icon">${ICONS[key]}</span>
        <span class="rail-stop-label">${stageLabel(key)}</span>
      </button>
    `).join("");

    rail.querySelectorAll(".rail-stop").forEach(stop => {
      stop.addEventListener("click", () => openStage(parseInt(stop.dataset.index, 10)));
    });
  }

  function stageLabel(key){
    const map = { origin:"Origin", storage:"Storage", exchange:"Exchange", trader:"Trader", processor:"Processor", consumer:"Consumer" };
    return map[key];
  }

  function selectCommodity(key){
    if (!COMMODITIES[key]) return;
    currentCommodity = key;
    const c = COMMODITIES[key];
    document.documentElement.style.setProperty("--accent", c.accent);
    document.documentElement.style.setProperty("--accent-soft", c.accent + "29");

    document.querySelectorAll(".commodity-chip").forEach(chip => {
      chip.classList.toggle("active", chip.dataset.key === key);
    });

    currentStageIndex = null;
    document.querySelectorAll(".rail-stop").forEach(s => s.classList.remove("active"));
    renderEmptyDetail(c.tagline);

    const img = document.getElementById("journeySceneImg");
    const tag = document.getElementById("journeySceneTag");
    if (img) {
      img.style.opacity = 0;
      setTimeout(() => {
        img.src = c.image;
        img.alt = c.label + " — " + c.tagline;
        img.style.opacity = 1;
      }, 120);
    }
    if (tag) tag.textContent = c.tagline;
  }

  function renderEmptyDetail(tagline){
    const detail = document.getElementById("stageDetail");
    detail.innerHTML = `<div class="stage-detail-empty">
      <p>${tagline}<br><br>Click a stop on the road above to open it up.</p>
    </div>`;
  }

  function openStage(index){
    currentStageIndex = index;
    const key = STAGE_KEYS[index];
    const c = COMMODITIES[currentCommodity];
    const stage = c.stages[key];

    document.querySelectorAll(".rail-stop").forEach((s, i) => s.classList.toggle("active", i === index));

    const detail = document.getElementById("stageDetail");
    detail.innerHTML = `
      <div class="stage-content">
        <div class="stage-top">
          <h3 class="stage-title">${stage.title}</h3>
          <span class="stage-sub">${stage.sub}</span>
        </div>
        <p class="stage-body">${stage.body}</p>
        <div class="stage-meta">
          <div class="meta-block"><span class="meta-label">Who participates</span><p>${stage.who}</p></div>
          <div class="meta-block"><span class="meta-label">Why prices change</span><p>${stage.priceWhy}</p></div>
          <div class="meta-block"><span class="meta-label">Risks</span><p>${stage.risks}</p></div>
        </div>
        <div class="meta-block" style="margin-top:1.4rem;"><span class="meta-label">Opportunity</span><p>${stage.opportunity}</p></div>
        <div class="stage-nav">
          <button class="stage-nav-btn" id="prevStage" ${index === 0 ? "disabled" : ""}>← Previous stop</button>
          <button class="stage-nav-btn" id="nextStage" ${index === STAGE_KEYS.length - 1 ? "disabled" : ""}>Next stop →</button>
        </div>
      </div>
    `;

    const prev = document.getElementById("prevStage");
    const next = document.getElementById("nextStage");
    if (prev) prev.addEventListener("click", () => openStage(index - 1));
    if (next) next.addEventListener("click", () => openStage(index + 1));
  }

  /* ---------------- factors dashboard ---------------- */
  let currentFactor = null;

  function buildFactors(){
    const board = document.getElementById("factorsBoard");
    FACTORS.forEach((f, i) => {
      const node = document.createElement("button");
      node.type = "button";
      node.className = "factor-node";
      node.style.gridArea = "c" + (i + 1);
      node.dataset.factor = f.id;
      node.innerHTML = `<span class="factor-node-icon">${f.icon}</span><span class="factor-node-label">${f.label}</span>`;
      node.addEventListener("mouseenter", () => activateFactor(f.id));
      node.addEventListener("focus", () => activateFactor(f.id));
      node.addEventListener("click", () => activateFactor(f.id));
      board.appendChild(node);
    });
  }

  function activateFactor(id){
    if (currentFactor === id) return;
    currentFactor = id;
    const f = FACTORS.find(x => x.id === id);
    if (!f) return;
    const c = COMMODITIES[f.commodity];

    document.querySelectorAll(".factor-node").forEach(n => {
      n.classList.toggle("active", n.dataset.factor === id);
    });

    const board = document.getElementById("factorsBoard");
    board.style.setProperty("--factor-accent", c.accent);

    const img = document.getElementById("factorsCenterImg");
    const tag = document.getElementById("factorsCenterTag");
    if (img){
      img.style.opacity = 0;
      setTimeout(() => {
        img.src = c.image;
        img.alt = c.label;
        img.style.opacity = 1;
      }, 120);
    }
    if (tag) tag.textContent = c.label.toUpperCase();

    const chain = document.getElementById("factorsChain");
    let delayIndex = 0;
    const stepsHtml = f.chain.map((step, i) => {
      const connector = i > 0
        ? `<span class="chain-connector" style="animation-delay:${(delayIndex++) * 0.16}s">→</span>`
        : "";
      const isResult = i === f.chain.length - 1;
      const stepHtml = `<span class="chain-step${isResult ? " chain-step-result" : ""}" style="animation-delay:${(delayIndex++) * 0.16}s">
        <span class="chain-step-text">${step.label}</span>
        <span class="chain-arrow ${step.dir}">${step.dir === "up" ? "▲" : "▼"}</span>
      </span>`;
      return connector + stepHtml;
    }).join("");

    chain.innerHTML = `
      <div class="chain-factor-tag">${f.icon} ${f.label}</div>
      <div class="chain-steps">${stepsHtml}</div>
      <p class="chain-note">${f.note}</p>
    `;
  }

  /* ---------------- intro scroll reveal + color ---------------- */
  function buildIntro(){
    const stmts = document.querySelectorAll(".intro-stmt");

    // Apply per-row accent color to CSS var
    stmts.forEach(stmt => {
      const color = stmt.dataset.color || "var(--sage)";
      stmt.style.setProperty("--stmt-color", color);
    });

    // IntersectionObserver for staggered reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.18 });

    stmts.forEach(stmt => observer.observe(stmt));
  }

  /* ---------------- init ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    buildTicker();
    buildHero();
    buildIntro();
    buildPicker();
    buildRail();
    selectCommodity("wheat");
    document.querySelector('.commodity-chip[data-key="wheat"]').classList.add("active");
    buildFactors();
    activateFactor("rates");
  });

})();
