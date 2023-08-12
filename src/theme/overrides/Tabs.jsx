// -----------------------------------------------

export default function Tabs(theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          // padding: 0,
          fontWeight: theme.typography.fontWeightMedium,
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,

          '&:not(:last-of-type)': {
            marginRight: theme.spacing(1),
          },
          '@media (min-width: 600px)': {
            minWidth: 48,
          },

          '& .MuiBadge-badge': {
            position: 'relative',
            right: '6px',
            top: '10px',
            padding: '0 4px',
            border: `2px solid ${theme.palette.background.paper}`,
          },
          '&:not(.Mui-selected) .MuiBadge-badge': {
            backgroundColor: theme.palette.grey[500],
          },
        },
        labelIcon: {
          minHeight: 48,
          flexDirection: 'row',
          '& > *:first-of-type': {
            marginBottom: 0,
            marginRight: theme.spacing(1),
          },
        },
        wrapper: {
          flexDirection: 'row',
          whiteSpace: 'nowrap',
        },
        textColorInherit: {
          opacity: 1,
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTabScrollButton: {
      styleOverrides: {
        root: {
          width: 48,
          borderRadius: '50%',
        },
      },
    },
  };
}
