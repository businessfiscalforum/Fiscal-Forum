// ── HERO CANDLESTICK CANVAS ANIMATION ──
(function() {
  const canvas = document.getElementById('hero-candle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const GREEN = '#52B788';
  const RED   = '#FF6B6B';
  const WICK  = '#bbbbbb';
  const NUM   = 28;

  function makeCandles() {
    const arr = [];
    const pattern = [1,0,1,1,0,0,1,0,1,1,0,1,0,0,1,1,0,1,0,1,1,0,0,1,0,1,1,0];
    for (let i = 0; i < NUM; i++) {
      const bull = pattern[i % pattern.length] === 1;
      const bodyPct = bull ? 0.38 + Math.random() * 0.28 : 0.55 + Math.random() * 0.30;
      const wickTop = 0.10 + Math.random() * 0.22;
      const wickBot = 0.08 + Math.random() * 0.18;
      arr.push({ bull, bodyPct, wickTop, wickBot });
    }
    return arr;
  }

  const candleData = makeCandles();
  const phases  = candleData.map((_, i) => i * (Math.PI * 2 / NUM));
  const speeds  = candleData.map(() => 0.010 + Math.random() * 0.008);
  const phases2 = candleData.map(() => Math.random() * Math.PI * 2);
  const speeds2 = candleData.map(() => 0.014 + Math.random() * 0.010);
  let tick = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width  = rect.width  || 500;
    canvas.height = rect.height || 440;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const padL = W * 0.03, padR = W * 0.03;
    const usableW = W - padL - padR;
    const gap = usableW / NUM;
    const candleW = Math.max(Math.floor(gap * 0.58), 8);
    const yStart = H * 0.82, yEnd = H * 0.12;

    for (let i = 0; i < NUM; i++) {
      const d  = candleData[i];
      const cx = padL + gap * i + gap / 2;
      const floatY = Math.sin(phases[i]  + tick * speeds[i])  * 18
                   + Math.sin(phases2[i] + tick * speeds2[i]) *  9;
      const trendY = yStart + (yEnd - yStart) * (i / (NUM - 1)) + floatY;
      const baseH  = d.bull
        ? 52 + i * 3.2 + Math.sin(i * 1.1) * 10
        : 72 + i * 3.8 + Math.sin(i * 0.9) * 14;
      const bodyH    = Math.max(baseH * d.bodyPct, 12);
      const wickTopH = baseH * d.wickTop;
      const wickBotH = baseH * d.wickBot;
      const bodyTop  = trendY - bodyH / 2;

      ctx.beginPath(); ctx.strokeStyle = WICK; ctx.lineWidth = 2;
      ctx.moveTo(cx, bodyTop); ctx.lineTo(cx, bodyTop - wickTopH); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, bodyTop + bodyH); ctx.lineTo(cx, bodyTop + bodyH + wickBotH); ctx.stroke();

      const r = Math.min(6, candleW / 4);
      ctx.beginPath();
      ctx.roundRect(cx - candleW / 2, bodyTop, candleW, bodyH, r);
      ctx.fillStyle = d.bull ? GREEN : RED;
      ctx.fill();
    }
    tick++;
    requestAnimationFrame(draw);
  }
  draw();
})();

// Mouse parallax on hero
document.addEventListener('mousemove', (e) => {
  const stage = document.querySelector('.candle-stage');
  if (!stage) return;
  const x = (e.clientX / window.innerWidth  - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 6;
  stage.style.transform = `translate(${x}px, ${y}px)`;
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fo-card, .glossary-card, .risk-card, .pub-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s';
  observer.observe(el);
});


// ══════════════════════════════════════════════════
//  F&O PLAYGROUND SIMULATOR — FULLY FIXED
// ══════════════════════════════════════════════════
(function() {

  // ── Constants ──
  const BASE_STRIKE = 100;   // strike / entry price
  const BASE_ENTRY  = 100;
  const PREMIUM     = 8;     // option premium at max days-to-expiry

  // ── State ──
  let state = {
    price:    100,
    expiry:   30,    // days remaining (30 = far from expiry, 1 = day of expiry)
    lot:      50,
    position: 'long-future'
  };

  // ── Position descriptions (updated dynamically) ──
  function posExplain(pos, lot, prem) {
    const maxLoss = (prem * lot).toLocaleString('en-IN');
    const margin  = (BASE_ENTRY * lot * 0.1).toLocaleString('en-IN');
    const map = {
      'long-future':
        `<strong>Long Future:</strong> You are obligated to BUY at ₹${BASE_ENTRY}. Every ₹1 rise = <strong>+₹${lot}</strong> profit; every ₹1 fall = <strong>−₹${lot}</strong> loss. Margin required: ₹${margin}. No premium paid — unlimited upside AND downside.`,
      'long-call':
        `<strong>Long Call (CE):</strong> You paid ₹${prem.toFixed(1)} premium × ${lot} units = ₹${maxLoss} max loss. Break-even at ₹${(BASE_STRIKE + prem).toFixed(1)}. If price rises above break-even, profits are unlimited. If it stays below strike, you simply lose the premium.`,
      'long-put':
        `<strong>Long Put (PE):</strong> You paid ₹${prem.toFixed(1)} premium × ${lot} units = ₹${maxLoss} max loss. Break-even at ₹${(BASE_STRIKE - prem).toFixed(1)}. Profits grow as price falls below break-even. Max profit if stock goes to ₹0.`,
      'short-call':
        `<strong>Short Call:</strong> You collected ₹${prem.toFixed(1)} premium × ${lot} units = ₹${maxLoss} max gain. Profit if price stays BELOW ₹${(BASE_STRIKE + prem).toFixed(1)} at expiry. Risk is unlimited above break-even — price can rise forever.`,
      'short-put':
        `<strong>Short Put:</strong> You collected ₹${prem.toFixed(1)} premium × ${lot} units = ₹${maxLoss} max gain. Profit if price stays ABOVE ₹${(BASE_STRIKE - prem).toFixed(1)} at expiry. Risk below break-even — you must buy at ₹${BASE_STRIKE} even if it falls to ₹0.`
    };
    return map[pos] || '';
  }

  // ── Futures P&L ──
  function calcFutures(price, lot) {
    const buyerPL  =  (price - BASE_ENTRY) * lot;
    const sellerPL = -(price - BASE_ENTRY) * lot;
    return { buyerPL, sellerPL, breakeven: BASE_ENTRY };
  }

  // ── Options P&L with proper theta decay ──
  // expiry: 1..30  — 30 = 30 days left (full premium), 1 = expiry day (no time value)
  function calcOptions(price, lot, expiry, pos) {
    // Time value shrinks linearly toward 0 at expiry
    // At expiry (expiry=1) effectivePremium = intrinsic value only (0 time value)
    const timeRatio        = (expiry - 1) / 29;          // 0 at expiry, 1 at 30 days
    const timeValue        = PREMIUM * timeRatio;         // time portion of premium
    const effectivePremium = timeValue;                   // at expiry this is 0

    const isCall = pos === 'long-call'  || pos === 'short-call';
    const isLong = pos === 'long-call'  || pos === 'long-put';
    const isPut  = pos === 'long-put'   || pos === 'short-put';

    // Intrinsic value
    const intrinsic = isCall
      ? Math.max(price - BASE_STRIKE, 0)
      : Math.max(BASE_STRIKE - price, 0);

    // Option market value = intrinsic + time value
    const optionValue = intrinsic + timeValue;

    // P&L for buyer = current value − premium paid (always PREMIUM at entry)
    const buyerRawPL  = (optionValue - PREMIUM) * lot;
    const sellerRawPL = -buyerRawPL;

    let buyerPL, sellerPL;
    if (isLong) {
      buyerPL  = buyerRawPL;
      sellerPL = sellerRawPL;
    } else {
      // short positions: seller collected premium, buyer is the market
      buyerPL  = sellerRawPL;   // short = seller's perspective is "buyer" here
      sellerPL = buyerRawPL;
    }

    // Break-even at expiry (based on full premium paid = PREMIUM)
    const breakeven = isCall
      ? BASE_STRIKE + PREMIUM
      : BASE_STRIKE - PREMIUM;

    return { buyerPL, sellerPL, breakeven: +breakeven.toFixed(1), effectivePremium: PREMIUM };
  }

  // ── Helpers ──
  function fmt(n) {
    const abs = Math.abs(Math.round(n)).toLocaleString('en-IN');
    return (n >= 0 ? '+₹' : '−₹') + abs;
  }
  function colorClass(n) { return n > 0 ? 'green' : n < 0 ? 'red' : ''; }

  // ── P&L chart ──
  function drawChart(canvasId, priceRange, plFn, currentPrice) {
    const cv = document.getElementById(canvasId);
    if (!cv) return;
    const cx = cv.getContext('2d');
    cv.width  = cv.parentElement.clientWidth - 16;
    cv.height = 120;
    const W = cv.width, H = cv.height;

    cx.fillStyle = '#ffffff';
    cx.fillRect(0, 0, W, H);

    // Build data
    const prices = [], pls = [];
    for (let p = priceRange[0]; p <= priceRange[1]; p++) {
      prices.push(p);
      pls.push(plFn(p));
    }

    const minPL = Math.min(...pls);
    const maxPL = Math.max(...pls);
    const range = (maxPL - minPL) || 1;

    const PAD = 12;
    const toX = p  => ((p  - priceRange[0]) / (priceRange[1] - priceRange[0])) * (W - PAD*2) + PAD;
    const toY = pl => H - PAD - ((pl - minPL) / range) * (H - PAD*2 - 8);

    // Zero line
    if (minPL < 0 && maxPL > 0) {
      const zeroY = toY(0);
      cx.beginPath();
      cx.setLineDash([4, 4]);
      cx.strokeStyle = '#ddd';
      cx.lineWidth = 1;
      cx.moveTo(PAD, zeroY);
      cx.lineTo(W - PAD, zeroY);
      cx.stroke();
      cx.setLineDash([]);

      // "PROFIT" / "LOSS" labels
      cx.font = '9px Space Mono, monospace';
      cx.fillStyle = '#1E5C3A';
      cx.fillText('PROFIT', PAD + 4, zeroY - 5);
      cx.fillStyle = '#B5181E';
      cx.fillText('LOSS', PAD + 4, zeroY + 13);
    }

    // Separate green (profit) and red (loss) segments
    // Draw fill
    cx.beginPath();
    cx.moveTo(toX(prices[0]), toY(0));
    prices.forEach((p, i) => cx.lineTo(toX(p), toY(pls[i])));
    cx.lineTo(toX(prices[prices.length-1]), toY(0));
    cx.closePath();

    const grad = cx.createLinearGradient(0, 0, 0, H);
    if (maxPL > 0) {
      grad.addColorStop(0,   'rgba(30,92,58,0.15)');
      grad.addColorStop(0.5, 'rgba(30,92,58,0.05)');
    }
    if (minPL < 0) {
      grad.addColorStop(maxPL > 0 ? 0.5 : 0, 'rgba(181,24,30,0.08)');
      grad.addColorStop(1, 'rgba(181,24,30,0.14)');
    }
    cx.fillStyle = grad;
    cx.fill();

    // Draw line — green above zero, red below zero
    for (let i = 1; i < prices.length; i++) {
      const x1 = toX(prices[i-1]), y1 = toY(pls[i-1]);
      const x2 = toX(prices[i]),   y2 = toY(pls[i]);
      cx.beginPath();
      cx.moveTo(x1, y1);
      cx.lineTo(x2, y2);
      cx.strokeStyle = pls[i] >= 0 ? '#1E5C3A' : '#B5181E';
      cx.lineWidth   = 2.5;
      cx.stroke();
    }

    // Current price vertical line
    const cpX = toX(currentPrice);
    cx.beginPath();
    cx.setLineDash([3, 3]);
    cx.strokeStyle = '#E8924A';
    cx.lineWidth = 1.5;
    cx.moveTo(cpX, PAD);
    cx.lineTo(cpX, H - PAD);
    cx.stroke();
    cx.setLineDash([]);

    // Current price dot
    const cpY = toY(plFn(currentPrice));
    cx.beginPath();
    cx.arc(cpX, cpY, 5, 0, Math.PI * 2);
    cx.fillStyle   = '#E8924A';
    cx.fill();
    cx.strokeStyle = '#0D0D0D';
    cx.lineWidth   = 1.5;
    cx.stroke();

    // Current P&L label — big, black, with white pill background
    const curPL = plFn(currentPrice);
    const label  = fmt(curPL);
    cx.font = 'bold 14px Space Mono, monospace';
    const textW  = cx.measureText(label).width;
    const pillH  = 22, pillPad = 8;
    let lx = cpX + 10;
    if (lx + textW + pillPad * 2 > W) lx = cpX - textW - pillPad * 2 - 10;
    const ly = Math.max(cpY - 14, 4);
    // white pill
    cx.fillStyle   = '#ffffff';
    cx.strokeStyle = '#0D0D0D';
    cx.lineWidth   = 1.5;
    cx.beginPath();
    cx.roundRect(lx - pillPad, ly, textW + pillPad * 2, pillH, 4);
    cx.fill();
    cx.stroke();
    // black text
    cx.fillStyle = '#0D0D0D';
    cx.fillText(label, lx, ly + 15);

    // X-axis labels
    cx.font      = '9px Space Mono, monospace';
    cx.fillStyle = '#aaa';
    cx.fillText('₹' + priceRange[0], PAD, H - 2);
    const midP = Math.round((priceRange[0] + priceRange[1]) / 2);
    cx.fillText('₹' + midP, toX(midP) - 12, H - 2);
    cx.fillText('₹' + priceRange[1], W - 36, H - 2);
  }

  // ── Main update function ──
  function update() {
    const { price, expiry, lot, position } = state;

    // ── FUTURES panel ──
    const fut = calcFutures(price, lot);

    document.getElementById('fut-entry').textContent  = '₹' + BASE_ENTRY;
    document.getElementById('fut-lot').textContent    = lot;
    document.getElementById('fut-margin').textContent = '₹' + (BASE_ENTRY * lot * 0.1).toLocaleString('en-IN');

    const fbPL = document.getElementById('fut-buyer-pl');
    fbPL.textContent = fmt(fut.buyerPL);
    fbPL.className   = 'pl-value ' + colorClass(fut.buyerPL);

    const fsPL = document.getElementById('fut-seller-pl');
    fsPL.textContent = fmt(fut.sellerPL);
    fsPL.className   = 'pl-value ' + colorClass(fut.sellerPL);

    document.getElementById('fut-breakeven').textContent = '₹' + fut.breakeven;

    const futBox = document.getElementById('fut-pl-box');
    futBox.className = 'panel-pl-box' + (fut.buyerPL > 0 ? ' profit' : fut.buyerPL < 0 ? ' loss' : '');

    drawChart('fut-chart', [60, 160], p => (p - BASE_ENTRY) * lot, price);

    // ── OPTIONS panel ──
    // When "Long Future" is selected in the position switcher, show Long Call in options panel
    const optPos = (position === 'long-future') ? 'long-call' : position;
    const opt    = calcOptions(price, lot, expiry, optPos);

    document.getElementById('opt-strike').textContent  = '₹' + BASE_STRIKE;
    document.getElementById('opt-premium').textContent = '₹' + PREMIUM.toFixed(1);
    document.getElementById('opt-maxloss').textContent = '−₹' + (PREMIUM * lot).toLocaleString('en-IN');

    const obPL = document.getElementById('opt-buyer-pl');
    obPL.textContent = fmt(opt.buyerPL);
    obPL.className   = 'pl-value ' + colorClass(opt.buyerPL);

    const osPL = document.getElementById('opt-seller-pl');
    osPL.textContent = fmt(opt.sellerPL);
    osPL.className   = 'pl-value ' + colorClass(opt.sellerPL);

    document.getElementById('opt-breakeven').textContent = '₹' + opt.breakeven;

    const optBox = document.getElementById('opt-pl-box');
    optBox.className = 'panel-pl-box' + (opt.buyerPL > 0 ? ' profit' : opt.buyerPL < 0 ? ' loss' : '');

    // Options P&L chart function depends on selected position
    const isCall    = optPos === 'long-call'  || optPos === 'short-call';
    const isLongOpt = optPos === 'long-call'  || optPos === 'long-put';

    drawChart('opt-chart', [60, 160], p => {
      const intr     = isCall ? Math.max(p - BASE_STRIKE, 0) : Math.max(BASE_STRIKE - p, 0);
      // at expiry (expiry=1) timeValue=0; use same formula as calcOptions
      const timeRatio = (expiry - 1) / 29;
      const tVal      = PREMIUM * timeRatio;
      const optVal    = intr + tVal;
      const raw       = (optVal - PREMIUM) * lot;
      return isLongOpt ? raw : -raw;
    }, price);

    // ── Position explain ──
    document.getElementById('pos-explain').innerHTML = posExplain(position, lot, PREMIUM);

    // ── Slider display labels ──
    document.getElementById('price-display').textContent  = '₹' + price;
    document.getElementById('expiry-display').textContent = expiry + ' days';
    document.getElementById('lot-display').textContent    = lot + ' units';
  }

  // ── Slider events ──
  document.getElementById('price-slider').addEventListener('input', function() {
    state.price = +this.value; update();
  });
  document.getElementById('expiry-slider').addEventListener('input', function() {
    state.expiry = +this.value; update();
  });
  document.getElementById('lot-slider').addEventListener('input', function() {
    state.lot = +this.value; update();
  });

  // ── Position tab events ──
  document.querySelectorAll('.pos-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      state.position = this.dataset.pos;
      update();
    });
  });

  // ── Initial render ──
  update();

  // ── Redraw on resize ──
  window.addEventListener('resize', () => setTimeout(update, 50));

})();
