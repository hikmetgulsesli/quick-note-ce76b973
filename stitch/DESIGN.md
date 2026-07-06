---
name: Efficient Utility
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 24px
---

## Brand & Style
The design system is anchored in **Professional Minimalism**. It prioritizes task-completion over aesthetic flourishes, aiming for a "dense but calm" experience. The brand personality is reliable, fast, and transparent, catering to users who require an unobtrusive tool for high-velocity information capture.

The visual style blends **Corporate Modern** efficiency with **Low-Contrast Outlines**. Instead of heavy shadows or decorative gradients, the system relies on structural grid alignment, crisp borders, and purposeful whitespace to define hierarchy. The emotional response is one of clarity and focus, stripping away cognitive load to reveal a high-density operational environment.

## Colors
The palette is strictly functional. The foundation is built on a neutral base of whites and soft grays to create a clean canvas for content.

- **Primary:** A productive Indigo (#2563EB) is reserved exclusively for primary actions, active focus states, and essential highlights.
- **Neutral/Surface:** We use a tiered gray scale to differentiate background layers from interactive surfaces without creating visual noise.
- **Borders:** A consistent, low-contrast slate (#E2E8F0) provides structural definition for cards and inputs.
- **Status:** Standardized semantic colors (Success/Green, Warning/Amber, Error/Red) should be used sparingly and only to communicate system state.

## Typography
The typographic system is optimized for data density and legibility.

- **Hanken Grotesk** is used for headlines to provide a modern, sharp professional edge.
- **Inter** handles all body copy and primary UI text, chosen for its exceptional clarity in dense list views and forms.
- **JetBrains Mono** is utilized for metadata, labels, and secondary insights to distinguish system-generated data from user content.

To maintain a compact layout, line heights are kept tight but readable. Mobile scaling is minimal, as the base sizes are already optimized for utility.

## Layout & Spacing
This design system utilizes a **Fluid Grid** with a strict 4px baseline rhythm to ensure alignment in high-density views.

- **Desktop:** 12-column grid with 16px gutters. Side panels (Insights/Navigation) are fixed-width (240px - 320px) while the primary editor or list view remains fluid.
- **Tablet:** 8-column grid with 16px margins.
- **Mobile:** 4-column grid with 16px margins.

Spacing should prioritize vertical rhythm. Use `md` (16px) for major component grouping and `sm` (8px) for internal element spacing to maintain the "dense but calm" aesthetic.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Low-Contrast Outlines** rather than dramatic shadows.

- **Level 0 (Background):** Neutral Gray (#F8FAFC). Used for the application canvas.
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF) with a 1px solid border (#E2E8F0).
- **Level 2 (Active/Floating):** Pure White with a subtle, tight shadow (0px 2px 4px rgba(0,0,0,0.05)). Used for dropdowns, modals, or active list items.

Transitions between levels should be immediate or use a very fast (150ms) linear easing to maintain the feeling of speed and responsiveness.

## Shapes
The shape language is "Soft" (0.25rem / 4px). This subtle rounding maintains a professional, systematic look while preventing the interface from feeling sharp or aggressive.

- **Standard Elements:** 4px radius (Inputs, Buttons, Cards).
- **Large Elements:** 8px radius (Modals, Large Container Panels).
- **Interactive Indicators:** 2px radius or sharp for very small indicators (e.g., focus rings).

## Components

### Buttons
- **Primary:** Solid Indigo background, white text. No gradient. 4px radius.
- **Secondary:** White background, 1px Gray-200 border, Slate-900 text.
- **Ghost:** No background/border, Primary Indigo text. Used for secondary actions in dense lists.

### Input Fields
- **Default:** White background, 1px Gray-200 border. 14px text.
- **Focus:** 1px Indigo border with a soft 2px Indigo outer glow (20% opacity).
- **Labels:** Use JetBrains Mono (label-md) in Slate-500, placed 4px above the input.

### Cards
- Minimalist containers with 1px Gray-200 borders. No shadow in default state.
- Internal padding should be `md` (16px).

### List Items
- Compact height (min-height: 48px).
- Hover state: Slight background tint (#F1F5F9).
- Active state: 2px Indigo vertical bar on the leading edge.

### Insights Panel
- Uses a slightly darker neutral background (#F1F5F9) to distinguish it from the main content area.
- Information is presented using `label-sm` and `body-sm` typography for maximum data density.