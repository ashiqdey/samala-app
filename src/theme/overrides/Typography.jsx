// -----------------------------------------------

export default function Typography(theme) {
  const subtitle = () => ({
    fontWeight: 'normal',
    color: theme.palette.grey[600]
  });

  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
        subtitle1: subtitle(),
        subtitle2: subtitle(),
      },
    },
  };
}
