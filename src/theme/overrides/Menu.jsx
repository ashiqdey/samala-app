// -----------------------------------------------

export default function Menu(theme) {
  return {
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiMenu-paper': {
            borderRadius: '8px'
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.lighter,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              color: theme.palette.grey[800]
            },
          },
        },
      },
    },
  };
}
