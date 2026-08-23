# IPO Journey — Design System

Version: 2.0 (supersedes the Fiscal Forum doc — rebuilt from the `IPO-main` build)
Style: Editorial Fintech / Calm Explainer — **neo-brutalism removed**

---

# 0. What Changed From the Source File

The uploaded build (`IPO-main/index.html`) is a scroll-based IPO explainer (ticker tape → hero → 6-step journey stepper → "why IPOs happen" stage explorer → players grid → allotment simulator → risk cards → glossary accordion → footer CTA). As shipped, it leans **neo-brutalist**:

* 2–4px solid black borders on almost every element (cards, inputs, pills, nav, dividers)
* Hard, non-blurred offset shadows (`3px 3px 0`, `5px 5px 0`, `8px 8px 0`, zero blur, solid black)
* A visible graph-paper grid painted across the page background
* All-caps `Archivo Black` headings with heavy, poster-like weight
* Chunky circular slider thumbs with their own hard shadow

This document keeps the actual content structure, palette, and layout of that build, but **strips the brutalist treatment** and replaces it with soft, blurred shadows, thin hairline borders, a quieter background, and calmer type — in line with a trustworthy, editorial fintech feel rather than a poster/zine feel.

---

# 1. Core Design Philosophy

* Calm, editorial fintech explainer
* Warm paper-toned background, not stark white
* Soft depth (blurred shadows), never hard offset shadows
* Thin hairline borders, not heavy black rules
* Financial-grade seriousness with approachable, human copy
* Data-driven storytelling (ticker, stepper, simulator) presented quietly, not loudly
* Generous whitespace, one idea per section

The interface should feel:

* Trustworthy and grown-up
* Warm rather than clinical
* Precise (mono numerals for data) without feeling like a terminal
* Interactive but understated

### Visual References

* Stripe Dashboard
* Zerodha Varsity
* Notion (warm paper background)
* Linear.app (quiet hairline structure)

---

# 2. Color Palette

## Background

### Paper Background

```txt
#F4F1E8
```

Warm off-white page background. **Remove the visible graph-paper grid overlay** from the brutalist build — keep the background flat, or at most an extremely faint (2–3% opacity) dot grid with no visible lines.

### Surface White

```txt
#FFFFFF
```

Cards, panels, the nav bar, the simulator panel.

### Soft Background

```txt
#F1F1E6
```

Alternating section tint, used sparingly instead of hard-bordered section dividers.

---

## Ink / Text

### Ink Primary

```txt
#0A0A0A
```

Reserve near-black for text only, not for 2–4px structural borders. Headings and body copy.

### Ink Soft

```txt
#33352F
```

Secondary text, lede paragraphs.

### Ink Dim

```txt
#6B6D63
```

Card descriptions, captions, fine print.

---

## Brand / Accent

### Accent Green

```txt
#5B9279
```

Primary interactive color — CTA fills, active states, chart bars trending positive.

### Accent Deep

```txt
#2F5B45
```

Hover state for the primary button, active text emphasis.

### Accent Soft

```txt
#CFE8D4
```

Pill backgrounds (eyebrow labels, active step pill) — used as a tint fill, not paired with a hard black outline.

---

## Signal Colors

### Rise (positive)

```txt
#2F5B45
```

### Fall (negative)

```txt
#C23B3B
```

### Gold (caution / neutral highlight)

```txt
#9C6B15
```

### Gold Soft

```txt
#FAF3D9
```

Used for the "why" caption panel background.

### Navy (dark panel)

```txt
#16243D
```

Used for the simulator result panel and footer — the one deliberately dark surface on the page.

---

## Borders

### Hairline Border

```txt
rgba(10,10,10,0.12)
```

Replaces the former solid 2–4px black border everywhere: cards, nav, inputs, pills, dividers. One consistent 1px hairline.

---

# 3. Typography

## Font Recommendations

### Display / Headings

```css
font-family: 'Archivo', sans-serif; /* weight 700, not Archivo Black */
```

Drop `Archivo Black` and forced `text-transform: uppercase` on `h1/h2/h3` — those two choices are most of what reads as "poster/brutalist." Use `Archivo` at weight 700, sentence case, normal letter-spacing (or very slightly tightened, `-0.01em`).

### Body

```css
font-family: 'Archivo', 'Space Grotesk', sans-serif;
```

Weights 400–600.

### Mono (data only)

```css
font-family: 'JetBrains Mono', monospace;
```

Keep mono, but scope it strictly to numerals and data labels — ticker values, simulator readouts, eyebrow labels, step pill text. Don't let mono bleed into headings or body copy.

---

## Font Scale

### Hero Heading

* 58px desktop / 34px mobile (`clamp(34px, 5vw, 58px)`)
* Weight: 700
* Sentence case (e.g. "Future wealth starts here.")
* Emphasis word gets a soft accent-tint background pill (`accent-soft` fill, no border) instead of a bordered badge

### Section Heading

* 26–40px (`clamp(26px, 3.4vw, 40px)`)
* Weight: 700, sentence case

### Card / Step Heading

* 15.5–17px
* Weight: 700

### Body Text

* 13.5–17px depending on context
* Weight: 400–600

### Eyebrow / Labels

* 11–11.5px
* Mono, uppercase, letter-spacing 0.12–0.14em
* Soft pill background, no border

---

# 4. Layout System

## Grid

* Content max-width: 1180px
* Side padding: 6vw desktop, 24px mobile
* Section vertical padding: 96px (72px for "tight" sections)

## Section Rhythm

Alternate `paper` and `surface white` backgrounds between sections instead of separating them with a heavy black rule. A 1px hairline (`rgba(10,10,10,0.08)`) is enough of a seam.

---

# 5. Card Design

## Card Style

```css
background: #FFFFFF;
border: 1px solid rgba(10,10,10,0.12);
border-radius: 16px;
box-shadow: 0 8px 24px rgba(0,0,0,0.05);
```

No offset hard shadow, no thick border. This applies to: player cards, risk cards, glossary items, the simulator panel, the stage-explorer frame.

## Card Behavior

Hover:

```css
transform: translateY(-2px);
box-shadow: 0 12px 32px rgba(0,0,0,0.08);
transition: all 0.2s ease;
```

Replaces the brutalist "border turns solid + hard shadow pops in" hover with a gentle lift, consistent with soft-minimalism motion.

---

# 6. Buttons

## Primary CTA

```css
background: #5B9279;
color: #0A0A0A;
border-radius: 12px;
padding: 13px 24px;
font-weight: 700;
border: none;
box-shadow: 0 6px 16px rgba(91,146,121,0.28);
```

### Hover

```css
background: #2F5B45;
color: #FFFFFF;
transform: translateY(-1px);
```

## Secondary Button

```css
background: #FFFFFF;
border: 1px solid rgba(10,10,10,0.16);
color: #0A0A0A;
border-radius: 12px;
```

Drop the `box-shadow: 3px 3px 0 var(--line)` treatment entirely — no button on the page should carry a hard offset shadow, including the nav CTA.

---

# 7. Hero Section Rules

## Layout

### Left Side

* Sentence-case heading with one soft-tinted emphasis word
* Lede paragraph
* Primary + secondary CTA, side by side

### Right Side

* "Browser chrome" style frame around the listing-ceremony image (three status dots + URL bar) — keep this motif, it reads as a screenshot/product-real detail rather than brutalist decoration, but round its corners generously (18px) and drop its border down to the hairline weight

## Hero Copy Style

Tone:

* Explanatory, not hyped
* Plain language over jargon, with jargon defined inline or in the glossary

---

# 8. Data Visualization

## Ticker Tape

Keep the scrolling market ticker at the top, but soften it:

```css
background: #16243D; /* navy, not pure black */
color: #CFD1C6;
```

Up values in a soft green (`#8FD9AD`), down values in a soft red (`#FF9B9B`) — unchanged, these already read calmly.

## Simulator Bars & Chart Fills

```css
stroke: #5B9279;
fill: rgba(91,146,121,0.12);
```

Bars use rounded tops (`border-radius: 3px 3px 0 0`), soft color transitions on input — no change needed here, this part of the source file was already calm.

## Stepper Rail

Keep the horizontal connecting line and numbered circles, but:

* Circle border: hairline, not 2px solid black
* Active state: soft `box-shadow: 0 4px 12px rgba(91,146,121,0.25)` instead of the hard `3px 3px 0` shadow

---

# 9. Iconography

## Recommended Libraries

* Lucide Icons
* Phosphor Icons

Replace the emoji icons used in the players grid (🏦 🏛️ 🧮 etc.) with a consistent line-icon set at 1.75px stroke weight for a more premium, less playful-poster feel — emoji icons read casual/meme-adjacent, which works against the "trustworthy" goal.

---

# 10. Illustration / Photography Style

The six stage images (startup → growing company → needs capital → IPO opens → listing → shareholders) and the listing-ceremony hero photo should stay photographic/semi-real. Frame them in a rounded card (18px radius, hairline border, soft shadow) rather than the thick 4px bordered "browser chrome" box.

---

# 11. Motion Design

## Transition Timing

```css
transition: all 0.25s ease;
```

## Recommended Animations

* Cards: gentle lift on hover (2px, not a shadow "pop")
* Reveal-on-scroll: fade + 20px translateY, unchanged from source
* Stepper: sequential fade-in stagger, unchanged
* Stage explorer: crossfade between images, unchanged
* Ticker: continuous linear scroll, unchanged
* Sliders (simulator): soft accent-colored thumb, subtle shadow, no hard offset

---

# 12. Input Components

## Range Sliders

```css
height: 6px;
background: #FFFFFF;
border: 1px solid rgba(10,10,10,0.16);
border-radius: 4px;
```

### Thumb

```css
width: 18px;
height: 18px;
border-radius: 50%;
background: #5B9279;
border: 2px solid #FFFFFF;
box-shadow: 0 2px 6px rgba(0,0,0,0.25);
```

Drop the `2px solid var(--ink)` outline + hard `2px 2px 0` shadow on the thumb — a soft blurred shadow with a white ring reads premium instead of sticker-like.

## Accordion (Glossary)

```css
border: 1px solid rgba(10,10,10,0.12);
border-radius: 14px;
background: #FFFFFF;
```

Plus icon: circular soft-tint fill (`accent-soft`), no border ring.

---

# 13. Dashboard / Panel Design Rules (Simulator Result Panel)

The one intentionally dark panel (`--navy` background) stays — it's a nice contrast beat, not a brutalist device. Keep it, but:

* Round its corners to 18px
* Drop its `4px` black border to a hairline `1px solid rgba(255,255,255,0.12)`
* Keep the soft internal shadow-free bar chart

---

# 14. Mobile Responsiveness

* Stack hero vertically
* Stepper collapses to a vertical rail with a thin left border in accent color for the active step (already the source behavior — keep it, just switch the border from thick black to a 2px accent-colored hairline)
* Full-width cards
* 24px minimum side padding

---

# 15. Tailwind Mapping

```js
colors: {
  paper: "#F4F1E8",
  surface: "#FFFFFF",
  ink: "#0A0A0A",
  inkSoft: "#33352F",
  inkDim: "#6B6D63",
  accent: "#5B9279",
  accentDeep: "#2F5B45",
  accentSoft: "#CFE8D4",
  rise: "#2F5B45",
  fall: "#C23B3B",
  gold: "#9C6B15",
  goldSoft: "#FAF3D9",
  navy: "#16243D",
  hairline: "rgba(10,10,10,0.12)"
}
```

```js
borderRadius: {
  lg: "12px",
  xl: "16px",
  "2xl": "18px"
}
```

```js
boxShadow: {
  soft: "0 8px 24px rgba(0,0,0,0.05)",
  softHover: "0 12px 32px rgba(0,0,0,0.08)",
  cta: "0 6px 16px rgba(91,146,121,0.28)"
}
```

No `shadow-sm / shadow-md / shadow-lg` hard-offset tokens (`3px 3px 0`, `5px 5px 0`, `8px 8px 0`) — these are removed entirely.

---

# 16. Recommended Tech Stack

## Frontend

* Vanilla HTML/CSS/JS (matches current build) or Next.js + React if componentized later
* Framer Motion, if migrated to React, for the reveal/stagger animations already scripted by hand

## Charts / Data

* Native SVG/canvas bars (current approach) or Recharts if migrated

## Icons

* Lucide

---

# 17. Component Inventory (from the actual build)

For reference, the real page is built from these sections — keep this structure, only restyle per the rules above:

1. **Ticker tape** — fixed top, scrolling market strip
2. **Top nav** — logo mark, in-page links, "Try simulator" CTA
3. **Hero** — heading + lede + dual CTA, browser-chrome-framed listing photo
4. **Journey stepper** — 6-step horizontal rail (private company → bankers → roadshow → IPO launches → allotment → listing)
5. **Why explorer** — 6-stage clickable/autoplaying image sequence with captions ("startup" through "investors become shareholders")
6. **Players grid** — 6 cards (Merchant Banker, SEBI, Registrar, Anchor Investors, Underwriters, Retail Investors)
7. **Allotment simulator** — 3 sliders (issue size, demand, sentiment) driving a live odds/pop estimate and bar chart, dark navy result panel
8. **Risk cards** — 4-card grid on what an IPO doesn't promise
9. **Glossary accordion** — DRHP, price band, lot size, GMP, ASBA
10. **Footer CTA** — dark navy closing panel with primary button and fine print

---

# 18. UX Principles

* Clarity over decoration
* Every data point (ticker, simulator output, ratios) gets a mono numeral treatment for scannability, but never for whole sentences
* Plain-language definitions for jargon (DRHP, GMP, ASBA) live in-page in the glossary
* Minimal friction between "curious" and "try the simulator"
* Strong section-to-section hierarchy via the eyebrow + heading pattern, not via heavy dividers

---

# 19. Accessibility

* WCAG-compliant contrast (near-black ink on paper background comfortably clears AA)
* Visible focus states: `outline: 2px solid #0A0A0A; outline-offset: 3px;` — keep this, it's a genuinely useful hairline-consistent focus ring, not a brutalist artifact
* Keyboard navigability for the accordion, stepper, and stage explorer
* `prefers-reduced-motion` support — disable the ticker scroll and all reveal/stagger transitions, matching the source build's existing media query

---

# 20. Final Visual Tone

The final UI should feel like:

> "A calm, editorial explainer that makes the IPO process legible — precise where it shows numbers, warm and unhurried everywhere else, with no hard edges or poster-shadow gimmicks left in."
