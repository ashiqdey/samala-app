import Iconify from '../../components/micro/Iconify';

// -----------------------------------------------

export default function Breadcrumbs(theme) {
  return {
    MuiBreadcrumbs: {
      defaultProps: {
        separator: <Iconify icon='ic:baseline-navigate-next' />,
        'aria-label': 'breadcrumb',
        sx: {
          li: {
            color: 'grey.500'
          }
        }
      },
      styleOverrides: {
        separator: {
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
        },
      },
    },
  };
}
