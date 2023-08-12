// -----------------------------------------------

export default function Fab(theme) {
  return {
    MuiFab: {
      defaultProps: {
        color: 'primary',
      },

      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        primary: {
          boxShadow: theme.customShadows.primary,
        },
        secondary: {
          boxShadow: theme.customShadows.secondary,
        },
        // success: {
        //   boxShadow: theme.customShadows.success,
        // },
        // error: {
        //   boxShadow: theme.customShadows.error,
        // },
        // warning: {
        //   boxShadow: theme.customShadows.warning,
        // },
        // info: {
        //   boxShadow: theme.customShadows.info,
        // },
        extended: {
          '& svg': {
            marginRight: theme.spacing(1),
          },
        },
      },
    },
  };
}
