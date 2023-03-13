import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#0D122B",
    },
    secondary: {
      main: "#4A9CE8",
    },
    'white': {
      main: '#FFFFFF'
    },
    'gray-outline': {
      main: '#8A8A8A'
    },
    'background': {
      main: '#F7F9FA'
    }
  },
  typography: {
    h1: {
      fontSize: '34px',
      lineHeight: `${34 * 1.5}px`,
      fontWeight: 500,
    },
    h2: {
      fontSize: '24px',
      lineHeight: `${24 * 1.5}px`,
      fontWeight: 500,
    },
    body1: {
      fontSize: '14px',
      lineHeight: `${14 * 1.5}px`,
      fontWeight: 400,
    },
    button: {
      textTransform: 'initial',
    },
  }
})