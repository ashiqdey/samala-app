//
// import { InputSelectIcon } from './CustomIcons';

// -----------------------------------------------

export default function Select() {
  // const focusedColor = theme.palette.error.main;


  return {
    MuiSelect: {
      defaultProps: {
        // IconComponent: InputSelectIcon,
        classes: {
          root: 'Mui-select'
        }
      },
      styleOverrides: {
        root: {
          // '& .MuiOutlinedInput-root': {

          // },
        },
      },
    },
  };
}
