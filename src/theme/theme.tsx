import { createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
  }
  interface PaletteOptions {
    white: PaletteOptions['primary'];
  }
}

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1328,
      xl: 1536,
    },
  },

  palette: {
    white: {
      main: '#fff',
      contrastText: '#000',
    },
    primary: {
      main: '#e87c7c',
    },
    secondary: {
      main: '#f9eeaa',
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '10px',
          paddingRight: '10px',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme, {
  factor: 3,
  breakpoints: ['sm'],
});

theme.typography.body1 = {
  fontSize: '0.85rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.2rem',
  },
};

theme.typography.body2 = {
  fontSize: '0.75rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
};

export { theme };
