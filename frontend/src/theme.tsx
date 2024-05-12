import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Specify your font family
    fontSize: 14, // Set the base font size in pixels
    // You can also set typography for each text variant (e.g., h1, h2, body1, button, etc.)
    h1: {
      fontSize: '2.5rem', // Example for h1 size
    },
    body1: {
      fontSize: '1rem', // Example for body text size
    },
    button: {
      textTransform: 'none' // Optional: Use this to stop automatic capitalization of buttons
    }
  }
});

export function CustomThemeProvider({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
