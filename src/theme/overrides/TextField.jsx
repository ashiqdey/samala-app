import { alpha } from '@mui/material/styles';

// -----------------------------------------------

export default function TextField(theme) {
  return {
    MuiTextField: {
      styleOverrides: {
        // uncomment to change border color in textarea on focus
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: alpha(theme.palette.grey[900], 0.04),

            '&.Mui-focused': {
              backgroundColor: alpha(theme.palette.grey[900], 0.09),
            },
          },
        },
      },
    },
  };
}
