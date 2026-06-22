# Fiscal Forum Inspired Design System

Version: 1.0
Style: Modern Fintech / Wealth-Tech / Soft Minimalism

---

# 1. Core Design Philosophy

This theme combines:

* Clean fintech minimalism
* Soft gradients
* Rounded cards
* Calm green investment psychology
* Strong typography hierarchy
* Spacious layouts
* Data-driven storytelling
* Trust-oriented UX

The interface should feel:

* Premium
* Calm
* Intelligent
* Financially trustworthy
* Interactive but not noisy

### Visual References

* CRED
* Zerodha
* Groww
* Stripe Dashboard
* Apple Finance-style spacing
* Linear.app cleanliness

---

# 2. Color Palette

## Primary Brand Colors

### Emerald Primary

```txt
#1FA463
```

Used for:

* CTAs
* Growth graphs
* Positive metrics
* Hover accents
* Active states

---

### Dark Emerald

```txt
#15824D
```

Used for:

* CTA hover
* Gradient depth
* Important financial indicators

---

### Soft Mint Background

```txt
#F4FBF7
```

Used for:

* Hero glow
* Section highlights
* Card tinting

---

### Neutral Background

```txt
#FFFFFF
```

Main page background.

---

### Surface Gray

```txt
#F8F9FA
```

Used for:

* Cards
* Secondary sections
* Inputs
* Hover surfaces

---

### Text Primary

```txt
#111111
```

Main headings.

---

### Text Secondary

```txt
#5F6368
```

Descriptions and muted labels.

---

### Border Color

```txt
#E8ECEF
```

Used for:

* Card borders
* Dividers
* Input outlines

---

### Danger Accent

```txt
#FF5A5A
```

Used for:

* Delayed investing scenario
* Negative outcomes
* Warnings

---

# 3. Typography

## Font Recommendations

### Primary Font

Preferred:

```css
font-family: 'Inter', sans-serif;
```

Alternatives:

* SF Pro Display
* Manrope

---

## Font Scale

### Hero Heading

* 72px desktop
* 48px tablet
* 36px mobile
* Weight: 800
* Tight line-height

---

### Section Heading

* 32px
* Weight: 700

---

### Card Metric

* 28px
* Weight: 700

---

### Body Text

* 16px
* Weight: 400–500

---

### Labels

* 12–14px
* Uppercase optional
* Letter spacing: 0.5px

---

# 4. Layout System

## Grid

Use:

* 12-column grid
* Max width: 1440px
* Content width: 1280px
* Side padding: 32px desktop

---

## Spacing Scale

```txt
4px
8px
12px
16px
24px
32px
48px
64px
96px
```

Prefer generous whitespace.

---

# 5. Card Design

## Card Style

```css
background: white;
border: 1px solid #E8ECEF;
border-radius: 24px;
box-shadow: 0 8px 30px rgba(0,0,0,0.04);
```

---

## Card Behavior

Hover:

```css
transform: translateY(-4px);
transition: all 0.2s ease;
```

Effects:

* Slight lift
* Softer shadow expansion
* Smooth interaction feel

---

# 6. Buttons

## Primary CTA

```css
background: linear-gradient(135deg, #1FA463, #15824D);
color: white;
border-radius: 14px;
padding: 14px 28px;
font-weight: 600;
```

### Hover

```css
transform: scale(1.02);
filter: brightness(0.95);
```

---

## Secondary Button

```css
background: white;
border: 1px solid #E8ECEF;
color: #111111;
```

---

# 7. Hero Section Rules

## Layout

### Left Side

* Emotional messaging
* Strong typography
* Quick metrics

### Right Side

* Interactive graph
* Investment simulation
* Financial projections

---

## Hero Copy Style

Tone:

* Motivational
* Data-backed
* Future-oriented

### Example

> “Your Future Rewards Early Moves.”

---

# 8. Graph & Data Visualization

## Chart Style

* Smooth bezier curves
* Soft shadows
* Gradient fills
* Minimal axis clutter
* Thin gridlines

---

## Positive Graph

```css
stroke: #1FA463;
fill: rgba(31,164,99,0.12);
```

---

## Delayed Graph

```css
stroke: #9A9A9A;
```

---

# 9. Iconography

## Recommended Libraries

* Lucide Icons
* Phosphor Icons
* Heroicons

---

## Style Rules

* Rounded
* Minimal
* Thin stroke

Preferred stroke width:

```txt
1.75px
```

---

# 10. Illustration Style

Illustrations should be:

* Semi-flat
* Friendly
* Modern
* Slightly cartoonish
* Soft shadows
* Warm emotion

Avoid:

* Hyper realism
* Corporate stock vectors

---

# 11. Motion Design

## Transition Timing

```css
transition: all 0.25s ease;
```

---

## Recommended Animations

### Cards

* Lift on hover

### Graphs

* Progressive line draw

### Numbers

* Count-up animation

### Buttons

* Subtle glow pulse

---

# 12. Input Components

## Sliders

Large rounded slider handles.

### Active Track

```css
background: #1FA463;
```

---

## Form Inputs

```css
border-radius: 14px;
height: 52px;
padding: 0 16px;
border: 1px solid #E8ECEF;
```

### Focus State

```css
border-color: #1FA463;
box-shadow: 0 0 0 4px rgba(31,164,99,0.12);
```

---

# 13. Dashboard Design Rules

Dashboard should emphasize:

* Financial growth
* Positive reinforcement
* Simplicity
* Low cognitive load

Use:

* Metric cards
* Progress indicators
* Visual comparisons
* Wealth projections

Avoid:

* Dense tables
* Too many colors
* Heavy borders

---

# 14. Mobile Responsiveness

## Mobile Rules

* Stack hero vertically
* Full-width cards
* Reduce chart complexity
* Keep CTA visible
* 16px minimum padding

---

# 15. Tailwind Mapping

## Suggested Tailwind Tokens

### Colors

```js
colors: {
  primary: "#1FA463",
  primaryDark: "#15824D",
  surface: "#F8F9FA",
  border: "#E8ECEF",
  danger: "#FF5A5A"
}
```

---

### Border Radius

```js
borderRadius: {
  xl: "1rem",
  "2xl": "1.5rem",
  "3xl": "2rem"
}
```

---

### Shadows

```js
boxShadow: {
  soft: "0 8px 30px rgba(0,0,0,0.04)"
}
```

---

# 16. Recommended Tech Stack

## Frontend

* Next.js
* React
* TailwindCSS
* Framer Motion

---

## Charts

* Recharts
* Tremor
* Visx

---

## Icons

* Lucide React

---

# 17. MCP Stitch Optimization Notes

To make this design system work effectively with MCP Stitch:

## Recommended Additions

### Add These MCPs

* Tailwind MCP
* Framer Motion MCP
* Shadcn/UI MCP
* Recharts MCP
* Lucide MCP

---

## Recommended Component Categories

Generate reusable:

* Dashboard cards
* KPI widgets
* Wealth projection modules
* Investment sliders
* Financial comparison charts
* CTA sections
* Hero layouts
* Testimonial cards
* Pricing blocks

---

## Suggested Design Tokens Structure

```txt
tokens/
 ├── colors.ts
 ├── spacing.ts
 ├── typography.ts
 ├── shadows.ts
 ├── radius.ts
```

---

# 18. UX Principles

Always prioritize:

* Clarity over decoration
* Financial trust signals
* Emotional reassurance
* Minimal friction
* Fast readability
* Strong hierarchy

---

# 19. Accessibility

Ensure:

* WCAG-compliant contrast
* Visible focus states
* Keyboard navigability
* Proper semantic structure
* Reduced motion support

---

# 20. Final Visual Tone

The final UI should feel like:

> “A premium AI-powered wealth platform designed for intelligent long-term investors.”
