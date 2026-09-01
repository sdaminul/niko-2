/* ==========================================================================
   HaatBazar — Tailwind Play CDN configuration (shared by every page)
   Primary brand color: #ff2525
   ========================================================================== */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f1',
          100: '#ffdfdf',
          200: '#ffc5c5',
          300: '#ff9d9d',
          400: '#ff6363',
          500: '#ff2525',
          600: '#f50b0b',
          700: '#cf0505',
          800: '#ab0b0b',
          900: '#8d1010',
          950: '#4e0202'
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d8dce4',
          300: '#b4bbc9',
          400: '#8792a6',
          500: '#66728a',
          600: '#505b71',
          700: '#41495c',
          800: '#2b3242',
          900: '#151b2b',
          950: '#0b1020'
        },
        service: {
          50: '#eefbf8',
          100: '#d3f5ee',
          200: '#a9ebdf',
          300: '#71dbcc',
          400: '#3cc3b3',
          500: '#12a594',
          600: '#0b8479',
          700: '#0c6a62',
          800: '#0d5450',
          900: '#0d4643',
          950: '#022a29'
        },
        gold: {
          50: '#fffaeb',
          100: '#fff1c6',
          200: '#ffe089',
          300: '#ffc94b',
          400: '#ffb020',
          500: '#f98e07',
          600: '#dd6702',
          700: '#b74806',
          800: '#94370c',
          900: '#7a2e0d'
        },
        cream: '#fdf6ec',
        canvas: '#f4f5f8'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      fontSize: {
        '2xs': ['0.6875rem', '1rem']
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,.04), 0 8px 24px -14px rgba(16,24,40,.20)',
        card: '0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.04)',
        pop: '0 18px 48px -16px rgba(16,24,40,.28)',
        brand: '0 10px 30px -12px rgba(255,37,37,.55)',
        inset: 'inset 0 1px 0 rgba(255,255,255,.06)'
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem'
      },
      maxWidth: {
        shell: '1320px'
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(10px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'slide-in': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: .45 } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } }
      },
      animation: {
        'fade-up': 'fade-up .45s cubic-bezier(.21,1,.21,1) both',
        'fade-in': 'fade-in .35s ease both',
        'slide-in': 'slide-in .3s cubic-bezier(.21,1,.21,1) both',
        marquee: 'marquee 28s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite'
      }
    }
  }
};
