// import { alpha } from '@mui/material';
import { alpha } from '@mui/material/styles';
// import COMPNAME from '@mui/material/Input';


// -----------------------------------------------

export default function Drawer(theme) {
  const isLight = theme.palette.mode === 'light';
  return {
    MuiDrawer: {
      styleOverrides: {
        modal: {
          '&[role="presentation"]': {
            '& .MuiDrawer-paperAnchorLeft': {
              boxShadow: `8px 24px 24px 12px ${alpha("#161C24", isLight ? 0.16 : 0.48)}`,
            },
            '& .MuiDrawer-paperAnchorRight': {
              boxShadow: `-8px 24px 24px 12px ${alpha("#161C24", isLight ? 0.16 : 0.48)}`,
            },
          },
        },
      },
    },
  };
}
