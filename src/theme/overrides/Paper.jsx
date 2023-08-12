import { createGradient } from "../../utils/cssStyles";
// -----------------------------------------------


export default function Paper(theme) {
  return {
    MuiPaper: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: { borderColor: theme.palette.grey[500_12] },
        },
        {
          props: { variant: 'flat' },
          style: {
            backgroundColor: 'transparent',
            backgroundImage: 'unset'
          },
        },
      ],

      styleOverrides: {
        root: {
          // backgroundImage: 'none',
          '&.MuiPaper-elevation0': {
            // backgroundColor: 'transparent',
            backgroundImage: 'unset'
          },
          '&.MuiPaper-elevation1': {
            backgroundImage: createGradient(theme.palette.mode, 0.05)
          },
          '&.MuiPaper-elevation3': {
            backgroundImage: createGradient(theme.palette.mode, 0.07)
          },
          '&.MuiPaper-elevation4': {
            backgroundImage: createGradient(theme.palette.mode, 0.09)
          },
          '&.MuiPaper-elevation6': {
            backgroundImage: createGradient(theme.palette.mode, 0.11)
          },
          '&.MuiPaper-elevation8': {
            backgroundImage: createGradient(theme.palette.mode, 0.12)
          },
          '&.MuiPaper-elevation12': {
            backgroundImage: createGradient(theme.palette.mode, 0.13)
          },
          '&.MuiPaper-elevation16': {
            backgroundImage: createGradient(theme.palette.mode, 0.15)
          },
          '&.MuiPaper-elevation24': {
            backgroundImage: createGradient(theme.palette.mode, 0.17)
          }
        },
      },
    },
  };
}
