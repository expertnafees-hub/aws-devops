/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design System Elevation & Canvas
        obsidian: '#070A0F',
        panel: '#0D1117',
        surface: '#10141a',
        'surface-dim': '#10141a',
        'surface-bright': '#353940',
        'surface-container-lowest': '#0a0e14',
        'surface-container-low': '#181c22',
        'surface-container': '#1c2026',
        'surface-container-high': '#262a31',
        'surface-container-highest': '#31353c',
        'surface-variant': '#31353c',
        'surface-tint': '#ffb86f',
        'on-surface': '#dfe2eb',
        'on-surface-variant': '#dbc2ad',
        'inverse-surface': '#dfe2eb',
        'inverse-on-surface': '#2d3137',

        // Accents & Semantics
        primary: '#ffc082',
        'primary-container': '#ff9900',
        'on-primary': '#4a2800',
        'on-primary-container': '#653a00',
        'primary-fixed': '#ffdcbd',
        'primary-fixed-dim': '#ffb86f',
        
        secondary: '#5de6ff',
        'secondary-container': '#00cbe6',
        'on-secondary': '#00363e',
        'on-secondary-container': '#00515d',
        'secondary-fixed': '#a2eeff',
        'secondary-fixed-dim': '#2fd9f4',

        tertiary: '#6de676',
        'tertiary-container': '#50c95e',
        'on-tertiary': '#00390d',
        'on-tertiary-container': '#005016',
        'tertiary-fixed': '#83fc89',
        'tertiary-fixed-dim': '#67df70',

        error: '#ffb4ab',
        'error-container': '#93000a',
        'on-error': '#690005',
        'on-error-container': '#ffdad6',

        outline: '#a38d7a',
        'outline-variant': '#554434',

        // Aliases from code.html
        cardBorder: '#21262D',
        subtleBorder: '#30363D',
        awsOrange: '#FF9900',
        awsCyan: '#22D3EE',
        telemetryGreen: '#3FB950',
        terminalBg: '#090D13'
      },
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
        display: ['Geist', 'sans-serif'],
        'display-mobile': ['Geist', 'sans-serif'],
        'headline-lg': ['Geist', 'sans-serif'],
        'headline-md': ['Geist', 'sans-serif'],
        'headline-sm': ['Geist', 'sans-serif'],
        'body-lg': ['Geist', 'sans-serif'],
        'body-md': ['Geist', 'sans-serif'],
        'body-sm': ['Geist', 'sans-serif'],
        'code-lg': ['JetBrains Mono', 'monospace'],
        'code-md': ['JetBrains Mono', 'monospace'],
        'code-sm': ['JetBrains Mono', 'monospace'],
        badge: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.375rem',
        xl: '0.5rem',
        '2xl': '0.75rem',
        full: '9999px',
      },
      spacing: {
        'grid-margin-desktop': '48px',
        'grid-margin-tablet': '24px',
        'grid-margin-mobile': '16px',
        'gutter-desktop': '24px',
        'gutter-tablet': '16px',
        'gutter-mobile': '12px',
        'section-gap': '96px',
        'card-padding': '24px',
        'card-padding-compact': '16px',
      },
      animation: {
        'terminal-blink': 'blink 1s step-start infinite',
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow-dash': 'flow 2s linear infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
        flow: {
          to: { strokeDashoffset: '-20' },
        }
      }
    },
  },
  plugins: [],
};
