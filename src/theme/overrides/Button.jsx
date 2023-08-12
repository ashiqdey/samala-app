import { alpha } from '@mui/material/styles';

// -----------------------------------------------

export default function Button(theme) {

  const shadow = (color) => ({
    boxShadow: theme.customShadows[color],
  });

  const softStyle = (color) => ({
    color: theme.palette[color].dark,
    backgroundColor: alpha(theme.palette[color].main, 0.1),
    '&:hover': {
      color: theme.palette[color].contrastText,
      backgroundColor: theme.palette[color].main,
      ...shadow(color),
    },
  });


  return {
    MuiButton: {
      variants: [
        {
          props: { variant: 'soft' },
        },
      ],


      styleOverrides: {
        root: {
          borderRadius: '6px',
          '&:hover': {
            boxShadow: 'none',
          },
        },




        softPrimary: softStyle('primary'),
        softSecondary: softStyle('secondary'),
        softInfo: softStyle('info'),
        softSuccess: softStyle('success'),
        softWarning: softStyle('warning'),
        softError: softStyle('error'),


        sizeSmall: {
          padding: '3px 9px',
        },
        sizeLarge: {
          height: 45,
        },

        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },



        containedPrimary: shadow('primary'),
        containedSecondary: shadow('secondary'),
        containedInfo: shadow('info'),
        containedSuccess: shadow('success'),
        containedWarning: shadow('warning'),
        containedError: shadow('error'),

        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        outlinedWarning: {
          color: theme.palette.warning.dark
        },

        textInherit: {
          color: theme.palette.grey[600],
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },

      },
    },
  };
}
