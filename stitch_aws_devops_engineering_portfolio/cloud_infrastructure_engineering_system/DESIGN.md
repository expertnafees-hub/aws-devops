---
name: Cloud Infrastructure Engineering System
colors:
  surface: '#10141a'
  surface-dim: '#10141a'
  surface-bright: '#353940'
  surface-container-lowest: '#0a0e14'
  surface-container-low: '#181c22'
  surface-container: '#1c2026'
  surface-container-high: '#262a31'
  surface-container-highest: '#31353c'
  on-surface: '#dfe2eb'
  on-surface-variant: '#dbc2ad'
  inverse-surface: '#dfe2eb'
  inverse-on-surface: '#2d3137'
  outline: '#a38d7a'
  outline-variant: '#554434'
  surface-tint: '#ffb86f'
  primary: '#ffc082'
  on-primary: '#4a2800'
  primary-container: '#ff9900'
  on-primary-container: '#653a00'
  inverse-primary: '#8a5100'
  secondary: '#5de6ff'
  on-secondary: '#00363e'
  secondary-container: '#00cbe6'
  on-secondary-container: '#00515d'
  tertiary: '#6de676'
  on-tertiary: '#00390d'
  tertiary-container: '#50c95e'
  on-tertiary-container: '#005016'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcbd'
  primary-fixed-dim: '#ffb86f'
  on-primary-fixed: '#2c1600'
  on-primary-fixed-variant: '#693c00'
  secondary-fixed: '#a2eeff'
  secondary-fixed-dim: '#2fd9f4'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5a'
  tertiary-fixed: '#83fc89'
  tertiary-fixed-dim: '#67df70'
  on-tertiary-fixed: '#002105'
  on-tertiary-fixed-variant: '#005317'
  background: '#10141a'
  on-background: '#dfe2eb'
  surface-variant: '#31353c'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.01em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: -0.01em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  badge:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-margin-desktop: 48px
  grid-margin-tablet: 24px
  grid-margin-mobile: 16px
  gutter-desktop: 24px
  gutter-tablet: 16px
  gutter-mobile: 12px
  section-gap: 96px
  card-padding: 24px
  card-padding-compact: 16px
---

## Brand & Style
The design system embodies a disciplined, precise, and high-performance technical presence built for an AWS DevOps & Infrastructure Architect. The aesthetic synthesizes the utility of developer tools (GitHub Dark, Linear, Vercel) with the operational gravity of the AWS Cloud Console.

### Core Tenets
- **Precision Over Decoration:** Visual hierarchy is communicated via clean structural lines, micro-borders, and strict typographic hierarchy rather than excessive blurs or saturated gradients.
- **Instrument-Grade Interface:** The UI feels like a production telemetry dashboard and an engineering command center—dense, informative, legible, and unhurried.
- **Disciplined Accenting:** Colors indicate state, latency, architecture health, and deliberate call-to-action checkpoints. Primary amber (#FF9900) is deployed strictly as an intentional signal, never as general background filler.
- **Developer Utilitarianism:** Monospaced data displays, clear commit/hash callouts, infrastructure topology nodes, and status indicators ground the portfolio in real-world platform reliability.

## Colors
The palette is rooted in deep obsidian and charcoal tones with high-contrast neutral text and surgical semantic accents.

### Color Tiers
- **Canvas Base (`#070A0F`):** Deepest background layer used for the base viewport and global page container.
- **Surface Elevation 1 (`#0D1117`):** Canonical container layer for primary panels, code blocks, cards, and section divisions.
- **Surface Elevation 2 (`#111827`):** Raised interactive cards, dropdown menus, table headers, and modal overlays.
- **Surface Elevation 3 (`#1F2937`):** Hover states, active tabs, and tertiary utility overlays.

### Borders & Dividers
- **Hairline Border (`#21262D`):** Default structural line for card frames, horizontal rules, and grid cell dividers.
- **Muted Border (`#30363D`):** Active or hovered container borders.

### Typography & Content
- **Text High-Contrast (`#F0F6FC`):** Headings, active values, and primary metrics.
- **Text Secondary (`#8B949E`):** Body copy, metadata labels, commit hashes, and subheaders.
- **Text Tertiary (`#484F58`):** Inactive icons, line numbers, and disabled states.

### Functional Accents
- **Primary Accent (`#FF9900`):** AWS Cloud signature amber. Reserved for deployment CTAs, active pipeline nodes, focused inputs, and critical metric highlights.
- **Technical Secondary (`#22D3EE`):** Telemetry, VPC/Networking indicators, CloudFormation/Terraform resource tags, and code syntax highlights.
- **Operational Green (`#3FB950`):** Production health, zero-downtime signals, passing CI/CD checks, and uptime metrics.
- **Operational Amber (`#F59E0B`):** Warn states, resource throttling, and queued builds.
- **Operational Red (`#F85149`):** Error thresholds, failed jobs, and critical incident logs.

## Typography
Typographic balance is achieved by pairing `Geist` for rapid, low-friction readability with `JetBrains Mono` for infrastructure metrics, CLI snippets, and system metadata.

- **Headings & Body:** Handled exclusively by `Geist`. Character spacing is deliberately tightened at larger scales (`-0.03em`) to mimic contemporary engineering tools like Linear.
- **Telemetry, Code & Chips:** Handled by `JetBrains Mono`. Used for architectural resource identifiers (e.g., `i-0a8b92`, `us-east-1`, `vpc-prod-01`), shell prompts, runtime figures, and tag badges.
- **Numbers and Metrics:** Any quantitative stat (e.g., "99.99% Availability", "140ms Latency") utilizes tabular lining numerals to ensure perfect alignment across vertical cards and tables.

## Layout & Spacing
The layout relies on a disciplined 12-column responsive fluid grid bounded by a maximum content container of `1280px`.

### Grid System
- **Desktop (1024px+):** 12 columns, 24px gutters, 48px outer page margins. Section vertical spacing defaults to 96px for deliberate, measured pacing.
- **Tablet (768px – 1023px):** 8 columns, 16px gutters, 24px margins. Two-column card layouts reflow to single or stacked double columns.
- **Mobile (320px – 767px):** 4 columns, 12px gutters, 16px margins. Multi-column telemetry grids collapse into vertically stacked metric blocks.

### Layout Philosophy
- Content relies on an 8-point spatial cadence (8px, 16px, 24px, 32px, 48px, 64px, 96px).
- Internal element spacing (buttons, inputs, badge tags) leverages 4px micro-increments (4px, 8px, 12px).
- Code blocks, architecture diagrams, and pipeline sequences occupy full card spans (`col-span-12` or `col-span-8`) to maintain terminal code line length without forced wraps.

## Elevation & Depth
Elevation is constructed through subtle tonal transitions and razor-thin hairline borders rather than heavy blur shadows, reinforcing an uncluttered engineering aesthetic.

### Surface Tiers
- **Level 0 (Base Canvas):** `#070A0F` flat ground.
- **Level 1 (Card & Module Container):** `#0D1117` with a 1px solid border of `#21262D`.
- **Level 2 (Dropdowns, Popovers & Hover States):** `#111827` with a 1px solid border of `#30363D`.
- **Level 3 (Modals & CLI Overlays):** `#161B22` with a 1px solid border of `#30363D` and an ultra-subtle dark drop shadow: `0 16px 32px -8px rgba(0, 0, 0, 0.6)`.

### Accentuated Depth
- Active infrastructure cards or focused terminals feature an inner or localized edge highlight using a 1px top border tinted with primary amber (`#FF9900`) at 40% opacity or cyan (`#22D3EE`) at 30% opacity.
- Drop shadows are strictly achromatic; no colored ambient glows, preserving an uncluttered, mission-critical tone.

## Shapes
The design system adopts a restrained **Soft** corner radius (`roundedness: 1`).

- **Default UI Components:** 4px (`0.25rem`) border radius on badges, inputs, buttons, and inline code tags.
- **Cards & Terminal Windows:** 6px to 8px (`0.375rem` to `0.5rem`) on larger containers to maintain technical sharpness without harsh 90-degree points.
- **Pills/Circles:** Strictly reserved for status dot indicators (e.g., a 6px green ping node) and avatar masks. Buttons and inputs never use full rounded pill geometry.

## Components

### Buttons
- **Primary Action (Deployment/Contact):** Background `#FF9900`, text `#070A0F` (bold, high contrast), border none, radius 4px. Hover state: `#E68A00`. Active state: scale 0.98.
- **Secondary (Technical View/Source):** Background `#111827`, text `#F0F6FC`, border 1px solid `#21262D`, radius 4px. Hover: border `#30363D`, background `#161B22`.
- **Ghost/Icon Button:** Background transparent, text `#8B949E`, radius 4px. Hover: background `#111827`, text `#F0F6FC`.

### Chips & Badges
- **Status Indicator Badges:** Background `#0D1117`, border 1px solid `#21262D`, text `#8B949E`, typography `badge`. Features a 6px pulsing or static circular beacon (e.g., `#3FB950` for Live/Prod, `#22D3EE` for AWS CDK).
- **Technology/Tooling Chips (Docker, Terraform, Kubernetes):** JetBrains Mono 11px, height 22px, padding 2px 8px, surface `#111827`, border `#21262D`.

### Terminal & Code Blocks
- **Container:** Background `#070A0F`, border 1px solid `#21262D`, border-radius 6px.
- **Header Bar:** Height 36px, background `#0D1117`, border-bottom 1px solid `#21262D`, monospace file path/tab label in `#8B949E`, action icon for copy-to-clipboard on the right.
- **Syntax Display:** Line numbers in `#484F58`, commands in `#F0F6FC`, flags/parameters in `#22D3EE`, strings/outputs in `#3FB950`.

### Cards & Architecture Modules
- **Standard Card:** Background `#0D1117`, border 1px solid `#21262D`, padding 24px, border-radius 6px.
- **Interactive Metric Card:** Features a label in `body-sm` (`#8B949E`), large stat in `headline-md` (`#F0F6FC`), and a delta badge with green/amber signifier. Hovering triggers border `#30363D`.

### Form Inputs & Filters
- **Text Fields:** Background `#070A0F`, border 1px solid `#21262D`, text `#F0F6FC`, font family `Geist` (or `JetBrains Mono` for command inputs). Focus state: border `#FF9900` with zero outer fuzzy halo.
- **Checkboxes & Radios:** Sharp square/circle, 14px size, surface `#070A0F`, border `#30363D`. Checked: `#FF9900` fill with `#070A0F` check glyph.

### Pipeline Timeline & Telemetry Nodes
- **Node Steps:** Connected via 1px dashed or solid `#21262D` guide lines.
- **State Signifiers:** Success nodes marked with `#3FB950`, running jobs with `#FF9900` spinning/pulsing perimeter ring, queued jobs in `#484F58`.