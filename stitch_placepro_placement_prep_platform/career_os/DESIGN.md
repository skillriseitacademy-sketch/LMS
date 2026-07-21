---
name: Career OS
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#960014'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc1d25'
  on-tertiary-container: '#ffd0cc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  sidebar-width: 280px
  container-max: 1280px
---

## Brand & Style
The design system is built around the persona of a "Career OS"—a reliable, high-performance environment for students to transition into professional life. It balances the urgency of placement preparation with the confidence of a premium SaaS product.

The visual style is **Corporate Modern with a Gamified Edge**. It utilizes clean, systematic layouts and generous whitespace to reduce cognitive load during intense study sessions. To maintain student engagement, it incorporates vibrant accent pops and tactile feedback elements, ensuring the interface feels motivating rather than intimidating.

## Colors
The palette is dominated by **Confident Indigo**, a color that signals institutional trust and technological precision. 

- **Primary (Indigo):** Used for main actions, active states, and branding.
- **Secondary (Amber):** Reserved for high-engagement "reward" moments: XP progress bars, streak counters, and achievement badges.
- **Tertiary (Coral/Red):** Used for urgent deadlines and error states.
- **Neutrals:** A slate-based grayscale. Backgrounds use a very soft `Slate-50` (#F8FAFC) to reduce glare, while primary text uses `Slate-900` (#0F172A) for maximum legibility.

## Typography
This design system uses a dual-font strategy to separate intent. 

**Manrope** is used for headings to provide a modern, slightly tech-forward personality with its geometric curves. **Inter** is the workhorse for all body copy and UI elements, chosen for its exceptional legibility in data-dense dashboard views. For technical metadata, code snippets, or placement "stats," **JetBrains Mono** provides a precise, developer-centric feel.

Always prioritize vertical rhythm; use a 4px baseline grid to ensure consistent line-height spacing across all text blocks.

## Layout & Spacing
The system employs a **Fluid Grid** logic within a fixed-width container for desktop.

- **App Shell:** A persistent 280px left sidebar handles primary navigation. Content lives in a central fluid area with a max-width of 1280px.
- **Admin Shell:** Uses a collapsed or condensed sidebar (80px) to maximize horizontal space for complex tables and data visualizations.
- **Mobile:** Margins shrink to 16px (`md`). Navigation moves to a bottom bar for thumb-friendly "Career OS" access on the go.
- **Rhythm:** All margins and paddings must be multiples of 4px. Use `lg` (24px) for card internal padding and `xl` (32px) for section vertical spacing.

## Elevation & Depth
Depth is created through **Tonal Layering** supplemented by subtle ambient shadows. 

1. **Surface Level (Floor):** Background color (`#F8FAFC`).
2. **Card Level:** Pure white (`#FFFFFF`) with a very soft, diffused shadow: `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`.
3. **Overlay Level:** Modals and dropdowns use a slightly deeper shadow and a thin `1px` border in `Slate-200` to ensure separation from white cards.

Avoid heavy blacks in shadows; use tinted shadows (indigo-tinted) to maintain the clean SaaS aesthetic.

## Shapes
The shape language is consistently **Rounded**. 

The standard radius is **0.5rem (8px)** for small elements like inputs and buttons. Main content cards and dashboard widgets utilize **1rem (16px)** to soften the "data-heavy" nature of the platform. Interactive "pills" for status tags (e.g., "In Progress") should use the fully rounded (`9999px`) style.

## Components
- **Buttons:** Primary buttons are Indigo with white text, using a subtle hover transition to a deeper indigo. "Action" buttons (like "Start Test") use a slight scale-up transform on hover.
- **Cards:** White background, 16px radius, subtle shadow. For "Trackers" (e.g., job applications), use a left-edge color border (Indigo for Active, Amber for Pending).
- **Input Fields:** 1px Slate-200 border. On focus, transition to a 2px Indigo border with a faint Indigo glow.
- **Chips/Badges:** Use "Secondary" (Amber) for gamified stats like XP or Streaks. Use Indigo-light (10% opacity) for category tags like "Data Structures."
- **Progress Bars:** Thin, 8px height, rounded ends. Use Indigo for curriculum progress and Amber for personal goal tracking.
- **Icons:** Use Lucide/Heroicons set at 20px or 24px with a 1.5px or 2px stroke weight. Icons should always be monochrome (Slate-500) unless they represent an active state.