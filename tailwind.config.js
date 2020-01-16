module.exports = {
  theme: {
    fontFamily: {
      sans: [
        'Nunito',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ]
    },

    // Extending tailwindcss default config.
    extend: {
      // Colors
      colors: {
        'primary': '#2D3748',
        'primary-hover': '#4A5568',
        'danger': '#E53E3E',
        'black-75': 'rgba(0,0,0,.75)',
      },

      // Spacing
      spacing: {
        header: 'var(--header-height)',
        sidebar: 'var(--sidebar-width)',
        '7': '1.75rem',
        '9': '2.25rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },

      // Letter Spacing
      letterSpacing: {
        'wider': '0.1em',
        'widest': '0.2em',
      },

      maxHeight: theme => ({
        ...theme('spacing')
      }),

      zIndex: {
        '75': 75,
        '100': 100,
      },
    },

    // Customizing customForms the default styles
    customForms: theme => ({
      default: {
        'input, textarea, multiselect, select, checkbox, radio': {
          '&:focus': {
            boxShadow: undefined,
          }
        },

        'checkbox, radio': {
          '&:focus': {
            borderColor: undefined,
          },
          color: theme('colors.primary'),
        }
      },

      dark: {
        'input, textarea, multiselect, checkbox, radio': {
          backgroundColor: theme('colors.gray.900'),
          color: theme('colors.white'),
        },
        select: {
          backgroundColor: theme('colors.gray.600'),
        },
      }
    })
  },

  variants: {},

  plugins: [
    require('@tailwindcss/custom-forms'),
  ]
}
